 //Firebase Configs
 var firebase = app_firebase;


 
 window.addEventListener("load", function(){
  const loader = document.querySelector(".loader");
  loader.className += " hidden";
})
  
 var uid;
    firebase.auth().onAuthStateChanged(function(user){
        
        if(user){
            if(user != null){
             // Retrieving Pushed Data
                uid = user.uid;
               
                var all_webinars_ref = firebase.database().ref('allhosted');

     all_webinars_ref.orderByChild("date").on('child_added', gotData, err);
     function gotData(data){
       
      var all_webinars_data = data.val();

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
      
        var all_webinars_webid = all_webinars_data.roomid;
        var all_webinars_hoster = all_webinars_data.roomOwner;
        var all_webinars_URL = all_webinars_data.URL;
        var all_webinars_date = all_webinars_data.date;
        var all_webinars_time = all_webinars_data.time;
        var all_webinars_cat = all_webinars_data.category;
    
        if(currentDate < all_webinars_date && today_time >= all_webinars_time){
       

        

      
      var all_webinars = document.getElementById("all_webinars");
      

      var row = all_webinars.insertRow(0);

      
      
      var all_webinars_0 = row.insertCell(0);
      var all_webinars_1 = row.insertCell(1);
      var all_webinars_2 = row.insertCell(2);
      var all_webinars_3 = row.insertCell(3);
      var all_webinars_4 = row.insertCell(4);
      var all_webinars_5 = row.insertCell(5);


   
      all_webinars_0.innerHTML = all_webinars_webid;
      all_webinars_1.innerHTML = all_webinars_hoster
      all_webinars_2.innerHTML = all_webinars_date;
      all_webinars_3.innerHTML = all_webinars_time;
      all_webinars_4.innerHTML = all_webinars_cat;
      all_webinars_5.innerHTML = '<button id="btn-show-join-hidden-room" class="btn-addash"data-toggle="modal" data-target="#joinRoomModel">Add to My Dashboard</button>';
        }
       

      //Inputing Roomid From DB
    
      $('#joinRoomModel').modal('hide');
      $('#btn-show-join-hidden-room').click(function(){
          var currentRow = $(this).closest("tr");
          console.log(currentRow);

             //Room id
          var col1= currentRow.find("td:eq(0)").text();
          document.getElementById("txt-roomid-hidden").value = col1;
           //Category
          var all_webinars_cat = currentRow.find("td:eq(4)").text();
          
          //date
          var all_webinars_date = currentRow.find("td:eq(2)").text();
          

          var all_webinars_roomowner = currentRow.find("td:eq(1)").text();

          var all_webinars_time = currentRow.find("td:eq(3)").text();

         
      


          $('#btn-join-hidden-room').click(function(){
                var join_roomid = document.getElementById("txt-roomid-hidden").value;
              var join_roomuname = document.getElementById("txt-user-name-hidden").value;
              var join_rowner = all_webinars_roomowner;
              var join_cat = all_webinars_cat;
              var join_date = all_webinars_date;

              var join_time = all_webinars_time;
              
          connection.isInitiator = false;
          connection.sessionid = join_roomid;
          console.log(join_roomid+' '+join_roomuname+' '+join_cat)
          connection.extra.userFullName = join_roomuname;
             var join_url = 'https://project002kp.herokuapp.com/public/concall.html?open=' + connection.isInitiator + '&sessionid=' + connection.sessionid + '&publicRoomIdentifier=' + connection.publicRoomIdentifier + '&userFullName=' + connection.extra.userFullName;
                  var join_creds = {
                roomid: join_roomid,
                roomuname: join_roomuname,
                URL: join_url,
                date:  join_date,
                time: join_time,
                category: join_cat

              }
              
               
              var join_ref = firebase.database().ref("users/"+uid+"/as_user");
              join_ref.push(join_creds);
              
      
              
               window.location.replace("https://project002kp.herokuapp.com/public/User.html") 
              
              })
          
            })
              
     }

     function err(){
       console.log(err);
     } 
    
            
                var uemail = user.email;
                document.getElementById("show-email").innerHTML = uemail;
            }
        }
        
        else{
            
            uid = null;
            alert("You Are Not Logged In. Please Log In")
            window.location.replace("https://project002kp.herokuapp.com/public/index.html");
        }

    });
    //Our Server Functions On
           var connection = new RTCMultiConnection();
         connection.socketURL = 'https://project002kp.herokuapp.com/';

 $('#dashb').click(function(){
   window.location.replace("./User.html");
 })