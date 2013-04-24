var socket = io.connect();

Network = {
  init: function (cb) {
    console.log("[INFO] Network initialization");
    
    Network.myid = socket.socket.sessionid;
    
    socket.emit('hello', Facebook.userID);
    
    socket.on('welcome', function () {
      socket.on('new_fight', function (oid) {
        Controller.newFight(oid);
      })
      
      console.log("[INFO] Network initialized"); 
      cb()
    })
    
    socket.on('error', function (err) {
      Controller.error(err);
    });
    
    socket.on('disconnect', function () {
      // TODO
    });   
  },
  
  getCurrentFight: function (cb) {
    socket.emit('get_current_fight');
    socket.on('current_fight', function (data) {
      cb(data);
    });
  },
  
  getFightInfos: function (cb) {
    socket.emit('get_fight_info');
    socket.on('fight_info', function (data) {
      cb(data);
    });
  },
  
  getMatchHistory: function (cb) {
    socket.emit('get_history');
    socket.on('history', function (data) {
      cb(data);
    });
  },
  
  getMyMonsters: function (cb) {
    socket.emit('get_monsters');
    socket.on('monsters', function (data) {
      cb(data);
    });
  },
  
  askFight: function (oid, cb) {
    socket.emit('ask_fight', oid);
    socket.on('ok_fight', function () {
      cb();
    });
  },
	
	setChosenAttack: function (aid, cb) {
    socket.emit('attack', aid);
    socket.on('fight_info', function (data) {
      cb(data);
    });
  },
  
  attack: function (aid) {
    socket.emit('attack', aid );
  },
}
