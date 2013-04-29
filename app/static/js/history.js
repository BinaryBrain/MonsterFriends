$("#previousButton").on('click', function () {
	View.show(Scene.MENU)
})

$(function () {
	Network.getMatchHistory(function(matchHistory) {
		matchHistory = jQuery.parseJSON(matchHistory)
		
		var html = ""
		
		console.log(matchHistory)
		
		$("#history #fights").html(html)
	})
})
