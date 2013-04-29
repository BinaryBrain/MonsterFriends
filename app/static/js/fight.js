$(function () {
  // TODO: Load from server
  var trainers = [
    { fb_id: 1063020932, name: "Sacha Bron" },
    { fb_id: 1236701567, name: "Kewin Dousse" }
  ] 
  var monsters = [
    { fb_id: 1063020932, pv_max: 200, pv: 130, level: 4, name: "Sacha Bron"},
    { fb_id: 1236701567, pv_max: 60, pv: 25, level: 1, name: "Kewin Dousse"}
  ]

  $('#vs').html(getVsHtml(trainers))
  $('#battle').html(getBattleHtml(monsters))
  
  Dialog.show()
})	
	
function getVsHtml(trainers) {
  var html = ""
    html += getTrainersHtml(trainers,0)
    html += "<h2>VS</h2>"
    html += getTrainersHtml(trainers,1)

  return html;
}

function getTrainersHtml(trainers,i){
  var html = ""
  html += "<div id='trainer"+i+"' class='trainer'>"
    html += '<img src="http://graph.facebook.com/'+trainers[i].fb_id+'/picture?width=40&height=40">'
    html += "<p>"+trainers[i].name+"</p>"
  html += "</div>"
  
  return html
}

function getBattleHtml(monsters) {
  var html = ""
  for(var i = 0; i<monsters.length; i++) {
    html+="<div id='monsterContainer"+i+"' class='monsterContainer'>"
      html+="<div class='monster'>"
	html+= '<img src="http://graph.facebook.com/'+monsters[i].fb_id+'/picture?width=129&height=129">'
      html+="</div>"
      html+= getStatusHtml(monsters[i])
    html+="</div>"
  }
  return html
}
	
function getStatusHtml(monster) {
  var html = ""
  var name = monster.name //Facebook.getFriendFromID(monster.fb_id).name 
  html+= "<div class='dataContainer'>"
    html += "<div class='data'>"
      html += "<h4>"+name+" - lvl "+monster.level+"</h4>"
      html += getLifeBarHtml(monster)
    html += "</div>"
  html += "</div>"

  return html
}

function getLifeBarHtml(monster) {
  var html = ""
  var percent = Math.round(monster.pv*100/monster.pv_max)	
  var color = 'rgb(148,240,59)' // green

  if(percent < 20 ) {
	  color = 'rgb(255,72,59)' // red
  }
  else if (percent < 50) {
	  color = 'rgb(255,200,59)' // yellow
  }

  html += '<div class="lifebar">'
    html += '<div class="hp">'+monster.pv+'/'+monster.pv_max+'</div>'
    html += '<div class="life" style="width: '+percent+'%; background-color: '+color+';"></div>'
  html += '</div>'

  return html
}
