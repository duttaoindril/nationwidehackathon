var deleted = [2, 6, 7, 8, 9];
var toRemoveBankAccounts = [];

for (var idx = data.bankAccounts.length - 1; idx > -1; idx--)
    if (deleted.indexOf(data.bankAccounts[idx].customerId) > -1) {
        toRemoveBankAccounts.push(data.bankAccounts[idx].id);
        data.bankAccounts.splice(idx, 1);
    }

for (var idx = data.bankAccountTransactions.length - 1; idx > -1; idx--)
    if (toRemoveBankAccounts.indexOf(data.bankAccountTransactions[idx].bankAccountId) > -1)
        data.bankAccountTransactions.splice(idx, 1);

for (var idx = data.bankLoans.length - 1; idx > -1; idx--)
    if (deleted.indexOf(data.bankLoans[idx].customerId) > -1)
        data.bankLoans.splice(idx, 1);

for (var idx = data.customers.length - 1; idx > -1; idx--)
    if (deleted.indexOf(data.customers[idx].id) > -1)
        data.customers.splice(idx, 1);

for (customer of data.customers) {
    // console.log("============================================================================================================================================");
    var bankAccounts = [];
    // console.log("customer", customer);
    var accounts = data.bankAccounts.filter(acc => {
        if (acc.customerId == customer.id) bankAccounts.push(acc.id);
        return acc.customerId == customer.id;
    });
    // console.log("accounts", accounts);
    var loans = data.bankLoans.filter(loan => loan.customerId == customer.id && loan.type != "30 Year Fixed Mortgage");
    // console.log("loans", loans);
    // console.log("bankAccounts", bankAccounts);
    var transactions = data.bankAccountTransactions.filter(transaction => bankAccounts.indexOf(transaction.bankAccountId) > -1);
    // console.log("transactions", transactions);
    let allCustomerData = {
        customer,
        accounts,
        loans,
        transactions
    };
    // var allCustomerData = [customer].concat(accounts).concat(loans);
    console.log("allCustomerData", allCustomerData);
    // console.log(allCustomerData.reduce((newer, orginal) => Object.assign(newer, orginal), {}));
    // console.log("============================================================================================================================================");
    //[age, income, savings, checkings, num loans, sum debt, sum monthly payment, sum credit spending, sum debit spending]
    console.log([allCustomerData.customer.age,
        allCustomerData.customer.householdIncome,
        allCustomerData.accounts[0].balance,
        allCustomerData.accounts[1].balance,
        allCustomerData.loans.length,
        allCustomerData.loans.reduce((acc, currentVal) => acc + currentVal.currentBalance, 0),
        allCustomerData.loans.reduce((acc, currentVal) => acc + currentVal.monthlyPayment, 0),
        allCustomerData.transactions.filter(word => word.creditDebitType == "Credit").reduce((acc, currentVal) => acc + currentVal.amount, 0),
        allCustomerData.transactions.filter(word => word.creditDebitType == "Debit").reduce((acc, currentVal) => acc + currentVal.amount, 0),
        getLabel(allCustomerData.customer.price)
    ]);
}

function getLabel(price) {
    price % 10000000;
    price / 10000000;
    min = (price - (price % 10000000)) / 10000000;
    return min * 100000 + " - " + (min + 1) * 100000;
}