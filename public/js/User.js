 //Firebase Configs

 var firebase = app_firebase;
  //Firebase Config Ends Here

     var publicRoomIdentifier = 'dashboard';

      var connection = new RTCMultiConnection();
     
      connection.socketURL = 'http://192.168.43.22:5000/';
      // connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
      
      /// make this room public
      connection.publicRoomIdentifier = publicRoomIdentifier;
      connection.socketMessageEvent = publicRoomIdentifier;
      
      // keep room opened even if owner leaves
      connection.autoCloseEntireSession = true;
      $(document).ready(function(){
        var today = new Date();
        var today_date = today.getDate();
        var today_month = today.getMonth()+1; //As January is 0.
        var today_year = today.getFullYear();

        if(today_date<10) today_date='0'+today_date;
        if(today_month<10) today_month='0'+today_month;
        var currentDate = today_year+'-'+ today_month+'-'+ today_date;
        $('#date-create').attr('min', currentDate);
      })

      $('.btn-avail').click(function (){
        window.location.replace("./avail_webinars.html")
      })
      
      connection.connectSocket(function(socket) {
      
      
          socket.on('disconnect', function() {
              location.reload();
          });
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
      
      
            
      function alert(message, title, specialMessage, callback) {
          callback = callback || function() {};
      
          $('.btn-alert-close').unbind('click').bind('click', function(e) {
              e.preventDefault();
              $('#alert-box').modal('hide');
              $('#confirm-box-topper').hide();
      
              callback();
          });
      
          $('#alert-title').html(title || 'Alert');
          $('#alert-special').html(specialMessage || '');
          $('#alert-message').html(message);
          $('#confirm-box-topper').show();
      
          $('#alert-box').modal({
              backdrop: 'static',
              keyboard: false
          });
      }
      
      function confirmBox(message, callback) {
          $('#btn-confirm-action').html('Confirm').unbind('click').bind('click', function(e) {
              e.preventDefault();
              $('#confirm-box').modal('hide');
              $('#confirm-box-topper').hide();
              callback(true);
          });
      
          $('#btn-confirm-close').html('Cancel');
      
          $('.btn-confirm-close').unbind('click').bind('click', function(e) {
              e.preventDefault();
              $('#confirm-box').modal('hide');
              $('#confirm-box-topper').hide();
              callback(false);
          });
      
          $('#confirm-message').html(message);
          $('#confirm-title').html('Please Confirm');
          $('#confirm-box-topper').show();
      
          $('#confirm-box').modal({
              backdrop: 'static',
              keyboard: false
          });
      }
       
      var random_roomid = Math.floor((Math.random() * 100000000) + 1);

       document.getElementById("txt-roomid").value = random_roomid;

        
      $('#btn-create-room').click(function() {
        var roomid = random_roomid;
       
          var fullName = $('#txt-user-name').val().toString();
          if (!fullName || !fullName.replace(/ /g, '').length) {
              alert('Please enter your name.', 'Your Name Is Required');
              return;
          }
      
          connection.extra.userFullName = fullName;
      
          
      
          var initialHTML = $('#btn-create-room').html();
      
          $('#btn-create-room').html('Please wait...').prop('disabled', true);
      
          connection.checkPresence(roomid, function(isRoomExist) {
              if (isRoomExist === true) {
                  alert('This room-id is already taken and room is active. Please join instead.', 'Room ID In Use');
                  return;
              }


              connection.sessionid = roomid;
              connection.isInitiator = true;

              
              
              
          $('#startRoomModel').modal('hide');
          var href = 'http://192.168.43.22:5000/public/concall.html?open=' + connection.isInitiator + '&sessionid=' + connection.sessionid + '&publicRoomIdentifier=' + connection.publicRoomIdentifier + '&userFullName=' + connection.extra.userFullName;
          
          
          //Variables For Pushing To Firebase DB
        var rooomowner = document.getElementById("txt-user-name").value;
        var date = document.getElementById("date-create").value;
        var time = document.getElementById("time-create").value;
        var cat_host = document.getElementById("cat_host").value;
        //(uid/as_host) is used for saving roomi to each user
        var ref = firebase.database().ref('users/'+uid +'/as_host');
        var openpush = firebase.database().ref('allhosted');
        var roomi = {
            roomid: roomid ,
            roomOwner: rooomowner,
            date: date,
            time: time,
            category: cat_host,
            URL: href
        }
        ref.push(roomi);
        openpush.push(roomi);
        
        location.reload();
       
              
              $('#btn-create-room').html(initialHTML).prop('disabled', false);
          });
      });
      $('#txt-room-password').focus();
      
     
      
     

    
    var uid;
    firebase.auth().onAuthStateChanged(function(user){
        
        if(user){
            if(user != null){
              //Retrieving Pushed Data
                uid = user.uid;
                var hostref = firebase.database().ref('users/'+uid+'/as_host');

                       hostref.orderByChild("date").on('child_added', gotData, err);
                            function gotData(data){
       
      var hostData = data.val();
      

      

     
        // VarIABLES FROM FIREBASE DB
        var roomidhost = hostData.roomid;
        var roomOwnerhost = hostData.roomOwner;
        var URLhost = hostData.URL;
        var hostdate = hostData.date;
        var hosttime = hostData.time;
        var hostcathost = hostData.category;

       
        
        var today = new Date();
        var today_hours = today.getHours();
        var today_mins = today.getMinutes();
        var today_date = today.getDate();
        var today_month = today.getMonth()+1; //As January is 0.
        var today_year = today.getFullYear();
       
       var today_time = today_hours+':'+today_mins;
        console.log(today_time);

        if(today_date<10) today_date='0'+today_date;
        if(today_month<10) today_month='0'+today_month;
        var currentDate = today_year+'-'+ today_month+'-'+ today_date;
        
      console.log(currentDate);
      
      
    if(currentDate > hostdate){
      var past_meet_host = document.getElementById("past_meet_host");
      var row = past_meet_host.insertRow(0);
      
      var hosted_data_0 = row.insertCell(0);
      var hosted_data_1 = row.insertCell(1);
      var hosted_data_2 = row.insertCell(2);
      var hosted_data_3 = row.insertCell(3);
   
     

      hosted_data_0.innerHTML = roomidhost;
      hosted_data_1.innerHTML = hostdate;
      hosted_data_2.innerHTML = hosttime;
      hosted_data_3.innerHTML = hostcathost;
    }
    else if(currentDate <= hostdate){
      var future_meet_host = document.getElementById("future_meet_host");
      var row = future_meet_host.insertRow(0);
      
      var hosted_data_0 = row.insertCell(0);
      var hosted_data_1 = row.insertCell(1);
      var hosted_data_2 = row.insertCell(2);
      var hosted_data_3 = row.insertCell(3);
      var hosted_data_4 = row.insertCell(4)
      // console.log(hostdate+": is Past");
     

      hosted_data_0.innerHTML = roomidhost;
      hosted_data_1.innerHTML = hostdate;
      hosted_data_2.innerHTML = hosttime;
      hosted_data_3.innerHTML = hostcathost;
      hosted_data_4.innerHTML = '<button id="start_now" class="btn-startnow">Start Now</button>';

      //
      var href = URLhost;
      $('#start_now').click(function(){
        
        var newWin = window.open(href);
        
    if (!newWin || newWin.closed || typeof newWin.closed == 'undefined') {
        var html = '';
        html += '<p>Please click following link:</p>';
        html += '<p><a href="' + href + '" target="_blank">';
        if(connection.isInitiator) {
          html += 'Click To Open The Room';
        }
        else {
          html += 'Click To Join The Room';
        }
        html += '</a></p>';
        alert(html, 'Popups Are Blocked');
    }
      })
        
      
    }
    else if(currentDate == hostdate){
      if(today_time > hosttime){
        var past_meet_host = document.getElementById("past_meet_host");
      var row = past_meet_host.insertRow(0);
      
      var hosted_data_0 = row.insertCell(0);
      var hosted_data_1 = row.insertCell(1);
      var hosted_data_2 = row.insertCell(2);
      var hosted_data_3 = row.insertCell(3);
   
     

      hosted_data_0.innerHTML = roomidhost;
      hosted_data_1.innerHTML = hostdate;
      hosted_data_2.innerHTML = hosttime;
      hosted_data_3.innerHTML = hostcathost;
      }
       else if(today_time < hosttime){
        var future_meet_host = document.getElementById("future_meet_host");
      var row = future_meet_host.insertRow(0);
      
      var hosted_data_0 = row.insertCell(0);
      var hosted_data_1 = row.insertCell(1);
      var hosted_data_2 = row.insertCell(2);
      var hosted_data_3 = row.insertCell(3);
      var hosted_data_4 = row.insertCell(4);
   
     

      hosted_data_0.innerHTML = roomidhost;
      hosted_data_1.innerHTML = hostdate;
      hosted_data_2.innerHTML = hosttime;
      hosted_data_3.innerHTML = hostcathost;
      hosted_data_4.innerHTML = '<button id="start_now" class="btn-startnow">Start Now</button>';

//
var href = URLhost;
$('#start_now').click(function(){
  
  var newWin = window.open(href);
  
if (!newWin || newWin.closed || typeof newWin.closed == 'undefined') {
  var html = '';
  html += '<p>Please click following link:</p>';
  html += '<p><a href="' + href + '" target="_blank">';
  if(connection.isInitiator) {
    html += 'Click To Open The Room';
  }
  else {
    html += 'Click To Join The Room';
  }
  html += '</a></p>';
  alert(html, 'Popups Are Blocked');
}
})
    
       }

     
    }
     
     
      

      
     }
     

     function err(){
       console.log(err);
     }




       var userref = firebase.database().ref('users/'+uid+'/as_user');

       userref.orderByChild("date").on('child_added', userdata, error);
            function userdata(data){
              var user_data = data.val();
                     var user_roomid = user_data.roomid;
                     var user_roomOwner = user_data.roomuname;
                     var user_date = user_data.date;
                     var user_time = user_data.time;
                     var user_category = user_data.category;
                     var user_URL = user_data.URL;

                     var today = new Date();
        var today_hours = today.getHours();
        var today_mins = today.getMinutes();
        var today_date = today.getDate();
        var today_month = today.getMonth()+1; //As January is 0.
        var today_year = today.getFullYear();
       
       var today_time = today_hours+':'+today_mins;
        console.log(today_time);

        if(today_date<10) today_date='0'+today_date;
        if(today_month<10) today_month='0'+today_month;
        var currentDate = today_year+'-'+ today_month+'-'+ today_date;
        
      console.log(currentDate);
      
      
    if(currentDate > user_date){
      var user_past_meet_host = document.getElementById("as_user-past");
      var row = user_past_meet_host.insertRow(0);
      
      var user_data_0 = row.insertCell(0);
      var user_data_1 = row.insertCell(1);
      var user_data_2 = row.insertCell(2);
      var user_data_3 = row.insertCell(3);
      var user_data_4 = row.insertCell(4);
   
     

      user_data_0.innerHTML = user_roomid;
      user_data_1.innerHTML = user_roomOwner;
      user_data_2.innerHTML = user_date;
      user_data_3.innerHTML = user_time;
      user_data_4.innerHTML = user_category;

    
    }
    else if(currentDate < user_date){
      var user_future_meet_host = document.getElementById("as_user-future");
      var row = user_future_meet_host.insertRow(0);
      
      var user_data_0 = row.insertCell(0);
      var user_data_1 = row.insertCell(1);
      var user_data_2 = row.insertCell(2);
      var user_data_3 = row.insertCell(3);
      var user_data_4 = row.insertCell(4);
      var user_data_5 = row.insertCell(5);
   
     

      user_data_0.innerHTML = user_roomid;
      user_data_1.innerHTML = user_roomOwner;
      user_data_2.innerHTML = user_date;
      user_data_3.innerHTML = user_time;
      user_data_4.innerHTML = user_category;
      user_data_5.innerHTML = '<button id="join_now" class="btn-joinow" class="btn btn-primary">Join Now</button>';
      //
      var href = user_URL;
      $('#join_now').click(function(){
        
        var newWin = window.open(href);
        
    if (!newWin || newWin.closed || typeof newWin.closed == 'undefined') {
        var html = '';
        html += '<p>Please click following link:</p>';
        html += '<p><a href="' + href + '" target="_blank">';
        if(connection.isInitiator) {
          html += 'Click To Open The Room';
        }
        else {
          html += 'Click To Join The Room';
        }
        html += '</a></p>';
        alert(html, 'Popups Are Blocked');
    }
      })
        
      
    }
    else if(currentDate == user_date){
      if(today_time > user_time){
        var user_past_meet_host = document.getElementById("as_user-past");
      var row = user_past_meet_host.insertRow(0);
      
      var user_data_0 = row.insertCell(0);
      var user_data_1 = row.insertCell(1);
      var user_data_2 = row.insertCell(2);
      var user_data_3 = row.insertCell(3);
      var user_data_4 = row.insertCell(4);
   
     

      user_data_0.innerHTML = user_roomid;
      user_data_1.innerHTML = user_roomOwner;
      user_data_2.innerHTML = user_date;
      user_data_3.innerHTML = user_time;
      user_data_4.innerHTML = user_category;
      }
       else if(today_time < user_time){
        var user_future_meet_host = document.getElementById("as_user-future");
      var row = user_future_meet_host.insertRow(0);
      
      var user_data_0 = row.insertCell(0);
      var user_data_1 = row.insertCell(1);
      var user_data_2 = row.insertCell(2);
      var user_data_3 = row.insertCell(3);
      var user_data_4 = row.insertCell(4);
      var user_data_5 = row.insertCell(5);
   
     

      user_data_0.innerHTML = user_roomid;
      user_data_1.innerHTML = user_roomOwner;
      user_data_2.innerHTML = user_date;
      user_data_3.innerHTML = user_time;
      user_data_4.innerHTML = user_category;
      user_data_5.innerHTML = '<button id="join_now" class="btn-joinow" class="btn btn-primary">Join Now</button>'
      //
      var href = user_URL;
      $('#join_now').click(function(){
        
        var newWin = window.open(href);
        
    if (!newWin || newWin.closed || typeof newWin.closed == 'undefined') {
        var html = '';
        html += '<p>Please click following link:</p>';
        html += '<p><a href="' + href + '" target="_blank">';
        if(connection.isInitiator) {
          html += 'Click To Open The Room';
        }
        else {
          html += 'Click To Join The Room';
        }
        html += '</a></p>';
        alert(html, 'Popups Are Blocked');
    }
})
    
       }

     
    }

            }
            function error(err){
              console.log(err);
            }
                var uemail = user.email;
                document.getElementById("show-email").innerHTML = uemail;
            }
        }
        
        else{
            
         uid = null;
            window.location.replace("http://192.168.43.22:5000/public/index.html");
        }
    });
    function signout(){
        firebase.auth().signOut();
    }
