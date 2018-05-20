console.log(data);
var deleted = [2, 6, 7, 8, 9];
var toRemoveBankAccounts = [];
console.log(deleted);

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

console.log(data);

for (customer of data.customers) {
    console.log("============================================================================================================================================");
    var bankAccounts = [];
    console.log("customer", customer);
    var accounts = data.bankAccounts.filter(acc => {
        if (acc.customerId == customer.id) bankAccounts.push(acc.id);
        return acc.customerId == customer.id;
    });
    console.log("accounts", accounts);
    var loans = data.bankLoans.filter(loan => loan.customerId == customer.id);
    console.log("loans", loans);
    console.log("bankAccounts", bankAccounts);
    var transactions = data.bankAccountTransactions.filter(transaction => bankAccounts.indexOf(transaction.bankAccountId) > -1);
    console.log("transactions", transactions);
    let allCustomerData = {
        customer,
        accounts,
        loans,
        transactions
    };
    // var allCustomerData = [customer].concat(accounts).concat(loans);
    console.log("allCustomerData", allCustomerData);
    // console.log(allCustomerData.reduce((newer, orginal) => Object.assign(newer, orginal), {}));
    console.log("============================================================================================================================================");
}