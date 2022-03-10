


function goPaiement(forfait){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          if (forfait==1) {
            document.location.href="paiementPrem.html";
          }
          else if(forfait==2){
            document.location.href="paiementChill.html";
          }
          else if(forfait==3){
            document.location.href="paiementGeof.html";
          }
          // ...
        } else {
          // User is signed out
          // ...
          console.log(user)
          console.log("ddd")
         document.location.href="connexion.html";
          
        }
      });

    //document.location.href="monCompte.html";
}

function goPage(page){
  
  document.location.href=page;
}

var dbRef2 = firebase.database().ref().child('evenement').child("01");
dbRef2.once('value',  function(snapshot){
  console.log(snapshot.val());

    prix = snapshot.child("PrixPre").val()
    $("#prixPre").append('                  <h1 style="color:#E97B86 ; font-weight:800 ; margin-bottom: 20px; font-size: 2em;">'+prix+' &euro;<sub style="font-weight: lighter; font-size: 0.5em;">TTC</sub></h1>    ')
  //pages infos
  $("#PrixInfoPre").append(prix+"&euro;")
    //paiement
    $("#PrixPaiPre").append(prix+",00 &euro;")



    prix = snapshot.child("PrixChill").val()
    $("#prixChill").append('<h1 style="color:#74C686 ; font-weight:800 ; margin-bottom: 20px; font-size: 2em;">'+prix+' &euro;<sub style="font-weight: lighter; font-size: 0.5em;">TTC</sub></h1>    ')
      //pages infos
    $("#PrixInfoChill").append(prix+"&euro;")
    //paiement
    $("#PrixPaiChill").append(prix+",00 &euro;")



    prix = snapshot.child("PrixGeof").val()
    $("#prixGeof").append('<h1 style="color:#007BFF ; font-weight:800 ; margin-bottom: 20px; font-size: 2em;">'+prix+' &euro;<sub style="font-weight: lighter; font-size: 0.5em;">TTC</sub></h1>')
  //pages infos
  $("#PrixInfoGeof").append(prix+"&euro;")
    //paiement
    $("#PrixPaiGeof").append(prix+",00 &euro;")
  


})
