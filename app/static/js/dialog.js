Dialog = {
  id: "#dialog",
  
  show: function () {
    $(Dialog.id).slideDown()
  },

  hide: function () {
    $(Dialog.id).slideUp()
  },
  
  // plain text
  print: function (msg) {
    $(Dialog.id).text(msg)
  },
  
  // html
  html: function (html) {
    $(Dialog.id).html(html)
  },
  
  Messages: {
    ability: function (monsterName, abilityName) {
      var html = "<span class='monsterName'>"+monsterName+"</span> used <span class='abilityName'>"+abilityName+"</span> !";
      Dialog.html(html);
    },
    
    damage: function (monsterName, hpLost, percentHpLost) {
      var html = "<span class='monsterName'>"+monsterName+"</span> lost <span class='number'>"+hpLost+"</span> HP (<span class='number'>"+percentHpLost+"</span>%) !";
      Dialog.html(html);
    },
    
    heal: function (monsterName, hpHealed, percentHpHealed) {
      var html = "<span class='monsterName'>"+monsterName+"</span> restored <span class='number'>"+hpHealed+"</span> HP (<span class='number'>"+percentHpHealed+"</span>%) !";
      Dialog.html(html);
    },
    
    effective: function () {
      Dialog.print("It's super effective !");
    },
    
    ineffective: function () {
      Dialog.print("It's not very effective...");
    },
    
    turn: function (turnNumber) {
      var html = "<hr><span class='turnNumber'>Turn " + turnNumber + "</span>";
      Dialog.html(html);
    },
    
    dead: function (monsterName) {
      var html = "<span class='monsterName'>" + monsterNumber + "</span> is K.O.";
      Dialog.html(html);
    },
    
    end: function () {
      var msg = "The fight is over !";
        Dialog.print(msg);
    },
    
    victory: function (userName) {
      var html = "<span class='monsterName'>" + userName + "</span> wins !";
      Dialog.html(html);
    }
  }
}
