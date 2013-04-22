$("#previousButton").on('click', function () {
	View.show(Scene.MENU)
})

Network.getMyMonsters(function (myMonsters) {
	console.log("my Monsters: ", myMonsters);
})
