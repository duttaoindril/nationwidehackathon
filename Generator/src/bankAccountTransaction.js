"use strict";
exports.__esModule = true;
var BankAccountTransaction = /** @class */ (function () {
    function BankAccountTransaction(id, bankAccountId, debitOrCredit, date, value, description, transactionType) {
        var d = new Date(date);
        this.amount = value;
        this.creditDebitType = debitOrCredit;
        this.description = description;
        this.id = id;
        this.bankAccountId = bankAccountId;
        this.referenceNumber = Math.floor(Math.random() * 1000000000);
        d.setHours(Math.floor(Math.random() * 8) + 8);
        d.setMinutes(Math.floor(Math.random() * 60));
        this.transactionTimestamp = d;
        this.transactionType = transactionType || this.randomTransactionType();
    }
    BankAccountTransaction.prototype.randomTransactionType = function () {
        var randomTypes = ['Restaurant', 'Store', 'Other'];
        var typeIndex = Math.round(Math.random() * 2);
        return TransactionTypes[randomTypes[typeIndex]];
    };
    return BankAccountTransaction;
}());
exports.BankAccountTransaction = BankAccountTransaction;
var TransactionTypes;
(function (TransactionTypes) {
    TransactionTypes["Restaurant"] = "Restaurant";
    TransactionTypes["Loan"] = "Loan";
    TransactionTypes["Store"] = "Store";
    TransactionTypes["Bill"] = "Bill";
    TransactionTypes["Other"] = "Other";
    TransactionTypes["PayCheck"] = "Paycheck";
})(TransactionTypes = exports.TransactionTypes || (exports.TransactionTypes = {}));
