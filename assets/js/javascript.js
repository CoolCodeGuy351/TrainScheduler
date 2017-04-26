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
        var first = $('#first-input').val().trim();
        var frequency = $('#frequency-input').val().trim();
        //var month = moment(date, 'MM/DD/YY').diff(moment(), "months");
        //var total = month*rate;
        //console.log(month);
       	//console.log(total);