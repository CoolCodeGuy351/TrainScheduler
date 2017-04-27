/* JS / JQuery / moment.js / bootstrap 4 (js) */
$( document ).ready(function() {


var config = {
    apiKey: "AIzaSyBmavVwcD7GTlVcPkO1t6RzRPSLF9MGyFk",
    authDomain: "trainwebapphw.firebaseapp.com",
    databaseURL: "https://trainwebapphw.firebaseio.com",
    projectId: "trainwebapphw",
    storageBucket: "trainwebapphw.appspot.com",
    messagingSenderId: "1013386906633"
  };

  firebase.initializeApp(config);

    var i=0;

    var database = firebase.database();

    $('#submit').on('click', function() {
        event.preventDefault()
        var name = $('#train-name-input').val().trim();
        var destination = $('#destination-input').val().trim();
        var first = $('#train-time-input').val().trim();
        var frequency = $('#frequency-input').val().trim();

        // Below code figures out Next train arrival and time till next train. 

        var firstTimeConverted = moment(first, "hh:mm").subtract(1, "years");
        console.log("firstTimeConverted: " + firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % frequency;
        console.log("tRemainder: " + tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN(tMinutesTillTrain): " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME(nextTrain): " + moment(nextTrain).format("hh:mm A"));

        nextTrain = moment(nextTrain).format("hh:mm A");


        $('#train-name-input').val("");
        $('#destination-input').val("");
        $('#train-time-input').val("");
        $('#frequency-input').val("");

        database.ref().push({
            name : name,
            destination: destination,
            nextTrain: nextTrain,
            frequency: frequency,
            tMinutesTillTrain: tMinutesTillTrain
        })

    })

    database.ref().on('child_added', function(snapshot) {

        var a = $('<tr id='+i+'>');
        a.append("<td>" + snapshot.val().name + "</td>");
        a.append("<td>" + snapshot.val().destination + "</td>");
        a.append("<td>" + snapshot.val().frequency + "</td>");
        a.append("<td>" + snapshot.val().nextTrain + "</td>");
        a.append("<td>" + snapshot.val().tMinutesTillTrain + "</td>");
        $('.table').append(a)
        i++;
    });


});
