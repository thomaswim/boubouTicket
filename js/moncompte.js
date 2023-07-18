



let User ;
let DataUser = {}
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      var user = firebase.auth().currentUser;
      User = uid
    var name, email, photoUrl, uid, emailVerified;
    if (user != null) {
      
      if ((uid == "k3jYVq3VdTaTIYiTyBi3Rx3Pl8J3") ||( uid="wlXwaQgMoTh9HcnzmODDkq3oIIf2")) { // si Admin afficher boutton Admin
          console.log("Ok");
          var text = '<button  onclick="admin()" style="max-width: 800px; display: block; margin-left: auto; margin-right: auto; margin-bottom: 20px;" name="" id="" class="btn btn-outline-danger" href="#" role="button">Mode Admin </button> '
          $( "#admin" ).append(text );

      }
      console.log(uid);

      var dbRef = firebase.database().ref().child('user').child(uid).child("party");
        dbRef.on('value', function(snapshot){
          if(snapshot.exists()) {
            console.log(snapshot.val());
            snapshot.forEach(function(childSnapshot) {
              var partyName = childSnapshot.key;
              var partyDetails = childSnapshot.val();
              var thePack = partyDetails.pack;

              console.log(partyDetails);
              $( "#" + partyName ).replaceWith("");
              console.log("ERASE");
              var color = ""
              if (partyDetails.pack == "premium") {
                  color="red"
              } else if(partyDetails.pack == "chill") {
                  color="green"
              } else {
                  color = "blue"
              }
              if (partyDetails.valide == 1) {
                console.log("Ok");
                var click ='onClick="clickTicket('+partyDetails.valide+",'"+partyDetails.pack+"'"+')"'
                var text = '<div id="'+partyName+'" onClick="clickTicket('+partyDetails.valide+",'"+partyDetails.id+"','"+partyDetails.pack+"'"+')"  data-toggle="modal" data-target="#exampleModal"  class="card" style=" margin-top: 10px; box-shadow: 5px 5px 10px 1px rgba(56, 56, 56, 0.2); border-radius: 30px; max-width: 400px; display: bloc; margin-left: auto; margin-right: auto" > \
                <div class="card-img-top" src="../asset/larroque.jpg.JPG" alt="Card image cap" style="border-radius: 30px 30px 0 0; height: 150px; background: no-repeat url('+"'../asset/larroque.jpg.JPG'"+');background-size: 400px;"> </div>\
                <div class="card-body"> <h5 class="card-title" style="font-weight: bold;">'+partyName+'</h5><p style = "font-size : 0.8em;color : '+color+'; margin-bottom : -7px; margin-top : -7px">'+partyDetails.pack+'</p>\
                </div> </div>'
                $( "#ticket-list" ).append( text );
              } else if (partyDetails.valide == 0) {
                var dbRefAdmin = firebase.database().ref().child('admin').child('ouverturePaiement');
                dbRefAdmin.once('value',  function(snapshot){
                  console.log(snapshot.val());
                  if (snapshot.val().ouverturePaiement == 0) {
                    console.log("CLOSE");
                    var text = '<div id="'+partyName+'" onClick="clickTicketInvalid(0)"  data-toggle="modal" data-target="#alertModalPaiement"  class="card" style=" margin-top: 10px; box-shadow: 5px 5px 10px 1px rgba(56, 56, 56, 0.2); border-radius: 30px; max-width: 400px; display: bloc; margin-left: auto; margin-right: auto" > <div class="card-img-top" src="../asset/larroque.jpg.JPG" alt="Card image cap" style="border-radius: 30px 30px 0 0; height: 150px; background: no-repeat url('+"'../asset/larroque.jpg.JPG'"+');background-size: 400px; display : flex; justify-content : center; flex-direction :column; filter: grayscale(100%);"> <h3 style="text-align : center; color : white;vertical-align: middle; font-weight : bold">En attente de Paiement</h3>     <div class="spinner-border text-success" role="status"  style ="display : block ; margin-left : auto; margin-right : auto"> <span class="sr-only">Loading...</span> </div></div> <div class="card-body"> <h5 class="card-title" style="font-weight: bold;">Banou`s Birthday</h5><p style = "font-size : 0.8em;color : '+color+'; margin-bottom : -7px; margin-top : -7px">'+partyDetails.pack+'</p></div> </div>'

                  }
                  else{
                    var text = '<div id="Larroque3" onClick="clickTicketInvalid(1)" data-toggle="modal" data-target="#alertModalValidation"  class="card" style=" margin-top: 10px; box-shadow: 5px 5px 10px 1px rgba(56, 56, 56, 0.2); border-radius: 30px; max-width: 400px; display: bloc; margin-left: auto; margin-right: auto" > <div class="card-img-top" src="../asset/larroque.jpg.JPG" alt="Card image cap" style="border-radius: 30px 30px 0 0; height: 150px; background: no-repeat url('+"'../asset/larroque.jpg.JPG'"+');background-size: 400px; display : flex; justify-content : center; flex-direction :column; filter: grayscale(100%);"> <h3 style="text-align : center; color : white;vertical-align: middle; font-weight : bold">Clickez pour payer</h3>     <div class="spinner-border text-success" role="status"  style ="display : block ; margin-left : auto; margin-right : auto"> <span class="sr-only">Loading...</span> </div></div> <div class="card-body"> <h5 class="card-title" style="font-weight: bold;">Banou`s Birthday</h5><p style = "font-size : 0.8em;color : '+color+'; margin-bottom : -7px; margin-top : -7px">'+thePack+'</p></div> </div>'

                  }
              $( "#ticket-list" ).append( text );

                });
              
           
          }else if (partyDetails.valide == -1) {
            console.log();
            var click ='onClick="clickTicket('+partyDetails.valide+",'"+partyDetails.pack+"'"+')"'
            var text = '<div id="'+partyName+'" onClick="clickTicketInvalid(0)"  data-toggle="modal" data-target="#alertModalPaiement"  class="card" style=" margin-top: 10px; box-shadow: 5px 5px 10px 1px rgba(56, 56, 56, 0.2); border-radius: 30px; max-width: 400px; display: block; margin-left: auto; margin-right: auto" > <div class="card-img-top" alt="Card image cap" style="border-radius: 30px 30px 0 0; height: 150px; background: no-repeat url('+"'../asset/group3.JPG'"+'); background-size: cover; background-position: center; display: flex; justify-content: center; align-items: center; flex-direction: column; filter: grayscale(100%);"> <h3 style="text-align: center; color: white; font-weight: bold">Terminé</h3>    </div> <div class="card-body"> <h5 class="card-title" style="font-weight: bold;">Larroque : 3ème Dose</h5><p style="font-size: 0.8em; color: '+color+'; margin-bottom: -7px; margin-top: -7px">'+partyDetails.pack+'</p></div> </div>';
     
            $( "#ticket-list" ).append( text );
    
          } else {
            //on affiche un boutton pour acheter des billets
            var text = "<br><div style='text-align:center;'><p>Tu n'as pas encore de ticket !Fonce en acheter un!</p></div>"
            $( "#ticket-list" ).append( text );
          }
        });
      }

            
              console.log(snapshot.val());

    
    });
    
    var dbRef2 = firebase.database().ref().child('user').child(uid)
    dbRef2.on('value',  function(snapshot){
        console.log(snapshot.val());
        DataUser = snapshot.val()
        
        $( "#myname" ).replaceWith('<h3 id="myname">'+DataUser.firstname+' '+DataUser.name+'</h3>');
      //affichage des infos :
      var infoClient = '<div style="display: flex; justify-content: space-evenly;">\
                         <p><b>Prénom :</b> '+ DataUser.firstname +'</p>\
                          <p><b>nom :</b> '+ DataUser.name +' </p>\
                          </div>\
                          <div ><p style="text-align : center;"><b>Username : </b>@'+DataUser.username +'</p></div>\
                          <div><p style="text-align : center;"><b>Adresse mail : </b>'+ DataUser.mail +'</p></div>\
                          <div><p style="text-align : center;"><b>numéro de téléphone : </b>'+ DataUser.phone +'</p></div>'
      $( "#infoClient" ).append( infoClient );
     
    });

  
      }else{
        console.log(user)
      }

      //Changement du boutton connexion :

      // ...
    } else {
      // User is signed out
      // ...
      console.log(user)
  
      
    }
  });

  function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

