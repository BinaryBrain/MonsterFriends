$(".menuButtons").on("click", function(event){
	switch(this.id){
		case "buttonFight":
			show(Scene.ENEMYCHOICE);
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
