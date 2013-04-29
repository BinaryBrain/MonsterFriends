$(function () {
  // TODO: Load from server
  var trainers = [
    { fb_id: 1063020932, name: "Sacha Bron" },
    { fb_id: 1236701567, name: "Kewin Dousse" }
  ] 
  var monsters = [
    { fb_id: 1063020932, pv_max: 200, pv: 130, level: 4},
    { fb_id: 1236701567, pv_max: 60, pv: 25, level: 1}
  ]

  getVsHtml(trainers, function (html) {
    $('#vs').html(html)
  })
  getBattleHtml(monsters, function (html) {
    $('#battle').html(html)
  })
  
  Dialog.show()
})	

function getVsHtml(trainers, cb) {
  var html = ""
  getTrainersHtml(trainers,0, function (html0) {
    html += html0
    html += "<h2>VS</h2>"
    getTrainersHtml(trainers, 1, function (html1) {
	html+= html1
	cb(html)
    })
  })
}

function getTrainersHtml(trainers, i, cb) {
  Facebook.getNameFromID(trainers[i].fb_id, function (name) {
    var html = ""
    html += "<div id='trainer"+i+"' class='trainer'>"
      html += '<img src="http://graph.facebook.com/'+trainers[i].fb_id+'/picture?width=40&height=40">'
      html += "<p>"+name+"</p>"
    html += "</div>"
    cb(html)
  })
}

function getBattleHtml(monsters, cb) {
  var html = ""
  getStatusHtml(monsters[0], function (html0) {
    html+="<div id='monsterContainer"+0+"' class='monsterContainer'>"
      html+="<div class='monster'>"
	html+= '<img src="http://graph.facebook.com/'+monsters[0].fb_id+'/picture?width=129&height=129">'
      html+="</div>"
      html += html0
    html+="</div>"
    
    getStatusHtml(monsters[1], function (html1) {
      html+="<div id='monsterContainer"+1+"' class='monsterContainer'>"
	html+="<div class='monster'>"
	  html+= '<img src="http://graph.facebook.com/'+monsters[1].fb_id+'/picture?width=129&height=129">'
	html+="</div>"
	html += html1
      html+="</div>"
      cb(html)
    })
  })
}
	
function getStatusHtml(monster, cb) {
  Facebook.getNameFromID(monster.fb_id, function (name) {
    var html = ""
    html+= "<div class='dataContainer'>"
      html += "<div class='data'>"
	html += "<h4>"+name+" - lvl "+monster.level+"</h4>"
	html += getLifeBarHtml(monster)
      html += "</div>"
    html += "</div>"
    cb(html)
  })
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
