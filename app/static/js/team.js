$("#previousButton").on('click', function () {
	View.show(Scene.MENU)	
})

$(function () {
	// FIXME: DEMO: Uncomment when the server is fixed.
	Network.getMyMonsters(function (myMonsters) {
		myMonsters = jQuery.parseJSON(myMonsters)
		
		// Example
		/* myMonsters = [
			{ fb_id: 598584646, pv_max: 200, pv: 130, level: 4 },
			{ fb_id: 1024114809, pv_max: 60, pv: 25, level: 1 },
			{ fb_id: 100001603331978, pv_max: 1000, pv: 1000, level: 93 },
			{ fb_id: 626530322, pv_max: 420, pv: 0, level: 11 },
			{ fb_id: 1236701567, pv_max: 260, pv: 30, level: 6 },
			{ fb_id: 1168461370, pv_max: 510, pv: 510, level: 14 },
		] */
		
		var html = ""
		
		for(var i=0, l=myMonsters.length; i<l; i++) {
			try {
				var percent = Math.round(myMonsters[i].pv*100/myMonsters[i].pv_max)
				
				var color = 'rgb(148,240,59)' // green
				
				if(percent < 20 ) {
					color = 'rgb(255,72,59)' // red
				}
				else if (percent < 50) {
					color = 'rgb(255,200,59)' // yellow
				}
				
				var name = Facebook.getFriendFromID(myMonsters[i].fb_id).name
			
				html += '<div class="monster">'
					html += '<img src="http://graph.facebook.com/'+myMonsters[i].fb_id+'/picture?width=54&height=54">'
					html += '<div class="data">'
						html += '<h4>'+name+' - lvl '+myMonsters[i].level+'</h4>'
						html += '<div class="lifebar">'
							html += '<div class="hp">'+myMonsters[i].pv+'/'+myMonsters[i].pv_max+'</div>'
							html += '<div class="life" style="width: '+percent+'%; background-color: '+color+';"></div>'
						html += '</div>'
					html += '</div>'
				html += '</div>'
			}
			catch(e) {
				console.log(e)
				// TODO: Handle error when the monster is not a friend of you
			}
		}
		
		$("#team #monsters").html(html)
		
	})
})
