Facebook = {
  userID: 0,
  myname: 0,
  val: [],
  friendsP: [],
  
  getFriends: function(cb) {
    FB.api('/me/friends?fields=installed', function(response) {
      for(var i = 0; i < response.data.length; i++) {
	if(response.data[i].installed !== undefined) {
	  Facebook.val.push(response.data[i].id);
	}
      }
      renderMFS();
    });
    
    function renderMFS() {
      // First get the list of friends for this user with the Graph API
      FB.api('/me/friends', function(response) {
	var container = document.getElementById('mfs');
	var mfsForm = document.createElement('form');
	mfsForm.id = 'mfsForm';

	// Iterate through the array of friends object and create a checkbox for each one.
	for(var i = 0; i < response.data.length; i++) {
	 for(var j = 0; j < Facebook.val.length; j++){
	    if(response.data[i].id == Facebook.val[j]){
	      Facebook.friendsP.push({id : response.data[i].id, name: response.data[i].name});
	      cb(Facebook.friendsP);
	    }
	  }
	}
      });
    }
  }
}

function login() {
  FB.login(function(response) {
      if (response.authResponse) {
	  // connected
	  go()
      } else {
	  // cancelled
	  console.log("Connection cancelled")
	  //C.drawConnectionRequired()
      }
  });
}

function go() {
  FB.api('/me', function(response) {
      console.log(response)
      Facebook.userID = response.id
      Facebook.myname = response.first_name
      
      $("#facebookconnect").html("Hi, "+Facebook.myname)
      
      Network.facebookReady(Facebook.userID)
  });
}

$(function () {
  // Load the FB SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
  } (document));
  
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '286327544834291', // App ID
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });
    
    FB.getLoginStatus(function(response) {
      console.log(response.status)
      if (response.status === 'connected') {
	// connected
	go()
      } else if (response.status === 'not_authorized') {
	// not_authorized
	//C.drawConnectionRequired()
	login()
      } else {
	// not_logged_in
	//C.drawConnectionRequired()
	login()
      }
    });
  };
})

