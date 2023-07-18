firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      if (uid!= "k3jYVq3VdTaTIYiTyBi3Rx3Pl8J3") {
        document.location.href="../index.html";
      }

      // ...
    } else {
      // User is signed out
      // ...
      console.log(user)
      console.log("ddd")
     
      
    }
  });

  var dbRef = firebase.database().ref().child('user');
  dbRef.once('value',  function(snapshot){


  console.log(snapshot.val());
  object = snapshot.val()
  var totalTicketValide = 0
  var totalTicketInvalide = 0
  var totalTicket = 0
  var TicketPre = 0
  var TicketChill = 0
  var TicketGeoff = 0
  for (var key in object) {
    console.log(key, object[key]);
    console.log(object[key].mail);
    var party ;

    console.log(party);

    //génération d un élément
    var accordeon = '<div class="accordion-item">\
    <h2 class="accordion-header" id="heading'+key+'">\
      <button id="boutton" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+key+'" aria-expanded="true" aria-controls="collapse'+key+'">\
      '+object[key].firstname+' '+object[key].name+'\
      </button>\
    </h2>\
    <div id="collapse'+key+'" class="accordion-collapse collapse show" aria-labelledby="heading'+key+'" data-bs-parent="#user-list">\
      <div class="accordion-body">\
      <p>Id : '+key+'</p>\
      <b>'+object[key].mail+'</b>\
      <div id="party'+key+'"></div>\
      </div>\
    </div>\
  </div>'


    $( "#user-list" ).append( accordeon);

    for (var i in object[key].party) {
        console.log(object[key].party[i]);
        console.log(i);
        console.log("YOOOOO",object[key], key);
       // party[i] = object[key].party[i]
       var list_party
       if (object[key].party[i].valide == 0) {
         totalTicketInvalide = totalTicketInvalide +1;
         totalTicket = totalTicket +1
        list_party = '<div>\
        <b>'+i+' : </b> Pack <b>'+object[key].party[i].pack+'  </b><button type="button" id="bouttonOff'+key+i+'" onClick="valider('+"'"+key+"'"+','+"'"+i+"'"+')" class="btn btn-danger">Valider</button>\
        <i id="check'+key+i+'" class="fas fa-times"></i></div>\
        '
       }else if (object[key].party[i].valide == 1) {
        totalTicketValide = totalTicketValide +1;
        totalTicket = totalTicket +1
        list_party = '<div>\
        <b>'+i+' : </b> Pack <b>'+object[key].party[i].pack+'  </b><button type="button" id="bouttonOn'+key+i+'" onClick="retirer('+"'"+key+"'"+','+"'"+i+"'"+')" class="btn btn-success">Retirer</button>\
        <i id="cross'+key+i+'"  class="fas fa-check"></i></div>\
        '  
       }
       else if  (object[key].party[i].valide == -1){

        list_party = '<div>\
        <b>'+i+' : </b> Pack <b>'+object[key].party[i].pack+'  Terminé\
        <i id="cross'+key+i+'"  class="fas fa-check"></i></div>\
        '  
       }
        //quel ticket ?
        if (object[key].party[i].pack == "premium" && object[key].party[i].valide != -1) {
          TicketPre += 1
        } else if(object[key].party[i].pack == "chill" && object[key].party[i].valide != -1) {
          TicketChill +=1
        }
        console.log("Geof : "+TicketGeoff);
        console.log(TicketPre);
        console.log(object[key].party[i].pack);

       $( "#party"+key ).append( list_party);
    }

    
   



    //affichage du prénom
    var text = '<div onClick="clickTicket('+snapshot.child("valide").val()+",'"+snapshot.child('pack').val()+"'"+')"  data-toggle="modal" data-target="#exampleModal"  class="card" style=" margin-top: 10px; box-shadow: 5px 5px 10px 1px rgba(56, 56, 56, 0.2); border-radius: 30px; max-width: 400px; display: bloc; margin-left: auto; margin-right: auto" > <div class="card-img-top" src="../asset/larroque.jpg.JPG" alt="Card image cap" style="border-radius: 30px 30px 0 0; height: 150px; background: no-repeat url('+"'../asset/larroque.jpg.JPG'"+');background-size: 400px;"> </div> <div class="card-body"> <h5 class="card-title" style="font-weight: bold;">Larroque : 3ème Dose</h5><p style = "font-size : 0.8em;color : red; margin-bottom : -7px; margin-top : -7px">Premium</p></div> </div>'
    $( "#ticket-list" ).append( text );
  }
  /*
  obj = object
  Object.entries(obj).forEach(
    ([clé, valeur]) => console.log(`${clé}: ${valeur}`)
  );
  for (const property in object) {
      var prop = `${object[property]}`
      console.log("prop : " ,prop);

    console.log(`${property}: ${object[property]}`);
    for (const property in object) {
        console.log(`${property}: ${object[property]}`);
        
      }
  }*/
  
  $( "#Stats" ).append( "<p>Tickets Invalides : <b>"+totalTicketInvalide+"</b></p> "  );
  $( "#Stats" ).append( "<p>Tickets Valides : <b>"+totalTicketValide+"</b> </p> " );
  $( "#Stats" ).append( "<p>Total Tickets : <b>"+totalTicket+"</b> </p> " );
  $( "#StatsPack" ).append( "<p>Total Tickets Premium : <b>"+TicketPre+"</b> </p> " );
  $( "#StatsPack" ).append( "<p>Total Tickets Geoff : <b>"+TicketChill+"</b> </p> " );

  console.log(totalTicket);
});

