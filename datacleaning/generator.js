//Generates 1000 random data points
function gendata() {
    var output = [];
    var temp = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var age, income, savings, checking;
    var numLoan, loanVal, loanPay;
    var sumSavings, sumChecking;
    for (i = 0; i < 1000; i++) {
        age = Math.round(Math.random() * 52 + 18);
        income = Math.round(6000000 * Math.pow(Math.E, 0.0155 * age) + getRandomInt(-2000000, 2000000));
        savings = Math.round(7000000 * Math.pow(Math.E, 0.000000008 * income));
        checking = Math.round(1000000 * Math.pow(Math.E, 0.000000001 * income));
        numLoan = Math.round(Math.random() * 2);
        if (numLoan == 0) {
            loanVal = 0;
            loanPay = 0;
        } else {
            loanVal = Math.round(2000000 * Math.pow(Math.E, 0.000000001 * income));
            loanPay = Math.round(0.1743 * loanVal - Math.random() * 195317);
        }
        sumSavings = Math.round(0.4083 * income + Math.random() * 10000);
        sumChecking = Math.round(2000000 * Math.pow(Math.E, 0.000000009 * income));
        var out = ([age,
            income,
            savings,
            checking,
            numLoan,
            loanVal,
            loanPay,
            sumSavings,
            sumChecking
        ]);
        output.push(out);
    }
    return output;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}