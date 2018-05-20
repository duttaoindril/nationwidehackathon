// ============================= IGNORE SETUP CODE =============================
if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;
firebase.initializeApp({
    apiKey: "AIzaSyD90GzxyQCp6bY-IA0zAlpssg7e9xsouPM",
    databaseURL: "https://nationwidehackathon.firebaseio.com",
    projectId: "nationwidehackathon",
});
var db = firebase.database();
var oldConsoleLog = console.log;
var labels;
var showGraphs;
var show = true;

function toggleGraph() {
    show = !show;
    if (showGraphs.checked) document.getElementById("horizontal-section").style.display = "block";
    else document.getElementById("horizontal-section").style.display = "none";
}

function autorun() {
    showGraphs = document.getElementById("showGraphs");
    showGraphs.disabled = false;
    window['console']['log'] = function () {
        for (var i = 0; i < arguments.length; i++) {
            oldConsoleLog(arguments[i]);
            document.getElementById('demo-status').innerHTML += (typeof arguments[i] === 'string' ?
                arguments[i] : JSON.stringify(arguments[i])) + "<br>";
        }
        document.getElementById('demo-status').innerHTML += "<br>";
    };
}

function getTrainingData(cb) {
    db.ref("config").once("value", config => {
        config = config.val();
        labels = (Object.values(config.labels)).sort().reduce((accumulator, currentValue,
            currentIndex, array) => {
            accumulator[Object.keys(config.labels)[Object.values(config.labels).indexOf(
                array[currentIndex])]] = array[currentIndex];
            return accumulator;
        }, {});
        var tcnfg = config.training[config.training.config + "Training"];
        console.log(Object.keys(labels));
        cb([Object.keys(labels), gendata()], [tcnfg.testSplit, tcnfg.learningRate, tcnfg.epochs, tcnfg.minAccuracy, tcnfg.maxLoss]);
    });
}
// ============================ MODEL TRAINING CODE ============================
var time = Date.now(); // The start time of everything
let model; // A global variable for holding the model
getTrainingData((tdbdata, tdbconfig) => { // Downloading data live to train on
    console.log("AFTER " + (Date.now() - time) + "MS, MAIN DOWNLOAD_DATA: ", tdbdata[0], tdbdata[1].length +
        " rows X " + tdbdata[1][0].length + " columns.");
    getTrainedModel(tdbdata, tdbconfig).then(mdl => { // Calling the train model function and logging the results
        model = mdl.model;
        var acc = mdl.accuracy;
        var los = mdl.loss;
        console.log("AFTER " + (Date.now() - time) + "MS, MAIN MODEL:" + model, "ACCURACY: " +
            acc + (acc >= tdbconfig[3] ? " → ✓" : " → ✖"), "LOSS: " + los + (los <=
                tdbconfig[4] ? " → ✓" : " → ✖"));
        getConfidences(model, tdbdata[1][0].slice(0, -1)).then(confs => { // Making a prediction using the model and first row of tdbdata
            confs.push(Object.keys(labels)[confs.indexOf(Math.max.apply({}, confs))]);
            console.log("AFTER " + (Date.now() - time) + "MS, MAIN RUNNER 1: ", confs,
                tdbdata[1][0]);
        });
        getConfidences(model, []).then(confs => { // Making a prediction using the model and first row of tdbdata
            confs.push(Object.keys(labels)[confs.indexOf(Math.max.apply({}, confs))]);
            console.log("AFTER " + (Date.now() - time) + "MS, MAIN RUNNER 2: ", confs, []);
        });
        console.log("Finially finished in " + (Date.now() - time) + "ms.");
    });
});