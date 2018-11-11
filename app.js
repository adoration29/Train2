

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD4QvtDe58vRqt56fjOVUCvvqE7zwUYE2I",
    authDomain: "train-project-560a3.firebaseapp.com",
    databaseURL: "https://train-project-560a3.firebaseio.com",
    projectId: "train-project-560a3",
    storageBucket: "",
    messagingSenderId: "589920704689"
  };
  firebase.initializeApp(config);

  var database =firebase.database()

  $(".btn.btn-primary").on("click",function(){
      console.log("hi")
  });

  // declaring the variables
    var trainName = "";
    var destination = "";
    var frequency = 0;
    var trainTime = "";

    // getting the button to Click
    $("#add-user").on("click", function(event) {
      event.preventDefault();

      trainName = $("#trainName-input").val().trim();
      destination = $("#destination-input").val().trim();
      frequency = $("#frequency-input").val().trim();
      trainTime= $("#trainTime-input").val().trim();

      // pushing info into the firebase
      dataRef.ref().push({

        trainName: trainName,
        destination: destination,
        frequency: frequency,
        trainTime: trainTime,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });

    
    firebase.database().ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().frequency);
      console.log(childSnapshot.val().trainTime);
      

      rainData.on("child_added", function(childSnapshot, prevChildKey){

        console.log(childSnapshot.val());
    
        // assign firebase variables to snapshots.
        var firebaseName = childSnapshot.val().name;
        var firebaseDestination = childSnapshot.val().destination;
        var firebaseTrainTimeInput = childSnapshot.val().trainTime;
        var firebaseFrequency = childSnapshot.val().frequency;
        
        var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
        var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
        var minutes = firebaseFrequency - timeRemainder;
    
        var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
        
        // Test for correct times and info
        console.log(minutes);
        console.log(nextTrainArrival);
        console.log(moment().format("hh:mm A"));
        console.log(nextTrainArrival);
        console.log(moment().format("X"));
    
        // Append train info to table on page
        $("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseLine + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");
    
      });
    });








