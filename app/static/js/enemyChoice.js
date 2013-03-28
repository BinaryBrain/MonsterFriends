var width = $('#screen').width();
var height = $('#screen').height();

var iheight = 50;
var iwidth = 50;
var horSpace = (width - iwidth*5)/6;
var verSpace = (height - iheight*5)/6;

var trainers = [1553324411,1236701567,1063020932,1024114809];  // change;


for (var i = 0; i<trainers.length; i++) { // and here too : all the "trainers[i]" in "trainers[i].id".
	var s = '<img data-id="'+ trainers[i] +'" id ="'+trainers[i]+'" class="imgEnemies" src = "http://graph.facebook.com/' + trainers[i] + '/picture" style="position: absolute; left: ' + Math.floor((horSpace + iwidth)*(i%5) + horSpace) + 'px"; top: "' + Math.floor((verSpace + iheight)*(Math.floor(i/5)) + verSpace) +'px">'
	$('#peopleGrid').append(s);
}

$(".imgEnemies").on("click", function(event){
	console.log("id: " + this.id);
	// Controller.sendChosenFriend(this.id);
});
