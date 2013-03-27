function changeFrame(data) {
	if($("#screen").html() !== "") {
		$("#screen > *").fadeOut(function () {
		  $("#screen").html(data);
		  $("#screen > *").css({ display: "none" });
		  $("#screen > *").fadeIn();
		});
	}

	else
		$("#screen").html(data);

}

function show(scene) {
	var s = "E:/Github/MonsterFriends-new/app/templates/view/"; // change later
	switch(scene) {
	
		case Scene.MENU:
			s += "menu/menu";
			break;
		
		case Scene.FIGHT:
			s += "fight/fight";
			break;
		
		case Scene.ENEMYCHOICE: 
			s += "enemyChoice/enemyChoice";
			break;
		
		case Scene.HISTORY: 
			s += "history/history";
			break;
			
		case Scene.TEAM:
			s += "monsters/monsters";
			break;
		
		case Scene.EVOLUTION:
			s += "evolution/evolution";
			break;
		
		default:
			throw "Screen not found";
			break;
			
	}
	
	s += ".html";
	console.log(s);
	
	$.get(s, function (data) {
		changeFrame(data);
	})
}