function closeAlert()   //Onclick du bouton du div
{
var alertBox =  document.getElementById("alert"); // On selection le div present dans la page et remplit par nos soins 
alertBox.innerHTML =""; // Et on le vide de son contenue
}


  function clickTicketInvalid(statut){
    if (statut == 0) {
     // alert("Les paiements ne sont pas encore ouvert. Tu seras notifié lorsque tu pourras payer ton ticket")
    //  alert('Boite de dialogue,<br>sans evennement onclick !');
    
    }
  /*  if ( confirm( "Si vous n'avez pas payer, vous pouvez le faire en cliquant ci-dessous. Si c'est déja fait Vous serez notifié par mail lors de sa validation." ) ) {
      // Code à éxécuter si le l'utilisateur clique sur "OK"
      window.open('https://lydia-app.com/collect/53275-conso-soiree/fr', '_blank')

  } else {
      // Code à éxécuter si l'utilisateur clique sur "Annuler" 
  }*/
     // alert("Votre commande est en cours de traitement. Vous serez notifié par mail lors de sa validation")
  }
  function clickTicket(valid,id, pack){
    console.log(valid)
    console.log(pack);
    infoTicket = 
        {
            valid : valid,
            pack : pack,
            id : id
        }
         
    console.log(DataUser)
    console.log(infoTicket)
    console.log("qsdfdsf")
    console.log(User);
        console.log("IDDDD : ",id);
    var dbRef2 = firebase.database().ref().child('evenement').child(id)
    let infoParty = {}
    dbRef2.once('value',  function(snapshot){
        console.log("PARTY : ",snapshot.val());
        infoParty = snapshot.val()
        console.log("INFOP :::",infoParty);
        
    
    console.log("INFOP :::",infoParty);
  //  document.getElementById("qrcode5")
  $( "#firstname" ).replaceWith('<div id="firstname">Prénom : '+DataUser.firstname+'</div>' );  
  $( "#name" ).replaceWith('<div id="name">Prénom : '+DataUser.name+'</div>' );
  $( "#username" ).replaceWith('<p id="username" style="text-align: center;font-weight: bold; ">@'+DataUser.username+'' );   
  $( "#pack" ).replaceWith('<h2 id="pack" style="text-align: center; text-transform:uppercase">PACK '+DataUser.party.Larroque3.pack+'</h2> ');  
  $( "#info" ).replaceWith('<div style="text-align: center; id="info"><p style="text-align: center;">Du '+infoParty.dateD+' au '+infoParty.dateF+'</p><i >'+infoParty.Lieu+'</i></div>');   
    $( "#qrcodeTable" ).replaceWith("<div id='qrcodeTable'></div>" );  
    jQuery('#qrcodeTable').qrcode({
  
		text	: User

	});	

});

  }

  function print(){
    var element = document.getElementById('modalContent');

      html2pdf().set({
        pagebreak: { mode: 'avoid-all', before: '#stop' }
      }).from(element).save();
     
  }

  function admin(){
    document.location.href="admin.html";
  }

  function GoPay(){
    document.location.href='https://lydia-app.com/pots?id=83623-larroque-5-x-bday-banou';
 
  }
  

