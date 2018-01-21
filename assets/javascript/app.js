$(document).ready(function () {
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
    $("#add-new-train").on("click", function (event) {
        event.preventDefault();

        // Get user input
        var trainName = $("#train-name-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var trainStart = $("#first-time-input").val().trim();
        var trainFrequency = $("#frequency-input").val().trim();

        // Create object for train data
        var newTrain = {
            name: trainName,
            destination: trainDestination,
            start: trainStart,
            frequency: trainFrequency
        };

        // Upload train data to Firebase
        database.ref().push(newTrain);

        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.start);
        console.log(newTrain.frequency);

        // Alert
        alert("Train successfully added");

        // Clear text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-time-input").val("");
        $("#frequency-input").val("");
    });

    // Create Firebase event for adding train to the database and a row in the html table when a user adds an entry
    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        // Store everything in a variable
        var tName = childSnapshot.val().name;
        var tDestination = childSnapshot.val().destination;
        var tStart = childSnapshot.val().start;
        var tFrequency = childSnapshot.val().frequency;

        // Convert first train time to year before to make sure it's before the current time
        var firstTimeConverted = moment(tStart, "HH:mm").subtract(1, "years");

        // Current Time
        var currentTime = moment();

        // Difference firstTimeConverted and currentTime in minutes
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        // Remainder of time different and train frequency
        var tRemainder = diffTime % tFrequency;

        // Minutes until next train
        var tMinutesTillTrain = tFrequency - tRemainder;

        // Next train arrival time
        var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");

        // Add each train's data into the table
        $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
            + tFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
    });
});