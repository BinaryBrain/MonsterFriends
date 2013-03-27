$(".menuButtons").on("click", function(event){
	switch(this.id){
		case "buttonFight":
			show(Scene.FIGHT);
			break;
			
		case "buttonTeam":
			show(Scene.TEAM);
			break;
		
		case "buttonHistory":
			show(Scene.HISTORY);
			break;
		default:
			break;
	}
});