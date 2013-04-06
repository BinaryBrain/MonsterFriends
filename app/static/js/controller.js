/*! 
 *
 * controller.js
 *
 */

// Controls things. Yeah.

// Different scenes
Scene = {MENU : 0, FIGHT : 1, ENEMYCHOICE : 2, HISTORY : 3, TEAM : 4, EVOLUTION : 5}

$(function () {
	Console.consoleNode = $("#console");
	Controller.init()
})

/*
 * Controller Object
 *
 * Represents the Controller of the Client-Side app.
 * 
 */
Controller = {
	
	error: function(err) {
		Console.archieveMessage("Error: "+err);
		console.log("Error: "+err);
		Console.show();
	},

	init: function () {
		console.log("Controller init");
		
		Facebook.init(function () {
			View.show(Scene.MENU);
			console.log("Controller init : show(Scene.MENU).");
		})
		
		/*Network.init(function () {
			show(Scene.MENU);
			console.log("Controller init : show(Scene.MENU).");
		});*/
	},
	
	sendChosenAttack: function(aid) {
		Network.setChosenAttack(aid, 
			function (data) {
				// TODO : Confirmer la réception de la réponse
				var result = data;
				Controller.changeScene(Scene.FIGHT);
			});
	},
	
	sendChosenFriend: function(fid) {
		Network.askFight(fid, 
			function (data) {
				// TODO : Confirmer la réception de la réponse
				var result = data;
				Controller.changeScene(Scene.FIGHT);
			});
	},
	
}


/*
 * Console Object
 *
 * Represents the Console during a fight. Used to show messages
 * 
 */
Console = {
	/*
	archieveHistory: function (data) {
		for (var i = 0; i < data.length; i++) {
			
		}
	},
	*/

	hide: function () {
		this.consoleNode.hide();
	},

	show: function () {
		this.consoleNode.show();
	},

	archieveMessage: function (msg) {
		var html = msg + "<br>";
		this.consoleNode.html(this.consoleNode.html() + html);
		this.consoleNode.scrollTop(this.consoleNode[0].scrollHeight);
	},
	
	ability: function (monsterName, abilityName) {
		var msg = "<span class='monsterName'>"+monsterName+"</span> used <span class='abilityName'>"+abilityName+"</span> !";
		Console.archieveMessage(msg);
	},
	
	damage: function (monsterName, hpLost, percentHpLost) {
		var msg = "<span class='monsterName'>"+monsterName+"</span> lost <span class='number'>"+hpLost+"</span> ("+percentHpLost+"%) HP !";
		Console.archieveMessage(msg);
	},
	
	heal: function (monsterName, hpHealed, percentHpHealed) {
		var msg = "<span class='monsterName'>"+monsterName+"</span> restored <span class='number'>"+hpHealed+"</span> ("+percentHpHealed+"%) HP !";
		Console.archieveMessage(msg);
	},
	
	effective: function () {
		Console.archieveMessage("It's super effective !");
	},
	
	ineffective: function () {
		Console.archieveMessage("It's not very effective...");
	},
	
	turn: function (turnNumber) {
		var msg= "<hr><span class='turnNumber'>Turn " + turnNumber + "</span>";
		Console.archieveMessage(msg);
	},

	dead: function (monsterName) {
		var msg= "<span class='monsterName'>" + monsterNumber + "</span> is K.O.";
		Console.archieveMessage(msg);
	},
	
	end: function () {
		var msg= "The fight is over !";
		Console.archieveMessage(msg);
	},
	
	victory: function (userName) {
		var msg= "<span class='monsterName'>" + userName + "</span> wins !";
		Console.archieveMessage(msg);
	}
}
