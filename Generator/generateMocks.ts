import { BankAccount } from './src/bankAccount';
import { BankAccountTransaction } from './src/bankAccountTransaction';
import { BankLoan, LoanTypes } from './src/bankLoan';
import { Customer } from './src/customer';
import { GenerateTransactions } from './src/generateTransactions';
import * as fs from 'fs';



const generateTransactions = new GenerateTransactions;
const NUM_OF_CUSTOMERS_TO_GENERATE = 10;

const bankAccounts: Array<BankAccount> = [];
const bankAccountTransactions: Array<BankAccountTransaction> = [];
const bankLoans: Array<BankLoan> = [];

//homeowners, austin tx
const newfamilyHomeowner = new Customer(0, 'Nancy', 'NewFamilyHomeowner', 25, 7500000, '12708 Tierra Grande Trl', 'Austin', 'TX', 78732, true, 'HomeOwners') //395,000 3bed 2bath
const averageFamilyHomeowner = new Customer(1, 'Joe', 'AverageHomeowner', 35, 9000000, '10018 Planters Woods Dr', 'Austin', 'TX', 78730, true, 'HomeOwners') // 575,000 3bed 3bath
const bankruptFamilyHomeowner = new Customer(2, 'Bob', 'BankruptHomeowner', 49, 3200000, '2014 Whitebead Trl', 'Austin', 'TX', 78734, false, 'None') // 140,000 3bed 2bath
//homeowners, MtnView CA
const spenderFamilyHomeowner = new Customer(3, 'Steve', 'SpenderHomeowner', 42, 22000000, '336 Mariposa Ave', 'Mountain View', 'CA', 94041, true, 'HomeOwners') // 2,500,00 3bed 2bath
const saverHomeowner = new Customer(4, 'Sally', 'SaverHomeowner', 54, 13000000, '650 Alamo Ct APT 13', 'Mountain View', 'CA', 94043, true, 'HomeOwners') //598,000 Condo
const averageHomeowner = new Customer(5, 'Jane', 'JustHomeowner', 72, 17000000, '49 Showers Dr APT J316', 'Mountain View', 'CA', 94040, false, 'Homeowners') // 1,388,000 Condo
//renters CA
const renter = new Customer(6, 'Austin', 'Bachelor', 22, 7500000, '707 Continental Cir', 'Mountain View', 'CA', 94040, false, 'Renters') //$4000/month split 6 ways
const cautious = new Customer(7, 'Candi', 'Cautious', 30, 9200000, '2400 W El Camino Real', 'Mountain View', 'CA', 94040, false, 'None') ///6375/month split 6 ways
//renters TX
const green = new Customer(8, 'Gary', 'Green', 26, 5000000, '2325 Newfield Ln', 'Austin', 'TX', 78703, true, 'Renters') //Rent for 1495/month
const hipster = new Customer(9, 'Hank', 'Hipster', 24, 3700000, '9500 Jollyville Rd', 'Austin', 'TX', 78759, false, 'Renters') //Rent 920/month


const customers: Array<Customer> = [
    newfamilyHomeowner, spenderFamilyHomeowner, averageFamilyHomeowner, bankruptFamilyHomeowner, renter,
    saverHomeowner, averageHomeowner, cautious, green, hipster
]

