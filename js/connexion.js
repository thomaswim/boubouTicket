

  
  console.log("zefrsdkufygvsd");
  var str = $("#InputEmail").val();
  
  function newAccount(){
        var email = $("#InputEmail").val();
        var password = $("#InputPassword").val();
        var name = $("#name").val();
        var firstName = $("#firstName").val();
        var tel = $("#tel").val();
        var username = $("#username").val();
        console.log(email);
        console.log(password);
        console.log(name);
        console.log(firstName);
        console.log(tel);
        console.log(username);

        firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        console.log(user)
        

        var user = userCredential.user;
        var uid = user.uid;
        var dbRef = firebase.database().ref().child('user');
        //on crée une base de donnée pour user 
        dbRef.once('value',  function(snapshot){
          if (!snapshot.hasChild(uid)){
            console.log("doesn't exist")
            var newuser = {
              [uid] :{
                mail :user.email,
                name : name,
                firstname : firstName,
                phone :tel,
                username : username,
              }
            }
            dbRef.update(newuser)

        }else{

            console.log("true exist exist")
        }
        });

        document.location.href="../index.html";

        // ...
      })
      .catch((error) => {
          console.log("yolo")
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        alert(errorMessage)
        // ..
      });
  }


  function changerpage(){
    //document.location.href="../../index.html"
     
     document.location.href="../index.html";
   }


  
  function signInUser() {
    var email = $("#InputEmail").val();
    var password = $("#InputPassword").val();
    console.log(email + " "+ password)
    // [START auth_signin_password]
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("YES")
        changerpage()
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
        console.log("NO "+error.message)
        console.log("code "+error.code)
        fctmodal(error)
      });
    // [END auth_signin_password]
  };
  
  // Get the modal
 
