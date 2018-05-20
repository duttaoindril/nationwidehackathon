"use strict";
exports.__esModule = true;
var bankAccountTransaction_1 = require("./bankAccountTransaction");
// import { Customer } from './customer';
var GenerateTransactions = /** @class */ (function () {
    function GenerateTransactions() {
    }
    GenerateTransactions.prototype.generate = function (bankAccount, customerLoans, customer) {
        var bankAccountTransactions = [];
        var date = new Date(2017, 5, 1);
        var pay = this.calculatePay(customer);
        var mortgagePayment = 0;
        var autoLoanPayment = 0;
        if (customerLoans) {
            var mortgages = customerLoans.filter(function (loan) { return loan.type.match('Mortgage'); });
            mortgagePayment = mortgages[0] ? mortgages[0].monthlyPayment : 0;
            var autoLoans = customerLoans.filter(function (loan) { return loan.type.match('Auto'); });
            autoLoans.forEach(function (loan) { return autoLoanPayment += loan.monthlyPayment; });
        }
        while (date < new Date(2017, 11, 31)) {
            if (date.getDate() == 1 || date.getDate() == 15) {
                bankAccountTransactions.push(new bankAccountTransaction_1.BankAccountTransaction(bankAccountTransactions.length, bankAccount.id, 'Credit', date, pay, 'Paycheck', bankAccountTransaction_1.TransactionTypes.PayCheck));
            }
            if (date.getDate() == 1) {
                if (mortgagePayment > 0) {
                    bankAccountTransactions.push(new bankAccountTransaction_1.BankAccountTransaction(bankAccountTransactions.length, bankAccount.id, 'Debit', date, mortgagePayment, 'Mortgage Payment', bankAccountTransaction_1.TransactionTypes.Loan));
                }
                else {
                    bankAccountTransactions.push(new bankAccountTransaction_1.BankAccountTransaction(bankAccountTransactions.length, bankAccount.id, 'Debit', date, Math.floor(Math.random() * 60000 + 80000), 'Rent Payment', bankAccountTransaction_1.TransactionTypes.Bill));
                }
                if (autoLoanPayment > 0) {
                    bankAccountTransactions.push(new bankAccountTransaction_1.BankAccountTransaction(bankAccountTransactions.length, bankAccount.id, 'Debit', date, autoLoanPayment, 'Auto Loan Payment', bankAccountTransaction_1.TransactionTypes.Loan));
                }
                bankAccountTransactions.push(new bankAccountTransaction_1.BankAccountTransaction(bankAccountTransactions.length, bankAccount.id, 'Debit', date, Math.floor(Math.random() * 3000 + 9000), 'Water & Sewer', bankAccountTransaction_1.TransactionTypes.Bill));
                bankAccountTransactions.push(new bankAccountTransaction_1.BankAccountTransaction(bankAccountTransactions.length, bankAccount.id, 'Debit', date, Math.floor(Math.random() * 10000 + 15000), 'Electricity', bankAccountTransaction_1.TransactionTypes.Bill));
                bankAccountTransactions.push(new bankAccountTransaction_1.BankAccountTransaction(bankAccountTransactions.length, bankAccount.id, 'Debit', date, Math.floor(Math.random() * 14000 + 6000), 'Cable & Internet', bankAccountTransaction_1.TransactionTypes.Bill));
                bankAccountTransactions.push(new bankAccountTransaction_1.BankAccountTransaction(bankAccountTransactions.length, bankAccount.id, 'Debit', date, Math.floor(Math.random() * 10000 + 5000), 'Cell Phone', bankAccountTransaction_1.TransactionTypes.Bill));
            }
            var purchases = Math.floor(Math.random() * 4 + 2);
            for (var i = 1; i <= purchases; i++) {
                var amount = Math.floor((Math.random() * 6000) + 500);
                bankAccountTransactions.push(new bankAccountTransaction_1.BankAccountTransaction(bankAccountTransactions.length, bankAccount.id, 'Debit', date, amount, 'Debit Card Purchase At {LOCATION} From Card#: XXXXXXXXXXXXXXXX', null));
            }
            date.setDate(date.getDate() + 1);
        }
        return bankAccountTransactions;
    };
    GenerateTransactions.prototype.calculatePay = function (customer) {
        return Math.floor(customer.householdIncome * .7 / 24);
    };
    return GenerateTransactions;
}());
exports.GenerateTransactions = GenerateTransactions;
