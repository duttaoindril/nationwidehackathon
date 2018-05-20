import { Customer } from "./customer";

const DEFAULT_INTEREST_RATE = 0.3

export class BankAccount {
    id: number
    customerId: number
    type: string
    balance: number
    issueDate: Date
    interestRate: number

    constructor(id: number, customer: Customer, type: string, percent: number) {
        this.id = id
        this.customerId = customer.id
        this.type = type
        if (type !== 'Checking') {
            this.interestRate = DEFAULT_INTEREST_RATE
            this.balance = customer.householdIncome * (customer.age - 20) * percent / 100
        }
        else {
            this.balance = customer.householdIncome * percent / 100
        }
    }
}