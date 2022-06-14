let $ = function (id) {
    return document.getElementById(id);
}

let usd = function (num) {
    return num.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
}

//get values on btnCalculate press / controller
function getValues() {
    //reset cols
    $('totalsContainer').classList.remove("invisible", "d-none");
    $('sharkImg').classList.add("invisible", "d-none");
    $('resultsTable').classList.remove("invisible", "d-none");

    //collect & parse data
    let loanAmount = parseFloat($('loanAmount').value);
    let payments = parseFloat($('payments').value);
    //allow for float later
    let rate = parseFloat($('rate').value);

    //validate data

    //pass data to calculate function
    let results = calculateLoan(loanAmount, payments, rate);

    //pass in calculations display data in table
    displayData(results);
}

//calculate amounts / logic
function calculateLoan(loanAmount, payments, rate) {

    //object for months
    let resultsObject = {};

    //create variables
    let totalInterest = 0;
    let balance = loanAmount;
    let interestPayment = 0
    let principalPayment;

    //monthly calculations
    let monthlyPayment = parseFloat((loanAmount * (rate / 1200)) / (1 - (1 + (rate / 1200)) ** (-Math.abs(payments))));

    //string to store in html
    let htmlString = ""

    //loop through number of payments do calculations
    for (let i = 0; i <= payments; i++) {
        let month = i;

        interestPayment = parseFloat(balance * (rate / 1200));
        principalPayment = parseFloat(monthlyPayment - (balance * (rate / 1200)));
        totalInterest = parseFloat((totalInterest + interestPayment));
        totalInterest = parseFloat(totalInterest);
        balance -= principalPayment;
        balance = Math.abs(parseFloat(balance));

        //concatinate on to htmlString the results of the calculations
        htmlString += `<tr><td>${month+1}</td><td>${monthlyPayment.toFixed(2)}</td><td>${principalPayment.toFixed(2)}</td><td>${interestPayment.toFixed(2)}</td><td>${totalInterest.toFixed(2)}</td><td>${balance.toFixed(2)}</td></tr>`
    }

    let totalCost = loanAmount + totalInterest;

    // display calculated variables to proper positions while inside function
    // use the .toLocaleString to convert to USD format
    resultsObject.monthlyPayment = usd(monthlyPayment);
    resultsObject.principalPayment = usd(principalPayment);
    resultsObject.totalInterest = usd(totalInterest);
    resultsObject.totalCost = usd(totalCost);

    resultsObject.htmlString = htmlString;

    //return results object
    return resultsObject;
}

//display the data in a table / view
function displayData(resultsObject) {
    $("monthlyPayment").innerHTML = resultsObject.monthlyPayment;
    $("totalPrincipal").innerHTML = resultsObject.principalPayment;
    $("totalInterest").innerHTML = resultsObject.totalInterest;
    $("totalCost").innerHTML = resultsObject.totalCost;
    //creates table
    $("results").innerHTML = resultsObject.htmlString;
}

//reset + clear app when btnReset pressed
function resetPage() {
    $('totalsContainer').classList.add("invisible", "d-none");
    $('sharkImg').classList.remove("invisible", "d-none");
    $('resultsTable').classList.add("invisible", "d-none");

    //resets inputs
    $('loanAmount').value = "15000";
    $('payments').value = "60";
    $('rate').value = "3";
}