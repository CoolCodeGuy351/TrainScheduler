/* JS / JQuery / moment.js / bootstrap 4 (js) */

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
        var next = $('#train-time-input').val().trim();
        var frequency = $('#frequency-input').val().trim();

        var currentTime = moment().format("MM-DD-YYYY/HH:mm");
        var currentMinusYear = moment().subtract(1, "year").format("MM-DD-YYYY/HH:mm");

        next = parseInt(next);

        var difference = moment(currentMinusYear,"DD/MM/YYYY HH:mm:ss").diff(moment(next,"DD/MM/YYYY HH:mm")).format("mm")
   
        console.log("difference in min: " + difference);



        //var duration = moment.duration(end.diff(startTime));
        //var hours = duration.asHours();


        console.log("Current time: " + currentTime);
        console.log("Current time minus a year: " + currentMinusYear);



        ///////////////////////////////////////////////////////////////////
        /*
        var startdate = moment();
        startdate = startdate.subtract(1, "days");
        startdate = startdate.format("DD-MM-YYYY");
        However, you can chain this together; this would look like:

        var startdate = moment().subtract(1, "days").format("DD-MM-YYYY");
        */
        ///////////////////////////////////////////////////////////////////

        
        //moment().toNow();
        ///////////////////////////////////////////////////////////////////
        $('#train-name-input').val("");
        $('#destination-input').val("");
        $('#train-time-input').val("");
        $('#frequency-input').val("");

        database.ref().push({
            name,
            destination,
            next,
            frequency,
            /*minAway,*/

        })

    })

    database.ref().on('child_added', function(snapshot) {

        console.log(snapshot.val())

        var a = $('<tr id='+i+'>');
        a.append("<td>" + snapshot.val().name + "</td>");
        a.append("<td>" + snapshot.val().destination + "</td>");
        a.append("<td>" + snapshot.val().frequency + "</td>");
        a.append("<td>" + snapshot.val().next + "</td>");
        /*a.append("<td>" + snapshot.val().minAway + "</td>");*/
        $('.table').append(a)
        i++;
    });
