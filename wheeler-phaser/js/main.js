//This sets the variable for the spacebar.
var spaceKey;

var ground;
var player;
var obstacle;

//This sets the score to start at -1.
var score = -1;


var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var GAME_CONTAINER_ID = 'gameDiv';

//This is the object which runs the game.
function preload(){
	game.load.image ('obstacle', 'assets/wallVertical.png');
	game.load.image ('ground', 'assets/ground.jpg');
	game.load.image ('background', 'assets/SpongeWood.jpg');
	//game.stage.backgroundColor = '#41e5ff'
	game.load.image ('player', 'assets/Sponge.png') 
};

function create(){
  //player.body.immovable = true;
game.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'background');
  game.physics.startSystem(Phaser.Physics.ARCADE);
  //This creates the player character at the bottom left side o fthe screen.
  player = game.add.sprite(game.width/8, game.world.height*(5/9), 'player')
  player.scale.setTo(0.3,0.3);
  game.physics.arcade.enable(player);
  
  //This creates the first obstacle on the right side of the screen.
  obstacle = game.add.sprite(700,game.world.height, 'obstacle');
  obstacle.scale.setTo(1,1);
  obstacle.anchor.setTo(0,1);
  game.physics.arcade.enable(obstacle);
  obstacle.body.immovable = true;
  
  platforms = game.add.group();
  platforms.enableBody = true;
  ground = platforms.create(0, GAME_HEIGHT, 'ground');
  ground.body.immovable = true;

  spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  player.body.bounce.y = 0.2;
  player.body.bounce.y = 600;

  platforms = game.add.group(0, 0,  'ground');
  platforms.enablebody = true;

  ground = platforms.create(0, GAME_HEIGHT, 'ground');
  ground.anchor.setTo(0,1);
  ground.scale.setTo(4,1);
  game.physics.arcade.enable(ground);
  ground.body.immovable = true;

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);

  game.physics.arcade.enable(ground);
  ground.body.immovable = true;

  spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  player.body.bounce.y = 1;
  player.body.gravity.y = 600;
}
  

function update(){
  game.physics.arcade.collide(player, ground);
  game.physics.arcade.collide(player, obstacle);
  if (spaceKey.isDown){
    player.body.velocity.y = -250;
    if (obstacle.x > 600) {
      obstacle.x -= 0.05;
    }
  } 
  if (obstacle.x < 0) {
    obstacle.kill();
    obstacle = game.add.sprite(900, GAME_HEIGHT, 'obstacle');
    obstacle.scale.setTo(1,1);
    obstacle.anchor.setTo(0,1);
    game.physics.arcade.enable(obstacle);
    obstacle.body.immovable = true;
  }  


};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, update: update, create: create });

game.state.start();