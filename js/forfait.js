function goPaiement(forfait){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          if (forfait==1) {
            document.location.href="paiementPrem.html";
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