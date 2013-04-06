//
// To get every friends: Facebook.friends
// To get friends who installed the app: Facebook.installedFriends
// Attributes:
//   .id
//   .name
//

Facebook = {
  userID: 0,
  myname: 0,
  friends: [],
  installedFriends: [],
  
  onInit: function () {},
  onReady: function () {
    Facebook.fetchFriends()
  },
  
  init: function (cb) {
    if(cb)
      Facebook.onInit = cb
  },
  
  fetchFriends: function () {
    FB.api('/me/friends?fields=installed,name', function (response) {
      
      var friends = response.data
      var installedFriends = []
      
      Facebook.friends = friends;
      
      for(var i=0, len=friends.length; i<len; i++) {
	if(friends[i].installed) {
	  installedFriends.push(friends[i])
	}
      }
      
      Facebook.installedFriends = installedFriends;
      
      Facebook.onInit()
    })
  },
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
  })
}

function go() {
  FB.api('/me', function(response) {
      console.log(response)
      Facebook.userID = response.id
      Facebook.myname = response.first_name
      
      $("#facebookconnect").html("Hi, "+Facebook.myname)
      
      Facebook.onReady()
      Network.facebookReady(Facebook.userID)
  })
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
	login()
      } else {
	// not_logged_in
	login()
      }
    })
  }
})

