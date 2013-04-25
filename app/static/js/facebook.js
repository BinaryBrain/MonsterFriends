//
// To get every friends: Facebook.friends
// To get friends who installed the app: Facebook.installedFriends
// To get friend's infos by his ID:
// 	try {
// 	  Facebook.getFriendFromID(id)
// 	}
// 	catch (e) {
// 	  // TODO: Handle error when the monster is not a friend of you
// 	}
//
// To get someone's name by ID: getNameFromID(id, callback)
//
// Attributes:
//   .id
//   .name
//

Facebook = {
  userID: 0,
  myname: 0,
  friends: [],
  indexedFriends: [],
  installedFriends: [],
  namesFromID: [],
  
  onInit: function () {},
  onReady: function () {
    Facebook.fetchFriends()
  },
  
  init: function (cb) {
    console.log("[INFO] Facebook initialization");
    if(cb)
      Facebook.onInit = cb
  },
  
  fetchFriends: function () {
    FB.api('/me/friends?fields=installed,name', function (response) {
      
      var friends = response.data
      
      var installedFriends = []
      var indexedFriends = []
      var names = []
      
      Facebook.friends = friends;
      
      for(var i=0, len=friends.length; i<len; i++) {
	if(friends[i].installed) {
	  installedFriends.push(friends[i])
	}
	
	indexedFriends[friends[i].id] = friends[i]
	names[friends[i].id] = friends[i].name
      }
      
      Facebook.installedFriends = installedFriends;
      Facebook.indexedFriends = indexedFriends;
      Facebook.namesFromID = names;
      
      console.log("[INFO] Facebook initialized");
      Facebook.onInit()
    })
  },

  getFriendFromID: function (id) {
    if((friend = Facebook.indexedFriends[id]) !== undefined) {
      return friend
    }
    else {
      throw "ERROR: Not a friend of you! (id: "+id+")"
    }
  },
  
  getNameFromID: function (id, cb) {
    if((name = Facebook.namesFromID[id].name) !== undefined) {
      cb(name); 
    }
    else {
      FB.api('http://graph.facebook.com/'+id+'/?fields=name', function (res) {
	var name = res.name;
	Facebook.namesFromID[id] = name;
	cb(name);
      })
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
      alert("Connection cancelled")
    }
  })
}

function go() {
  FB.api('/me', function(response) {
    Facebook.userID = response.id
    Facebook.myname = response.first_name
    
    $("#facebookconnect").html("Hi, "+Facebook.myname)
    
    Facebook.onReady()
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

