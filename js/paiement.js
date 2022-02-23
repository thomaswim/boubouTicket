
  function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

function lydia(pack){

  if (($( "#Check1").is(":checked")  && ($( "#Check2").is(":checked")))){
   

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          var dbRef = firebase.database().ref().child('user').child(uid);
          dbRef.once('value',  function(snapshot){

            //get date
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            var hh =  String(today.getHours());
            var min =  String(today.getMinutes());

            today = mm + '/' + dd + '/' + yyyy + " ["+ hh+':'+min+']';
            

            console.log(snapshot.val().party)
            var newParty = {
                ["Larroque3"] :{
                    id : "01",
                    pack :pack,
                    valide : 0,
                    precommandeDate : today
                }
            }
            console.log(newParty);

            dbRef.child("party").update(newParty)
          });

          dbRef.on('value',  function(snapshot){
            var usr = snapshot.val()
            Email.send({
              Host: "smtp.gmail.com",
              Username : "boubou.ticket@gmail.com",
              Password : "larroque0422",
              To :  usr.mail,
              From : "boubou.ticket@gmail.com",
              Subject : usr.firstname + ", votre demande à bien été enregistrée",
              Body : "<strong>Bonjour "+ usr.firstname+"</strong><br><br>\
                Votre demande de ticket pour participer à <i>Larroque : 3<sup>ème</sup></i> Dose avec le pack <b>"+ pack +"</b> à bien été prise en compte.<br>\
                Nos équipes sont actuellement en train de vérifier votre paiement. <br>\
                Vous recevrez un e-mail lorsque cette commande sera validé.<br>\
                Vous pouvez aussi consulté l'état de votre commande dans l'onglet <i>'mon compte'</i> sur www.boubou-ticket.com<br><br>\
                Toute l'équipe de Boubou Company &reg; vous remercie de votre fidélité<br><br>\
                Votre fidèle organisateur,<br>\
                Boubou",
            }).then(
             message => alert("mail sent successfully")

            );
        
            document.location.href="Validation.html"; 
            //alert (snapshot.val().mail)
          });
           
     /* Email.send({
        Host: "smtp.gmail.com",
        Username : "boubou.ticket@gmail.com",
        Password : "larroque0422",
        To : "thomasboursac@gmail.com" ,
        From : "boubou.ticket@gmail.com",
        Subject : "coucou toi test 2.0000 ",
        Body : "Bienvenue !!sdfsdfsdf",
        }).then(
         // message => alert("mail sent successfully")
         //window.open('https://lydia-app.com/collect/53275-conso-soiree/fr', '_blank')
        );
    
// document.location.href="Validation.html"; */
//window.open('https://lydia-app.com/collect/53275-conso-soiree/fr', '_blank')
          // ...
        } else {
          // User is signed out
          // ...
          console.log(user)
          console.log("ddd")
         
          
        }
      });


      console.log(userdb);
    
    }
    else{
    alert("Tu dois avoir accepter les conditions générales et le contenue du pack")
    }
}

function back(){
    document.location.href="monCompte.html";
}

function accepter(id){
  $( "#"+id).prop('checked', true);
  $( "#"+id).val()
  console.log($( "#"+id).val());
}