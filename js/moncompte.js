



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
 
      console.log(uid);
      var dbRef = firebase.database().ref().child('user').child(uid).child("party");
      dbRef.child("Larroque3").on('value',  function(snapshot){
          if (snapshot.child("valide").val() == 1) {
              console.log("Ok");
            var click ='onClick="clickTicket('+snapshot.child("valide").val()+",'"+snapshot.child('pack').val()+"'"+')"'
              var text = '<div onClick="clickTicket('+snapshot.child("valide").val()+",'"+snapshot.child('pack').val()+"'"+')"  data-toggle="modal" data-target="#exampleModal"  class="card" style=" margin-top: 10px; box-shadow: 5px 5px 10px 1px rgba(56, 56, 56, 0.2); border-radius: 30px; max-width: 400px; display: bloc; margin-left: auto; margin-right: auto" > <div class="card-img-top" src="../asset/larroque.jpg.JPG" alt="Card image cap" style="border-radius: 30px 30px 0 0; height: 150px; background: no-repeat url('+"'../asset/larroque.jpg.JPG'"+');background-size: 400px;"> </div> <div class="card-body"> <h5 class="card-title" style="font-weight: bold;">Larroque : 3ème Dose</h5><p style = "font-size : 0.8em;color : red; margin-bottom : -7px; margin-top : -7px">Premium</p></div> </div>'
              $( "#ticket-list" ).append( text );
          } else if (snapshot.child("valide").val() == 0) {
            var text = '<div onClick="clickTicketInvalid()"   class="card" style=" margin-top: 10px; box-shadow: 5px 5px 10px 1px rgba(56, 56, 56, 0.2); border-radius: 30px; max-width: 400px; display: bloc; margin-left: auto; margin-right: auto" > <div class="card-img-top" src="../asset/larroque.jpg.JPG" alt="Card image cap" style="border-radius: 30px 30px 0 0; height: 150px; background: no-repeat url('+"'../asset/larroque.jpg.JPG'"+');background-size: 400px; display : flex; justify-content : center; flex-direction :column; filter: grayscale(100%);"> <h3 style="text-align : center; color : white;vertical-align: middle; font-weight : bold">En attente de validation</h3>     <div class="spinner-border text-success" role="status"  style ="display : block ; margin-left : auto; margin-right : auto"> <span class="sr-only">Loading...</span> </div></div> <div class="card-body"> <h5 class="card-title" style="font-weight: bold;">Larroque : 3ème Dose</h5><p style = "font-size : 0.8em;color : red; margin-bottom : -7px; margin-top : -7px">Premium</p></div> </div>'
            $( "#ticket-list" ).append( text );
          }
    
      console.log(snapshot.val());

    
    });
    var dbRef2 = firebase.database().ref().child('user').child(uid)
    dbRef2.on('value',  function(snapshot){
        console.log(snapshot.val());
        DataUser = snapshot.val()
        
    });
      //affichage du nom :
     
  

  
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
  function clickTicketInvalid(){
      alert("Votre commande est en cours de traitement. Vous serez notifié par mail et par SMS lors de sa validation")
  }
  function clickTicket(valid,pack){
    console.log(valid)
    console.log(pack);
    infoTicket = 
        {
            valid : valid,
            pack : pack
        }
         
    console.log(DataUser)
    console.log(infoTicket)
    console.log("qsdfdsf")
    console.log(User);
  //  document.getElementById("qrcode5")
  $( "#firstname" ).replaceWith('<div id="firstname">Prénom : '+DataUser.firstname+'</div>' );  
  $( "#name" ).replaceWith('<div id="name">Prénom : '+DataUser.name+'</div>' );
  $( "#username" ).replaceWith('<p id="username" style="text-align: center;font-weight: bold; ">@'+DataUser.username+'</p> ' );   
  $( "#pack" ).replaceWith('<h2 id="pack" style="text-align: center; text-transform:uppercase">PACK '+DataUser.party.Larroque3.pack+'</h2> ');    
    $( "#qrcodeTable" ).replaceWith("<div id='qrcodeTable'></div>" );  
    jQuery('#qrcodeTable').qrcode({
  
		text	: User

	});	



  }

  function print(){
    var element = document.getElementById('modalContent');

      html2pdf().set({
        pagebreak: { mode: 'avoid-all', before: '#stop' }
      }).from(element).save();
     
  }

  

