View = {

changeFrame : function(data) {
  if($("#screen").html() !== "") {
    //$("#screen > .scene").fadeOut(function () {
      $("#screen").html(data);
      //$("#screen > .scene").css({ display: "none" });
      //$("#screen > .scene").fadeIn();
    //});
  }
  else
    $("#screen").html(data);

},

show : function(scene) {
  var s = "view/";
  switch(scene) {
    
    case Scene.WELCOME:
      s += "welcome";
      break;
    
    case Scene.MENU:
      s += "menu";
      break;
    
    case Scene.FIGHT:
      s += "fight";
      break;
    
    case Scene.ENEMYCHOICE: 
      s += "enemyChoice";
      break;
    
    case Scene.HISTORY: 
      s += "history";
      break;
      
    case Scene.TEAM:
      s += "team";
      break;
    
    case Scene.EVOLUTION:
      s += "evolution";
      break;
    
    default:
      throw "Screen not found";
      break;
      
  }
  
  s += ".html";
  
  $.get(s, function (data) {
    View.changeFrame(data);
  })
},

}
