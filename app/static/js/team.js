$("#previousButton").on('click', function () {
	View.show(Scene.MENU)	
})

$(function () {
	// FIXME: DEMO: Uncomment when the server is fixed.
	//Network.getMyMonsters(function (myMonsters) {
	//	console.log("my Monsters: ", myMonsters);
		myMonster = [
			{ id: 598584646, maxHp: 200, hp: 130, level: 4 },
			{ id: 1024114809, maxHp: 60, hp: 25, level: 1 },
			{ id: 100001603331978, maxHp: 1000, hp: 1000, level: 93 },
			{ id: 626530322, maxHp: 420, hp: 0, level: 11 },
			{ id: 1236701567, maxHp: 260, hp: 30, level: 6 },
			{ id: 1168461370, maxHp: 510, hp: 510, level: 14 },
		]
		
		var html = ""
		
		for(var i=0, l=myMonster.length; i<l; i++) {
			var percent = Math.round(myMonster[i].hp*100/myMonster[i].maxHp)
			
			var color = 'rgb(148,240,59)' // green
			
			if(percent < 20 ) {
				color = 'rgb(255,72,59)' // red
			}
			else if (percent < 50) {
				color = 'rgb(255,200,59)' // yellow
			}
			
			var name = Facebook.indexedFriends[myMonster[i].id].name
			
			html += '<div class="monster">'
				html += '<img src="http://graph.facebook.com/'+myMonster[i].id+'/picture?width=54&height=54">'
				html += '<div class="data">'
					html += '<h4>'+name+' - lvl '+myMonster[i].level+'</h4>'
					html += '<div class="lifebar">'
						html += '<div class="hp">'+myMonster[i].hp+'/'+myMonster[i].maxHp+'</div>'
						html += '<div class="life" style="width: '+percent+'%; background-color: '+color+';"></div>'
					html += '</div>'
				html += '</div>'
			html += '</div>'
		}
		
		$("#team #monsters").html(html)
		
	//})
})
