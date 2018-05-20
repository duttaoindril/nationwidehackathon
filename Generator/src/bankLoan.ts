import { Customer } from "./customer";

export class BankLoan {
    id: number
    customerId: number
    type: LoanTypes
    borrowedAmmt: number
    interestRate: number
    currentBalance: number
    monthlyPayment: number
    issueDate: Date

    constructor(id: number, type: LoanTypes, customer: Customer, amount: number) {
        this.id = id;
        this.customerId = customer.id;
        this.interestRate = +((Math.random() + 4).toFixed(3))
        this.type = type;
        this.borrowedAmmt = amount;
        if (type.match('Auto')) {
            this.monthlyPayment = Math.floor(this.borrowedAmmt / 54);
            const year = Math.floor(2018 - (Math.random() * 5))
            this.issueDate = new Date(this.randomDate().setFullYear(year));
            const numberOfMonths = (new Date(2017, 11, 31).getFullYear() - this.issueDate.getFullYear()) * 12 + (new Date(2017, 11, 31).getMonth() - this.issueDate.getMonth());
            this.currentBalance = Math.floor(this.borrowedAmmt - (this.borrowedAmmt / 60 * numberOfMonths));
        }
        if (type.match('Mortgage')) {
            const ageOfLoan = ((customer.age) % 20) + Math.random() * 5
            const year = Math.floor(2018 - ageOfLoan)
            this.issueDate = new Date(this.randomDate().setFullYear(year));
            this.monthlyPayment = Math.floor(this.borrowedAmmt / 200 + 300); // +300 for taxes
            this.currentBalance = Math.floor(this.borrowedAmmt - (this.borrowedAmmt / 30 * ageOfLoan));
        }
    }

    randomDate() {
        const start = new Date(2017, 0, 1)
        const end = new Date(2017, 11, 31)
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

}

export enum LoanTypes {
    '15 Year Fixed Mortgages' = '15 Year Fixed Mortgage',
    '15 Year Variable Mortgage' = '15 Year Variable Mortgage',
    '30 Year Fixed Mortgage' = '30 Year Fixed Mortgage',
    '30 Year Variable Mortgage' = '30 Year Variable Mortgage',
    '3 Year Auto Loan' = '3 Year Auto Loan',
    '4 Year Auto Loan' = '4 Year Auto Loan',
    '5 Year Auto Loan' = '5 Year Auto Loan',
    '6 Year Auto Loan' = '6 Year Auto Loan'
}