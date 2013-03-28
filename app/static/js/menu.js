$(".menuButtons").on("click", function(event){
	switch(this.id){
		case "buttonFight":
			View.show(Scene.ENEMYCHOICE);
			break;
			
		case "buttonTeam":
			View.show(Scene.TEAM);
			break;
		
		case "buttonHistory":
			View.show(Scene.HISTORY);
			break;
		default:
			break;
	}
});