function valider (id,party){
    console.log(party);
    var dbRef = firebase.database().ref().child('user').child(id).child("party").child(party);
    dbRef.once('value',  function(snapshot){
        console.log(snapshot.val())
        var varParty = snapshot.val()
        var dbRef2 = firebase.database().ref().child('user').child(id)
        dbRef2.once('value',  function(snapshot){
          console.log(snapshot.val())
          var usr = snapshot.val()
          Email.send({
            Host: "smtp.gmail.com",
            Username : "boubou.ticket@gmail.com",
            Password : "larroque0422",
            To :  usr.mail,
            From : "boubou.ticket@gmail.com",
            Subject : usr.firstname + ", votre demande à été validé !",
            Body : "<strong>Bonjour "+ usr.firstname+"</strong><br><br>\
              Félicitation ! Votre demande de ticket pour participer à <i>Larroque : 3<sup>ème</sup></i> Dose avec le pack <b>"+varParty.pack+"</b> à été validé.<br>\
              Vous pouvez consulter et télécharger votre billet sur <a href='www.boubou-ticket.com'>www.boubou-ticket.fr/moncompte.html</a>. Ou bien dans l'onglet <i>'mon compte'</i> sur <a href='www.boubou-ticket.com'>www.boubou-ticket.fr</a><br><br>\
              Toute l'équipe de Boubou Company &reg; vous remercie de votre fidélité<br><br>\
              Votre fidèle organisateur,<br>\
              Boubou"
          }).then(
          // message => alert("mail sent successfully")
          //window.open('https://lydia-app.com/collect/53275-conso-soiree/fr', '_blank')
          );
         
      });
        
       
    });
    var newStatut = {
        valide : "1"
    }

    dbRef.update(newStatut)

    

    $( "#bouttonOff"+id+party ).replaceWith( '</b><button type="button" id="bouttonOn'+id+party+'" onClick="retirer('+"'"+id+"'"+','+"'"+party+"'"+')" class="btn btn-success">Retirer</button>' );
    $( "#check"+id+party ).replaceWith( '<i id="cross'+id+party+'"  class="fas fa-check"></i>' );

}
function retirer (id,party){
    console.log(party);
    var dbRef = firebase.database().ref().child('user').child(id).child("party").child(party);
    dbRef.once('value',  function(snapshot){
      var varParty = snapshot.val()
        console.log(snapshot.val())
        var dbRef2 = firebase.database().ref().child('user').child(id)
        dbRef2.once('value',  function(snapshot){
          console.log(snapshot.val())
          var usr = snapshot.val()
          Email.send({
            Host: "smtp.gmail.com",
            Username : "boubou.ticket@gmail.com",
            Password : "larroque0422",
            To :  usr.mail,
            From : "boubou.ticket@gmail.com",
            Subject : usr.firstname + ", votre demande à été annulé !",
            Body : "<strong>Bonjour "+ usr.firstname+"</strong><br><br>\
              Suite à une inspection de la part de nos équipes, nous avons décider de supprimer votre billet ! Votre demande de ticket pour participer à <i>Larroque : 3<sup>ème</sup></i> Dose avec le pack <b>"+varParty.pack+"</b> à donc été retiré.<br>\
              Pour plus d'informations, contactez un organisateur ou consultez la FAQ sur <a href='www.boubou-ticket.com'>www.boubou-ticket.com</a><br><br>\
              Toute l'équipe de Boubou Company &reg; vous remercie de votre fidélité<br><br>\
              Votre fidèle organisateur,<br>\
              Boubou"
          }).then(
          // message => alert("mail sent successfully")
          //window.open('https://lydia-app.com/collect/53275-conso-soiree/fr', '_blank')
          );
         
      });
        
       
    });
    var newStatut = {
        valide : "0"
    }

    dbRef.update(newStatut)
    $( "#bouttonOn"+id+party ).replaceWith( '</b><button type="button" id="bouttonOff'+id+party+'" onClick="valider('+"'"+id+"'"+','+"'"+party+"'"+')" class="btn btn-danger">Valider</button>' );
    $( "#cross"+id+party ).replaceWith( '<i id="check'+id+party+'"  class="fas fa-times"></i>' );

}

