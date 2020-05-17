var auth_page = {};
(function (){
   var firebase = app_firebase;

// xxxxxxxxxx User Surname Validation xxxxxxxxxx
function checkruname(){
  var rusername = document.getElementById("runame").value;
  var flag = false;
  if(rusername === ""){
      flag = true;
  }
  if(flag){
      document.getElementById("runameerror").style.display = "block";
  }else{
      document.getElementById("runameerror").style.display = "none";
  }
}
// xxxxxxxxxx Email Validation xxxxxxxxxx
function checkremail(){
  var remail = document.getElementById("remail");
  var remailformate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var flag;
  if(remail.value.match(remailformate)){
      flag = false;
  }else{
      flag = true;
  }
  if(flag){
      document.getElementById("remailerror").style.display = "block";
  }else{
      document.getElementById("remailerror").style.display = "none";
  }
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkrpwd(){
  var rpwd = document.getElementById("rpwd");
  var rpwdformate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
  var flag;
  if(rpwd.value.match(rpwdformate)){
      flag = false;
  }else{
      flag = true;
  }    
  if(flag){
      document.getElementById("rpwderror").style.display = "block";
  }else{
      document.getElementById("rpwderror").style.display = "none";
  }
}


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
    return checkruname();
}
else if(remailValid == null){
    return checkremail();
}else if(rpwdValid == null){
    return checkrpwd();
}else{
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
      alert('Your Account Created','Your account was created successfully, you can log in now.',
      ).then((value) => {
          setTimeout(function(){
              window.location.replace("./User.html");
          }, 1000)
      });
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
        return checklemail();
    }else if(lpwdValid == null){
        return checklpwd();
    }else{
        firebase.auth().signInWithEmailAndPassword(lemail, lpwd).then(function(user) {
            $('#btn-login').html('Please wait...').prop('disabled', true);
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
function checklemail(){
    var lemail = document.getElementById("lemail");
    var lemailformate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if(lemail.value.match(lemailformate)){
        flag = false;
    }else{
        flag = true;
    }
    if(flag){
        document.getElementById("lemailerror").style.display = "block";
    }else{
        document.getElementById("lemailerror").style.display = "none";
    }
  }
  function checklpwd(){
    var lpwd = document.getElementById("lpwd");
    var lpwdformate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag;
    if(lpwd.value.match(lpwdformate)){
        flag = false;
    }else{
        flag = true;
    }    
    if(flag){
        document.getElementById("lpwderror").style.display = "block";
    }else{
        document.getElementById("lpwderror").style.display = "none";
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
       auth_page.checklemail = checklemail;
       auth_page.checklpwd = checklpwd;
       auth_page.checkrpwd = checkrpwd;
       auth_page.checkremail = checkremail;
       auth_page.checkruname = checkruname;
       auth_page.signin = signin;
       auth_page.signup = signup;

})()