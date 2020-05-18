var auth_page = {};
(function (){
   var firebase = app_firebase;

// xxxxxxxxxx User Surname Validation xxxxxxxxxx

// xxxxxxxxxx Email Validation xxxxxxxxxx

// xxxxxxxxxx Password Validation xxxxxxxxxx



function signup(){
  var runame = document.getElementById("runame").value;
  
  var remail = document.getElementById("remail").value;
  var rpwd= document.getElementById("rpwd").value;


  var runameformate = /^([A-Za-z.\s_-])/;    
  var remailformate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var rpwdformate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;

  var runameValid = runame.match(runameformate);
  var remailValid = remail.match(remailformate);
  var rpwdValid = rpwd.match(rpwdformate);


  
  if(runameValid == null){
    return alert("Please Enter Valid Name");
}
else if(remailValid == null){
    return  alert("Please Enter Valid Email");
}else if(rpwdValid == null){
    return alert("Password need atleast one uppercase");
}else{
    $('#btn-reg').html('Please wait...').prop('disabled', true);
    firebase.auth().createUserWithEmailAndPassword(remail, rpwd).then(function (user){ 
        var user = firebase.auth().currentUser;
        
        var uid;
        if (user != null) {
            uid = user.uid;
        }
        var firebaseRef = firebase.database().ref();
        var userData = {
            Name: runame,
            Email: remail,
        }
      
      firebaseRef.child('users/'+uid +'/profile').set(userData);
      alert('Your Account Created','Your account was created successfully, you can log in now.',)
      window.location.replace("./User.html");
  }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
  });
}
}
function signin(){
    var lemail = document.getElementById("lemail").value;
    var lpwd = document.getElementById("lpwd").value;
    var lemailformate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var lpwdformate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var lemailValid = lemail.match(lemailformate);
    var lpwdValid = lpwd.match(lpwdformate);
     
    if(lemailValid== null){
        return alert("Please Enter Valid Email");
    }else if(lpwdValid == null){
        return alert("Password need atleast one uppercase");
    }else{
        $('#btn-login').html('Please wait...').prop('disabled', true);
        firebase.auth().signInWithEmailAndPassword(lemail, lpwd).then(function(user) {
            
            alert("Succesfully Signed In");

            window.location.replace("./User.html");
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    }
   
}

  var uid = null;
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            
            window.location.replace("./User.html");   
        }
        else{
            
        }
    });
    window.addEventListener("load", function(){
        const loader = document.querySelector(".loader");
        loader.className += " hidden";
      })
      $('.form-group input').on("focus",function(){
        $(this).addClass("focus")
      })
      $('.form-group input').on("blur",function(){
        if ($(this).val() == "") 
        $(this).removeClass("focus")
      })
      
       auth_page.signin = signin;
       auth_page.signup = signup;

})()