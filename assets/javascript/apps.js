$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyAeh93-9RePmzbtEuRCGSAxhe9dhtvfQ2c",
        authDomain: "train-scheduler-2470e.firebaseapp.com",
        databaseURL: "https://train-scheduler-2470e.firebaseio.com",
        projectId: "train-scheduler-2470e",
        storageBucket: "train-scheduler-2470e.appspot.com",
        messagingSenderId: "860827776144"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    $("#addTrain").on("click", function (event) {
        event.preventDefault();

        var trainName = $("#trainName").val().trim();
        var trainDest = $("#trainDest").val().trim();
        var firstTrain = $("#firstTrain").val().trim();
        var trainFreq = $("#trainFreq").val().trim();

        var newTrain = {
            name: trainName,
            destination: trainDest,
            start: firstTrain,
            frequency: trainFreq
        };

        database.ref().push(newTrain);

        alert("Train successfully added");

        $("#trainName").val("");
        $("#trainDest").val("");
        $("#firstTrain").val("");
        $("#trainFreq").val("");
    });

    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().start;
        var trainFreq = childSnapshot.val().frequency;
        var trainFreq;

        var firstTime = 0;

        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

        var currentTime = moment();

        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        var tRemainder = diffTime % trainFreq;

        var tMinutesTillTrain = trainFreq - tRemainder;

        var nextTrain = moment().add(tMinutesTillTrain, "minutes");

        $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
    });

});