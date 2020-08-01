    class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playercountref=await database.ref('playerCount').once("value");
      if(playercountref.exists()){
        playerCount=playercountref.val();
        player.getCount();
      }
      
      form = new Form();
      form.display();
    }
  }
  play(){
    form.hide();
    textSize(30);
    text("The War Begins",70,100)
    Player.getplayerinfo();
    if(allPlayers!== undefined){
      var display_position=120;
      for(var plr in allPlayers){
        if(plr=== "player"+player.index){
          fill("blue");
        }
        else{
          fill("red");
        }
  display_position=display_position+20;
  textSize(15);
  text(allPlayers[plr].name+":"+allPlayers[plr].distance,120,display_position);
     }
    }
    if(keyDown(UP_ARROW) && player.index!==null){
       player.distance=player.distance+40;
       player.update();
    }
  }
}
