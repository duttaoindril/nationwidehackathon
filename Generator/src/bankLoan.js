"use strict";
exports.__esModule = true;
var BankLoan = /** @class */ (function () {
    function BankLoan(id, type, customer, amount) {
        this.id = id;
        this.customerId = customer.id;
        this.interestRate = +((Math.random() + 4).toFixed(3));
        this.type = type;
        this.borrowedAmmt = amount;
        if (type.match('Auto')) {
            this.monthlyPayment = Math.floor(this.borrowedAmmt / 54);
            var year = Math.floor(2018 - (Math.random() * 5));
            this.issueDate = new Date(this.randomDate().setFullYear(year));
            var numberOfMonths = (new Date(2017, 11, 31).getFullYear() - this.issueDate.getFullYear()) * 12 + (new Date(2017, 11, 31).getMonth() - this.issueDate.getMonth());
            this.currentBalance = Math.floor(this.borrowedAmmt - (this.borrowedAmmt / 60 * numberOfMonths));
        }
        if (type.match('Mortgage')) {
            var ageOfLoan = ((customer.age) % 20) + Math.random() * 5;
            var year = Math.floor(2018 - ageOfLoan);
            this.issueDate = new Date(this.randomDate().setFullYear(year));
            this.monthlyPayment = Math.floor(this.borrowedAmmt / 200 + 300); // +300 for taxes
            this.currentBalance = Math.floor(this.borrowedAmmt - (this.borrowedAmmt / 30 * ageOfLoan));
        }
    }
    BankLoan.prototype.randomDate = function () {
        var start = new Date(2017, 0, 1);
        var end = new Date(2017, 11, 31);
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };
    return BankLoan;
}());
exports.BankLoan = BankLoan;
var LoanTypes;
(function (LoanTypes) {
    LoanTypes["15 Year Fixed Mortgages"] = "15 Year Fixed Mortgage";
    LoanTypes["15 Year Variable Mortgage"] = "15 Year Variable Mortgage";
    LoanTypes["30 Year Fixed Mortgage"] = "30 Year Fixed Mortgage";
    LoanTypes["30 Year Variable Mortgage"] = "30 Year Variable Mortgage";
    LoanTypes["3 Year Auto Loan"] = "3 Year Auto Loan";
    LoanTypes["4 Year Auto Loan"] = "4 Year Auto Loan";
    LoanTypes["5 Year Auto Loan"] = "5 Year Auto Loan";
    LoanTypes["6 Year Auto Loan"] = "6 Year Auto Loan";
})(LoanTypes = exports.LoanTypes || (exports.LoanTypes = {}));