function back(){
    document.location.href="monCompte.html";
}

function openPay(){
  if ( confirm( "Ouvrir les paiements?" ) ) {
    var dbRefAdmin = firebase.database().ref().child('admin').child('ouverturePaiement');
    var newStatut = {
      ouverturePaiement : 1
  }

  dbRefAdmin.update(newStatut)


} else {
    // Code à éxécuter si l'utilisateur clique sur "Annuler" 
}
}
function closePay(){
  if ( confirm( "Fermer les paiements?" ) ) {
    var dbRefAdmin = firebase.database().ref().child('admin').child('ouverturePaiement');
    var newStatut = {
      ouverturePaiement : 0
  }

  dbRefAdmin.update(newStatut)


} else {
    // Code à éxécuter si l'utilisateur clique sur "Annuler" 
}
}
function MailPay(){
  if ( confirm( "Envoyer les mails ?" ) ) {
   

    var dbRef = firebase.database().ref().child('user');
    dbRef.once('value',  function(snapshot){
      var liste_mail = ""
  
      object = snapshot.val()
        for (var i in object) {
          console.log(object[i]);
          usr = object[i]
       // var dbRef = firebase.database().ref().child('user').child(object[i]).child("party").child("Larroque3");
       /*
              Email.send({
                Host: "smtp.gmail.com",
                Username : "boubou.ticket@gmail.com",
                Password : "larroque0422",
                To :  "thomasboursac@gmail.com",
                From : "boubou.ticket@gmail.com",
                Subject : usr.firstname + ", Les paiements sont ouvert ! ",
                Body : "<strong>Bonjour "+ usr.firstname+"</strong><br><br>\
                  Bonne nouvelle ! Les paiements pour Larroque3 sont ouvert ! <br>\
                  Si vous ne l'avez pas encore faite, foncez payer la somme corespondant a votre pack sur ... pour pouvoir valider votre ticket<br>\
                  Toute l'équipe de Boubou Company &reg; vous remercie de votre fidélité<br><br>\
                  Votre fidèle organisateur,<br>\
                  Boubou"
              }).then(
               message => console.log("mail sent successfully "+usr.firstname)
              //window.open('https://lydia-app.com/collect/53275-conso-soiree/fr', '_blank')
              );*/
            liste_mail = liste_mail +","+ usr.mail
          
      }
   /*   var email = document.createElement("a");
      email.href = "mailto:"+liste_mail;
      var subject = document.getElementById("selectList").value
      console.log(liste_mail);
      email.click();*/
      var yourMessage = "Bonjour !\
      Bonne nouvelle ! Les paiements pour Larroque3 sont ouvert ! \
      Si vous ne l'avez pas encore faite, foncez payer la somme corespondant a votre pack sur ... pour pouvoir valider votre ticket\
      Toute l'équipe de Boubou Company &reg; vous remercie de votre fidélité\
      Votre fidèle organisateur,\
      Boubou";
      var subject = "Paiement Ouvert !";
      document.location.href = "mailto:"+liste_mail+"?subject="
          + encodeURIComponent(subject)
          + "&body=" + encodeURIComponent(yourMessage);
      
  });



} else {
    // Code à éxécuter si l'utilisateur clique sur "Annuler" 
}
}

function MailPayAuto(){
  if ( confirm( "Envoyer les mails ?" ) ) {
   

    var dbRef = firebase.database().ref().child('user');
    dbRef.once('value',  function(snapshot){
      var liste_mail = ""
  
      object = snapshot.val()
        for (var i in object) {
          console.log(object[i]);
          usr = object[i]
       // var dbRef = firebase.database().ref().child('user').child(object[i]).child("party").child("Larroque3");
       
              Email.send({
                Host: "smtp.gmail.com",
                Username : "boubou.ticket@gmail.com",
                Password : "larroque0422",
                To :  usr.mail,
                From : "boubou.ticket@gmail.com",
                Subject : usr.firstname + ", Les paiements sont ouvert ! ",
                Body : "<strong>Bonjour "+ usr.firstname+"</strong><br><br>\
                  Bonne nouvelle ! Les paiements pour Larroque3 sont ouvert ! <br>\
                  Si vous ne l'avez pas encore faite, foncez payer la somme corespondant a votre pack sur ... pour pouvoir valider votre ticket<br>\
                  Toute l'équipe de Boubou Company &reg; vous remercie de votre fidélité<br><br>\
                  Votre fidèle organisateur,<br>\
                  Boubou"
              })
              console.log("mail sent successfully "+usr.mail)
         
          
      }
   /*   var email = document.createElement("a");
      email.href = "mailto:"+liste_mail;
      var subject = document.getElementById("selectList").value
      console.log(liste_mail);
      email.click();*/

      
  });



} else {
    // Code à éxécuter si l'utilisateur clique sur "Annuler" 
}
}