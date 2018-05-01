var config = {      
    apiKey: "AIzaSyDlJy-xnKqIDhDUL8pj2k_fpXhQK0btLFs",
    authDomain: "train-scheduler-6c3a5.firebaseapp.com",
    databaseURL: "https://train-scheduler-6c3a5.firebaseio.com",
    projectId: "train-scheduler-6c3a5",
    storageBucket: "",
    messagingSenderId: "334739044836"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

//caching jquery objects
var $scheduleTable = $("#schedule-table");


// Initial Values
var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = 0;

// var randomDate = $("#startDate-input")
// var randomFormat = "DD/MM/YYYY";
// var convertedDate = moment(startDate, randomFormat);

// var monthsWorked = (moment(convertedDate).diff(moment(), "months"));

// console.log("anything?", monthsWorked);

$(document).ready(function() {

// Capture Button Click
$("#submit").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    trainName = $("#trainName-input").val();
    destination = $("#destination-input").val();
    frequency = $("#frequency-input").val();
    firstTrain = $("#firstTrain-input").val();

    // Code for handling the push
    // database.ref().push({
        var train = {
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain
};
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
    // });

    database.ref().push(train);

// });


    database.ref().on("child_added", function(childSnapshot) {

        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val().trainName);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().frequency);
        console.log(childSnapshot.val().firstTrain);

    // full list of items to the well
    $(".table").append("<tr class='well'><td class='train-name'> " + childSnapshot.val().trainName +
        " </td><td class='train-destination'> " + childSnapshot.val().destination +
            " </td><td class='train-frequency'> " + childSnapshot.val().frequency + " </td></tr>");
        // " </td><td class='first-train'> " + childSnapshot.val().firstTrain;

    });

// Create Firebase event for adding a train to the database and a row in the html when a user adds an entry
var fireBaseTrain = database.ref().on("child_added", function(childSnapshot, prevChildKey) {

console.log(childSnapshot.val());

// Store everything into a variable.
var trainName = childSnapshot.val().trainName;
var destination = childSnapshot.val().destination;
var firstTrain = childSnapshot.val().firstTrain;
var frequency = childSnapshot.val().frequency;

    // convert train times
var firstTrainTimeConverted = moment(childSnapshot.val().firstTrain, "HH:mm").subtract(1, "years");
console.log("First train time: " + firstTrainTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

var remainingTime = diffTime % childSnapshot.val().frequency;
console.log("remaining time: " + remainingTime);

var trainArrivesIn = frequency - remainingTime;
console.log("your train arrives in: " + trainArrivesIn);

var nextTrainArrival = moment().add(trainArrivesIn, "minutes");

var nextArrivalConverted = moment(nextTrainArrival).format("HH:mm");
console.log(nextArrivalConverted);

var minsAway = nextArrivalConverted

// Add each train's data into the table
$("#schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
frequency + "</td><td>" + nextArrivalConverted + "</td><td>" + trainArrivesIn + "</td>");

 // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.trainName);
    console.log(sv.destination);
    console.log(sv.firstTrain);
    console.log(sv.frequency);

    // Change the HTML to reflect
    $("#trainName-display").text(sv.trainName);
    $("#destination-display").text(sv.destination);
    $("#frequency-display").text(sv.frequency);
    $("#firstTrain-display").text(sv.firstTrain);

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
});

});

});
