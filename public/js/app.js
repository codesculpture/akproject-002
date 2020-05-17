var app_firebase = {};
(function (){
    var firebaseConfig = {
    apiKey: "AIzaSyB2mM6ygefMg9zTumN_t876GNzvtOW309Y",
    authDomain: "project-2trial.firebaseapp.com",
    databaseURL: "https://project-2trial.firebaseio.com",
    projectId: "project-2trial",
    storageBucket: "project-2trial.appspot.com",
    messagingSenderId: "932677367001",
    appId: "1:932677367001:web:9dc167ccd61e66b1fb7ac8",
    measurementId: "G-K0JGT22NJ3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  app_firebase = firebase;
})()