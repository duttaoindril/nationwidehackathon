import { v4 as uuid } from 'uuid';
export class BankAccountTransaction {

    amount: number
    bankAccountId: number
    creditDebitType: string
    description: string
    id: number
    referenceNumber: number
    transactionTimestamp: Date
    transactionType: TransactionTypes

    constructor(id: number, bankAccountId: number, debitOrCredit: string, date: Date, value: number, description: string, transactionType: TransactionTypes) {
        let d = new Date(date)
        this.amount = value
        this.creditDebitType = debitOrCredit
        this.description = description
        this.id = id
        this.bankAccountId = bankAccountId
        this.referenceNumber = Math.floor(Math.random() * 1000000000)
        d.setHours(Math.floor(Math.random() * 8) + 8)
        d.setMinutes(Math.floor(Math.random() * 60))
        this.transactionTimestamp = d
        this.transactionType = transactionType || this.randomTransactionType();
    }

    randomTransactionType(): TransactionTypes {
        const randomTypes = ['Restaurant', 'Store', 'Other']
        const typeIndex = Math.round(Math.random() * 2)
        return TransactionTypes[randomTypes[typeIndex]];
    }
}

export enum TransactionTypes {
    'Restaurant' = 'Restaurant',
    'Loan' = 'Loan',
    'Store' = 'Store',
    'Bill' = 'Bill',
    'Other' = 'Other',
    'PayCheck' = 'Paycheck'
}