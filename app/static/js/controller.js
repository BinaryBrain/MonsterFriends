/*! 
 *
 * controller.js
 *
 */

// Controls things. Yeah.

// Different scenes
Scene = {MENU : 0, FIGHT : 1, ENEMYCHOICE : 2, HISTORY : 3, TEAM : 4, EVOLUTION : 5, WELCOME : 6}

$(function () {
  Controller.init()
})

/*
 * Controller Object
 *
 * Represents the Controller of the Client-Side app.
 * 
 */
Controller = {
	
  error: function (err) {
    console.log("Error: "+err)
    Dialog.show()
    Dialog.print("Error: "+err)
  },

  init: function () {
    console.log("[INFO] Initialization");
    View.show(Scene.WELCOME);
    
    Facebook.init(function () {
      Network.init(function () {
	View.show(Scene.MENU);
	console.log("[INFO] Initialized");
      })
    })
  },

  sendChosenAttack: function (aid) {
    Network.setChosenAttack(aid, 
      function (data) {
	// TODO : Confirmer la réception de la réponse
	var result = data;
	Controller.changeScene(Scene.FIGHT);
      });
  },

  sendChosenFriend: function (fid) {
    Network.askFight(fid, 
      function (data) {
	// TODO : Confirmer la réception de la réponse
	var result = data;
	Controller.changeScene(Scene.FIGHT);
      });
  },
	
}
