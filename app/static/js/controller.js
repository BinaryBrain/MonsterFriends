/*! 
 *
 * controller.js
 *
 */

// Controls things. Yeah.

$(function () {
	Console.consoleNode = $("#console");
	Controller.init()
})

// Different scenes
Scene = {MENU : 0, FIGHT : 1, ENEMYCHOICE : 2, HISTORY : 3, MONSTERS : 4}

/*
 * Controller Object
 *
 * Represents the Controller of the Client-Side app.
 * 
 */
Controller = {

	// Starting scene
	scene: Scene.MENU,
	
	error: function(err) {
		Console.archieveMessage("Error: "+err);
		console.log("Error: "+err);
		Console.show();
	},

	init: function () {
		C.init();
		Network.init(function () {
			Controller.changeScene(Scene.MENU);
		});
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
	
	changeScene: function(scene) {
		Console.hide();
		C.clear();
		this.scene = scene;
		
		switch(scene)
		{
			case Scene.MENU:
				Network.getCurrentFight(
					function (data) {
						// TODO : Recevoir l'oid
						var result = data;
						
						C.drawMenu(result);
					}
				);
			break;
			
			case Scene.FIGHT:
				// Temporary part
				Console.show()
				Network.getFightInfos(
					
					function(data) {
						// TODO : Recevoir plein de data, les traiter et le repasser pour draw des jolis trucs !
						var result = data;
						C.drawFight(result);
						console.log(data);
						//C.drawAttackDialog();
					}
					
				);
			break;
			
			case Scene.ENEMYCHOICE:
				Facebook.getFriends(
					function (data) {
						var ids=[];
						var names=[];
						
						for(var i=0, len=data.length; i<len; i++) {
							ids[i] = data[i].id;
							names[i] = data[i].name;
						}
						
						// TODO : Give arguments to drawEnemyChoice
						data= [{
							id: 1553324411,
							name: "Basile Vu"
						},
						{
							id: 1063020932,
							name: "Sacha Bron"
						},
						{
							id: 1236701567,
							name: "Kewin Dousse"
						},
						{
							id: 517796283,
							name: "Jocelyn"
						}];
						
						console.log(data)
						
						C.drawEnemyChoice(data);
					}
				);
				//drawEnemyChoice();
			break;
			
			case Scene.HISTORY:
				Network.getMatchHistory(
					function (data) {
						// TODO : Give arguments to drawHistory
						var result = data;
						C.drawHistory(result);
					}
				);
			break;
			
			case Scene.MONSTERS:
				Network.getMyMonsters(
					function (data) {
						// TODO : Give arguments to drawMonsters
						var result  = data;
						console.log(result);
						C.drawMonsters(JSON.parse(result));
					}
				);
				//drawMonsters();
			break;
		}
	}
	
	
	
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
