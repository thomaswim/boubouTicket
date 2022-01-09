a=12;
	
// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
    apiKey: "AIzaSyDV5nINbLYsEQQi5OsiT65vkPWqolQSZ4Q",
    authDomain: "boubou-ticket.firebaseapp.com",
    projectId: "boubou-ticket",
    storageBucket: "boubou-ticket.appspot.com",
    messagingSenderId: "336708395807",
    appId: "1:336708395807:web:949e398546f8fac0d1062a",
    measurementId: "G-791GQ3S5E2",
    databaseURL: "https://boubou-ticket-default-rtdb.europe-west1.firebasedatabase.app/"
    };
    firebase.initializeApp(config);
    firebase.analytics();
    console.log("sebfsebr")
    var userID;
    
    // Get a reference to the database service
    var database = firebase.database();


//CONNEXION

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    if (user != null) {
 
      console.log(uid);
      var dbRef = firebase.database().ref().child('user').child(uid);
      dbRef.child("firstname").on('value',  function(snapshot){
      console.log(snapshot.val());
      $("#yourname").replaceWith( '<div id="yourname" style="text-align : center; font-weight : bold"> Bonjour '+snapshot.val()+' !</div>')
    
    });

      //affichage du nom :
     
  

  
      }else{
        console.log(user)
      }

      //Changement du boutton connexion :
      $( "#connexion" ).replaceWith( '<a id="connexion" style="display: block; margin-left: 10%; margin-right: 10% ; margin-top: 20px; background-color:#74C686 ; border-color: #74C686; font-size: 1.5em; font-weight: bold;" class="btn btn-primary" href="/html/monCompte.html" role="button"><i class="far fa-user-circle"></i></i> Mon Compte</a>' );

      // ...
    } else {
      // User is signed out
      // ...
      console.log(user)
      console.log("ddd")
      $( "#connexion" ).replaceWith( '<a id="connexion" style="display: block; margin-left: 10%; margin-right: 10% ; margin-top: 20px; background-color:#74C686 ; border-color: #74C686; font-size: 1.5em; font-weight: bold;" class="btn btn-primary" href="/html/connexion.html" role="button"><i class="far fa-user-circle"></i></i> Connexion</a>' );

      
    }
  });

  function disconnect(){
    firebase.auth().signOut().then(function() {
        console.log("Sign-out successful.")
        Amiconnect();
      }).catch(function(error) {
        console.log(error)
      });
      document.location.href="/html/connexion.html";
  }















if (a==1) {
    $( "#connexion" ).replaceWith( '<a id="connexion" style="display: block; margin-left: 10%; margin-right: 10% ; margin-top: 20px; background-color:#74C686 ; border-color: #74C686; font-size: 1.5em; font-weight: bold;" class="btn btn-primary" href="/html/monCompte.html" role="button"><i class="far fa-user-circle"></i></i> Mon Compte</a>' );
    console.log("a=1");
}

var dbRef = firebase.database().ref().child('users');
//on crée une base de donnée pour user si il n'y en a pas
key = {
    username: "aaa",
    email: "dfsdq",
    profile_picture : "dsf"
}

function test(){
  firebase.database().ref().child('/users').set(key);
}




 