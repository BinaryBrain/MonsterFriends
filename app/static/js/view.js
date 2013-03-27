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
	var s = "view/";
	switch(scene) {
	
		case Scene.MENU:
			s += "menu";
			break;
		
		case Scene.FIGHT:
			s += "fight";
			break;
		
		case Scene.ENEMYCHOICE: 
			s += "enemyChoice";
			break;
		
		case Scene.HISTORY: 
			s += "history";
			break;
			
		case Scene.TEAM:
			s += "team";
			break;
		
		case Scene.EVOLUTION:
			s += "evolution";
			break;
		
		default:
			throw "Screen not found";
			break;
			
	}
	
	s += ".html";
	console.log("showing : " + s);
	
	$.get(s, function (data) {
		changeFrame(data);
	})
}
