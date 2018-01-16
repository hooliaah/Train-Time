$(document).ready(function() {
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBSCTKAZ5ImjnHZTw-iVOy3qLX4KEjFLRI",
    authDomain: "train-time-44a0d.firebaseapp.com",
    databaseURL: "https://train-time-44a0d.firebaseio.com",
    projectId: "train-time-44a0d",
    storageBucket: "",
    messagingSenderId: "434063813925"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// Add train to schedule
$("#add-new-train").on("click", function(event) {
  event.preventDefault();

  // Get user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = $("#first-time-input").val().trim();
  var trainFrequncy = $("#frequency-input").val().trim();

  // Create local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    frequency: trainFrequncy
  };

//   // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

//   // Alert
  alert("Train successfully added");

//   // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
// database.ref().on("child_added", function(childSnapshot, prevChildKey) {

//   console.log(childSnapshot.val());

//   // Store everything into a variable.
//   var empName = childSnapshot.val().name;
//   var empRole = childSnapshot.val().role;
//   var empStart = childSnapshot.val().start;
//   var empRate = childSnapshot.val().rate;

//   // Employee Info
//   console.log(empName);
//   console.log(empRole);
//   console.log(empStart);
//   console.log(empRate);

//   // Prettify the employee start
//   var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

//   // Calculate the months worked using hardcore math
//   // To calculate the months worked
//   var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
//   console.log(empMonths);

//   // Calculate the total billed rate
//   var empBilled = empMonths * empRate;
//   console.log(empBilled);

//   // Add each train's data into the table
//   $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
//   empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
// });

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case

});