// http://www.bestplaces.net/economy/city/texas/austin
// new BankAccount(id, customerId, type, customer.age, income, percentOfIncomeInAccount)
bankAccounts.push(new BankAccount(bankAccounts.length, newfamilyHomeowner, 'Savings', 8))
bankAccounts.push(new BankAccount(bankAccounts.length, newfamilyHomeowner, 'Checking', 10))
bankAccounts.push(new BankAccount(bankAccounts.length, spenderFamilyHomeowner, 'Savings', 2))
bankAccounts.push(new BankAccount(bankAccounts.length, spenderFamilyHomeowner, 'Checking', 5))
bankAccounts.push(new BankAccount(bankAccounts.length, averageFamilyHomeowner, 'Savings', 10))
bankAccounts.push(new BankAccount(bankAccounts.length, averageFamilyHomeowner, 'Checking', 30))
bankAccounts.push(new BankAccount(bankAccounts.length, bankruptFamilyHomeowner, 'Savings', 1))
bankAccounts.push(new BankAccount(bankAccounts.length, bankruptFamilyHomeowner, 'Checking', 3))
bankAccounts.push(new BankAccount(bankAccounts.length, renter, 'Savings', 20))
bankAccounts.push(new BankAccount(bankAccounts.length, renter, 'Checking', 10))
bankAccounts.push(new BankAccount(bankAccounts.length, saverHomeowner, 'Savings', 30))
bankAccounts.push(new BankAccount(bankAccounts.length, saverHomeowner, 'Checking', 10))
//
bankAccounts.push(new BankAccount(bankAccounts.length, averageHomeowner, 'Savings', 10))
bankAccounts.push(new BankAccount(bankAccounts.length, averageHomeowner, 'Checking', 20))
bankAccounts.push(new BankAccount(bankAccounts.length, cautious, 'Savings', 25))
bankAccounts.push(new BankAccount(bankAccounts.length, cautious, 'Checking', 5))
bankAccounts.push(new BankAccount(bankAccounts.length, green, 'Savings', 10))
bankAccounts.push(new BankAccount(bankAccounts.length, green, 'Checking', 5))
bankAccounts.push(new BankAccount(bankAccounts.length, hipster, 'Savings', 1))
bankAccounts.push(new BankAccount(bankAccounts.length, hipster, 'Checking', 50))

bankLoans.push(new BankLoan(bankLoans.length, LoanTypes["30 Year Fixed Mortgage"], newfamilyHomeowner, 39500000))
bankLoans.push(new BankLoan(bankLoans.length, LoanTypes["5 Year Auto Loan"], newfamilyHomeowner, 1500000))
bankLoans.push(new BankLoan(bankLoans.length, LoanTypes["5 Year Auto Loan"], newfamilyHomeowner, 1850000))
bankLoans.push(new BankLoan(bankLoans.length, LoanTypes["30 Year Fixed Mortgage"], spenderFamilyHomeowner, 620000000))
bankLoans.push(new BankLoan(bankLoans.length, LoanTypes["5 Year Auto Loan"], spenderFamilyHomeowner, 4500000))
bankLoans.push(new BankLoan(bankLoans.length, LoanTypes["5 Year Auto Loan"], spenderFamilyHomeowner, 7500000))
bankLoans.push(new BankLoan(bankLoans.length, LoanTypes["30 Year Fixed Mortgage"], averageFamilyHomeowner, 57500000))
bankLoans.push(new BankLoan(bankLoans.length, LoanTypes["5 Year Auto Loan"], averageFamilyHomeowner, 1850000))
bankLoans.push(new BankLoan(bankLoans.length, LoanTypes["5 Year Auto Loan"], averageFamilyHomeowner, 2450000))
bankLoans.push(new BankLoan(bankLoans.length, LoanTypes["30 Year Fixed Mortgage"], bankruptFamilyHomeowner, 14000000))
bankLoans.push(new BankLoan(bankLoans.length, LoanTypes["30 Year Fixed Mortgage"], saverHomeowner, 59800000))

renter

const customerLoans = []

bankLoans.forEach((bankLoan: BankLoan) => {
    if (!customerLoans[bankLoan.customerId]) { customerLoans[bankLoan.customerId] = [] }
    customerLoans[bankLoan.customerId].push(bankLoan);
})

bankAccounts.forEach((bankAccount: BankAccount) => {
    if (bankAccount.type === 'Checking') {
        const loans: Array<BankLoan> = customerLoans[bankAccount.customerId]
        const transactions: Array<BankAccountTransaction> = generateTransactions.generate(bankAccount, loans, customers.filter(customer => customer.id == bankAccount.customerId)[0]);
        bankAccountTransactions.push.apply(bankAccountTransactions, transactions);
    }
})

const jsonToWrite = {
    customers: customers,
    bankAccounts: bankAccounts,
    bankLoans: bankLoans,
    bankAccountTransactions: bankAccountTransactions
}

fs.writeFileSync('demo.json', JSON.stringify(jsonToWrite));