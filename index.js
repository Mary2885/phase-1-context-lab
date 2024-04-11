let employee1 = ["Gray", "Worm", "Security", 1];

function createEmployeeRecord(employee){
    const employeeRecord = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: [] 
    }
    return employeeRecord;
}

createEmployeeRecord(employee1);

let employees = [
    ["bartholomew", "simpson", "scamp", 2],
    ["Mister", "Matt", "Chief Awesomeness Officer", 3]
];

const createEmployeeRecords = (employeesContainerArray) => {     
    let employeeRecords = employeesContainerArray.map(employee => createEmployeeRecord(employee));
    return employeeRecords;
}

createEmployeeRecords(employees);

let createTimeInEvent = function(dateStamp){
    this.timeInEvents.push({
        type: "TimeIn",
        hour: Number.parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    });
    return this;
};

let createTimeOutEvent = function(dateStamp){
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: Number.parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    });
    return this;
};

let hoursWorkedOnDate = function(soughtDate){
    let comingIn = this.timeInEvents.find(function(e){
        return e.date === soughtDate;
    });

    let goingOut = this.timeOutEvents.find(function(e){
        return e.date === soughtDate;
    });

    return (goingOut.hour - comingIn.hour) / 100;
};

let wagesEarnedOnDate = function(dateSought){
    let rawWage = hoursWorkedOnDate.call(this, dateSought) * this.payPerHour;
    return parseFloat(rawWage.toString());
};

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
        return rec.firstName === firstName;
    });
};

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date;
    });

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0);

    return payable;
};

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec);
    }, 0);
};

// Example Usage:
// Create employee records
let employeeRecords = createEmployeeRecords(employees);

// Add time-in and time-out events
createTimeInEvent.call(employeeRecords[0], "2024-04-10T08:00:00");
createTimeOutEvent.call(employeeRecords[0], "2024-04-10T17:00:00");

createTimeInEvent.call(employeeRecords[1], "2024-04-10T09:00:00");
createTimeOutEvent.call(employeeRecords[1], "2024-04-10T18:00:00");

// Calculate wages for a specific date
let date = "2024-04-10";
let totalWages = calculatePayroll(employeeRecords);
console.log("Total wages for", date, ":", totalWages);