import { BankAccount } from './bankAccount';
import { BankLoan, LoanTypes } from './bankLoan';
import { BankAccountTransaction, TransactionTypes } from './bankAccountTransaction'
import { Customer } from './customer';
// import { Customer } from './customer';

export class GenerateTransactions {
    generate(bankAccount: BankAccount, customerLoans: Array<BankLoan>, customer: Customer): Array<BankAccountTransaction> {
        const bankAccountTransactions: Array<BankAccountTransaction> = [];
        let date = new Date(2017, 5, 1)
        const pay = this.calculatePay(customer)
        let mortgagePayment = 0
        let autoLoanPayment = 0
        if (customerLoans) {
            const mortgages = customerLoans.filter(loan => loan.type.match('Mortgage'));
            mortgagePayment = mortgages[0] ? mortgages[0].monthlyPayment : 0;
            const autoLoans = customerLoans.filter(loan => loan.type.match('Auto'));
            autoLoans.forEach(loan => autoLoanPayment += loan.monthlyPayment)
        }
        while (date < new Date(2017, 11, 31)) {
            if (date.getDate() == 1 || date.getDate() == 15) {
                bankAccountTransactions.push(new BankAccountTransaction(bankAccountTransactions.length, bankAccount.id, 'Credit', date, pay, 'Paycheck', TransactionTypes.PayCheck))
            }
            if (date.getDate() == 1) {
                if (mortgagePayment > 0) {
                    bankAccountTransactions.push(new BankAccountTransaction(
                        bankAccountTransactions.length, bankAccount.id, 'Debit', date, mortgagePayment, 'Mortgage Payment', TransactionTypes.Loan))
                }
                else {
                    bankAccountTransactions.push(new BankAccountTransaction(
                        bankAccountTransactions.length, bankAccount.id, 'Debit', date, Math.floor(Math.random()*60000 + 80000), 'Rent Payment', TransactionTypes.Bill))
                }
                if (autoLoanPayment > 0) {
                    bankAccountTransactions.push(new BankAccountTransaction(
                        bankAccountTransactions.length, bankAccount.id, 'Debit', date, autoLoanPayment, 'Auto Loan Payment', TransactionTypes.Loan))
                }
                bankAccountTransactions.push(new BankAccountTransaction(
                    bankAccountTransactions.length, bankAccount.id, 'Debit', date, Math.floor(Math.random() * 3000 + 9000), 'Water & Sewer', TransactionTypes.Bill))
                bankAccountTransactions.push(new BankAccountTransaction(
                    bankAccountTransactions.length, bankAccount.id, 'Debit', date, Math.floor(Math.random() * 10000 + 15000), 'Electricity', TransactionTypes.Bill))
                bankAccountTransactions.push(new BankAccountTransaction(
                    bankAccountTransactions.length, bankAccount.id, 'Debit', date, Math.floor(Math.random() * 14000 + 6000), 'Cable & Internet', TransactionTypes.Bill))
                bankAccountTransactions.push(new BankAccountTransaction(
                    bankAccountTransactions.length, bankAccount.id, 'Debit', date, Math.floor(Math.random() * 10000 + 5000), 'Cell Phone', TransactionTypes.Bill))
            }
            let purchases = Math.floor(Math.random() * 4 + 2)
            for (let i = 1; i <= purchases; i++) {
                let amount = Math.floor((Math.random() * 6000) + 500)
                bankAccountTransactions.push(new BankAccountTransaction(bankAccountTransactions.length, bankAccount.id, 'Debit', date, amount, 'Debit Card Purchase At {LOCATION} From Card#: XXXXXXXXXXXXXXXX', null))
            }
            date.setDate(date.getDate() + 1)
        }
        return bankAccountTransactions;
    }

    calculatePay(customer: Customer) {
        return Math.floor(customer.householdIncome * .7 / 24)
    }
}