"use strict";
exports.__esModule = true;
var DEFAULT_INTEREST_RATE = 0.3;
var BankAccount = /** @class */ (function () {
    function BankAccount(id, customer, type, percent) {
        this.id = id;
        this.customerId = customer.id;
        this.type = type;
        if (type !== 'Checking') {
            this.interestRate = DEFAULT_INTEREST_RATE;
            this.balance = customer.householdIncome * (customer.age - 20) * percent / 100;
        }
        else {
            this.balance = customer.householdIncome * percent / 100;
        }
    }
    return BankAccount;
}());
exports.BankAccount = BankAccount;
