var width = $('#screen').width();
var height = $('#screen').height();

var iHeight = 100;
var iWidth = 100;
var horSpace = (width - iWidth*5)/6;
var verSpace = (height - iHeight*5)/6;

var trainers = [1553324411,1236701567,1063020932,1168461370,517796283];  // change;


for (var i = 0; i<trainers.length; i++) { // and here too : all the "trainers[i]" in "trainers[i].id".
	$('#peopleGrid').append($('<img>')
		.attr ({
			'data-id' : trainers[i],
			'id' : trainers[i],
			'class' : 'imgEnemies',
			'src' : 'http://graph.facebook.com/' + trainers[i] + '/picture?width='+iWidth+'&height='+iHeight,
			'style' : 'position: absolute; left: ' + Math.floor((horSpace + iWidth)*(i%5) + horSpace) + 'px; top: ' + Math.floor((verSpace + iHeight)*(Math.floor(i/5)) + verSpace) +'px>',
			'title' : trainers[i],
		})
	);
}

$(".imgEnemies").on("click", function(event){
	console.log("id: " + this.id);
	Controller.sendChosenFriend(this.id);
	View.show(Scene.FIGHT);
});

$("#previousButton").on('click', function () {
	View.show(Scene.MENU)
})
