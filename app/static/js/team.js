$("#previousButton").on('click', function () {
	View.show(Scene.MENU)
})

myMonsters = Network.getMyMonsters()

console.log(myMonsters)
