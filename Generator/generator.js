//Generates 1000 random data points
function gendata() {
    var output = [];
    var temp = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var age, income, savings, checking;
    var numLoan, loanVal, loanPay;
    var sumSavings, sumChecking;
    var classifier, x;
    for (i = 0; i < 996; i++) {
        age = Math.round(Math.random() * 52 + 18);
        income = Math.round(6000000 * Math.pow(Math.E, 0.0155 * age) + getRandomInt(-2000000, 2000000));
        savings = Math.round(-0.0000002 * Math.pow(income, 2) + 66.065 * income - 400000000);
        checking = Math.round(-0.0000002 * Math.pow(income, 2) + 66.065 * income - 400000000);
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
        x = 7 * age + 3 * income + 10 * savings + 9 * checking + 4 * loanVal + loanPay + 2 * sumSavings + 6 * sumChecking;
        classifier = 40000000 * Math.pow(Math.E, 0.00000000007 * x);
        classifier = Math.round(classifier);
        var out = ([age,
            income,
            savings,
            checking,
            numLoan,
            loanVal,
            loanPay,
            sumSavings,
            sumChecking,
            getLabel(classifier)
        ]);
        output.push(out);
    }
    return output;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getLabel(price) {
    min = (price - (price % 10000000)) / 10000000;
    if (min >= 9) return "$900000.00 - $1000000.00+";
    return "$" + min * 100000 + ".00 - $" + (min + 1) * 100000 + ".00";
}