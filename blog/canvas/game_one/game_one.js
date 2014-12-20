gameStateTitle()
-- Display the title screen text and waits for the space bar to be pressed before the game starts.

gameStateNewGame()
-- Sets up all the defaults for a new game. All of the arrays for holding display objects are reinitialized -- the game level is reset to 0, and the game score is set to 0.

gameStateNewLevel()
-- Increases the level value by one and then sets the "game knob" values to control the level difficulty. See the upcoming section "Level Knobs" on page 479 for details.

gameStatePlayerStart()
-- Fades the player graphic onto the screen from 0 alpha to 1. When this is complete, level play will start.

gameStatePlayLevel()
-- Controls the play of the game level. It calls the update() and render() functions, as well as the functions for evaluating keyboard input for player ship control.

gameStatePlayerDie()
-- Starts up an explosion at the location where the player ship was when it was hit by a rock, saucer, or saucer missile. When the explosion is complete (all particles in the explosion have exhausted their individual life values), it sets the move to the GAME_STATE_PLAYER_START date.

gameStateGameOver()
-- Display the "Game Over" screen and starts a new game when the space bar is pressed.

Game application functions

Aside from the game application state functions, there are a number of functions we need for the game to run. Each state function will call these functions needed:

resetPlayer()
-- Resets the player to the center of the game screen and readies it for game play.

checkForExtraShip()
-- Checks to see whether the player should be awarded an extra ship. See the section "Awarding the Player Extra Ships" on page 481 for details about this algorithm.

checkForEndOfLevel()
-- Checks to see whether all the rocks have been destroyed on a given level and if so, starts up a new level. See the section "Level and Game End" on page 480 for details about this algorithm.

fillBackground()
-- Fills the canvas with the background color on each frame tick.

setTextStyle()
-- Sets the base text style before text is written to the game screen.

renderScoreBoard()
-- In called on each frame tick. It displays the updated score, number of ships remaining, and the current FPS for the game.

checkKeys()
-- Checks the keyPressList array and then modifies the player ship attributes based on the values found to be true.

update()
-- Is called from GAME_STATE_PLAY_LEVEL. It in turn calls the update() function for each individual display object array.
  -- updatePlayer()
  -- updatePlayerMissiles()
  -- updateRocks()
  -- updateSaucers()
  -- updateSaucerMissiles()
  -- updateParticles()

render()
-- Is called from GAME_STATE_PLAY_LEVEL. It in turn calls the render() function for each individual display object array.
  -- renderPlayer()
  -- renderPlayerMissiles()
  -- renderRocks()
  -- renderSaucers()
  -- renderSaucerMissiles()
  -- renderParticles()

checkCollisions()
-- Loops through the individual game display objects and checks them for collisions. See the section "Apply collision detection" on page 481 for a detailed discussion of this topic.

firePlayerMissile()
-- Creates a playerMissile object at the center of the player ship and fires it in the direction the player ship is facing.

fireSaucerMissile()
-- Creates a saucerMissile object at the center of the saucer and fires it in the direction of the player ship.

playerDie()
-- Creates an explosion for the player by calling createExplode(), as well as changing the game application state to GAME_STATE_PLAYER_DIE.

createExplode()
-- Accepts in the location for the explosion to start and the number of particles for the explosion.

boudingBoxCollide()
-- Determines whether the rectangular box that encompasses an object width and height is overlapping the bounding box of another object. It takes in two logical display objects as parameters and returns true if they are overlapping and false if they are not.

splitRock()
-- Accepts in the scale and x and y starting points for two new rocks that will be created if a large or medium rock is destroyed.

addToScore()
-- Accepts in a value to add to the player's score.


Variables that control screen flow
These variables will be used when the title and "Game Over" screens first appear. They will be set to true after the screen is drawn. When these variables are true, the screens will look for the space bar to be pressed before moving on to the next application state.
          var titleStarted = false;
          var gameOverStarted = false;

Gaming environment variables
These variables set up the necessary defaults for a new game. We will discuss the extraShipAtEacn and extraShipsEarned in the section "Awarding the Player Extra Ships" on page 481:

          var score = 0;
          var level = 0;
          var extraShipAtEach = 10000;
          var extraShipsEarned = 0;
          var playerShips = 3;

Playfield variables
These variables set up the max and min x and y coordinates for the game stage.

          var xMin = 0;
          var xMax = 400;
          var yMin = 0;
          var yMax = 400;

Score value variables
These variables set the score value for each of the objects the player can destroy:

          var bigRockScore = 50;
          var medRockScore = 75;
          var smlRockScore = 100;
          var saucerScore = 300;

Rock Size Constants
These variables set up some human-readable values for the three rock sizes, allowing us to simply use the constant instead of a literal value. We can then change the literal value if needed:

          const ROCK_SCALE_LARGE = 1;
          const ROCK_SCALE_MEDIUM = 2;
          const ROCK_SCALE_SMALL = 3;

Logical display objects
These variables set up the single player object and arrays to hold the various other logical display objects for our game.

          var player = {};
          var rocks = [];
          var saucers = [];
          var playerMissiles = [];
          var particles = [];
          var saucerMissiles = [];

Level-specific variables
The level-specific variables handle the difficulty settings when the game level increases.

          var levelRockMaxSpeedAdjust = 1;
          var levelSaucerMax =1;
          var levelSauceOccurenceRate = 25;
          var levelSaucerSpeed = 1;
          var levelSaucerFireDelay = 300;
          var levelSaucerFireRate = 30;
          var levelSaucerMissileSpeed = 1;

The Player object
The player object contains many of the variables we encountered earlier, animating, rotating, moving the player ship about the game screen.

          player.maxVelocity = 5;
          player.width = 20;
          player.height = 20;
          player.halfWidth = 10;
          player.halfHeight = 10;
          player.rotationalVelocity = 5;
          player.trustAcceleration = 0.05;
          player.missileFrameDelay = 5;
          player.thrust = false;

Array of Logical Display Objects

rocks
The rocks will be simple squares that rotate clockwise / counterclockwise. The rock instances will be in the rocks array. When a new level starts, these will all be created in the upper-right corner of the game screen.

          newRock.scale = 1;
          newRock.width = 50;
          newRock.height = 50;
          newRock.halfHeight = 25;
          newRock.halfWidth = 25;
          newRock.x;
          newRock.y;
          newRock.dx;
          newRock.dy;
          newRock.scoreValue = bigRockScore;
          newRock.rotation = 0;

Saucers

          newSaucer.fireRate = levelSaucerFireRate;
          newSaucer.fireDelay = levelSaucerFireDelay;
          newSaucer.fireDelayCount = 0;
          newSaucer.missileSpeed = levelSaucerMissileSpeed;

missile

          newPlayerMissle.dx = 5 * Math.cos(Math.PI*(player.rotation)/180);
          newPlayerMissle.dy = 5 * Math.sin(Math.PI*(player.rotation)/180);
          newPlayerMissle.x = player.x + player.halfWidth;
          newPlayerMissle.y = player.y + player.halfHeight;
          newPlayerMissle.life = 60;
          newPlayerMissle.lifeCtr = 0;
          newPlayerMissle.width = 2;
          newPlayerMissle.height = 2;

Explosions and particles
When a rock, saucer, or the playership is destroyed, that object explodes into a series of particles. The createExplode() function creates this so-called particle explosion. Particles are simply individual logical display objects with their own life, dx, and dy values. Randomly generating these values makes each explosion appear to be unique. Particles will be stored in the particles array.

          newParticle.dx = Math.random() * 3;
          newParticle.dy = Math.random() * 3;
          newParticle.life = Math.floor(Math.random() * 30 + 30);
          newParticle.lifeCtr = 0;
          newParticle.x = x;
          newParticle.y = y;

//*** Rock Object Prototype

function Rock (scale, type) {
    // scale
    // 1 = large
    // 2 = medium
    // 3 = small
    // these will be used as the divisor for the new sizes
    // 50/1 = 50
    // 50/2 = 25
    // 50/3 = 16

    this.scale = scale;
    if(this.scale < 1 || this.scale > 3) {
        this.scale = 1;
    }

    this.type = type;
    this.dx = 0;
    this.dy = 0;
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.rotationInc = 0;
    this.scoreValue = 0;

    //ConsoleLog.log("create rock. Scale =" + this.scale);

    switch(this.scale) {

        case 1:
          this.width = 50;
          this.height = 50;
          break;
        case 2:
          this.width = 25;
          this.height = 25;
          break;
        case 3:
          this.width = 16;
          this.height = 16;
          break;
    }
}

Rock.prototype.update = function(xmin, xmax, ymin, ymax) {
  this.x += this.dx;
  this.y += this.dy;
  this.rotation += this.rotationInc;
  if(this.x > xmax) {
      this.x = xmin - this.width;
  }else if (this.x < xmin-this.width) {
      this.x = xmax;
  }

  if(this.y > ymax){
    this.y = ymin - this.width;
  } else if (this.y < ymin - this.width) {
      this.y = ymax;
  }
}

Rock.prototype.draw = function(context) {
    var angleInRadians = this.rotation * Math.PI / 180;
    //used to find center of object
    var halfWidth = Math.floor(this.width * 0.5);
    var halfHeight = Math.floor(this.height * 0.5);
    context.save();
    context.setTransform(1,0,0,1,0,0);
    // translate the canvas origin to the center of the player
    context.translate(this.x + halfWidth, this.y + halfHeight);
    context.rotate(angleInRadians);
    context.strokeStyle = '#ffffff';

    context.beginPath();
}

function canvasApp() {
  if(!canvasSupport()) {
    return;
  }else {
    var theCanvas = document.getElementById('canvas');
    var ctx = theCanvas.getContext('2d');
  }

  // set up tile map

  var mapRows = 5;
  var mapCols = 5;
  var tileMap = [
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ];

  //set up a* graph
  var graph = new Graph(tileMap);
  // use values of map turned on side
  var startNode = {x:0, y:1};
  var endNode = {x:2, y:1};

  //create node list
  var start = graph.nodes[startNode.x][startNode.y];
  var end = graph.nodes[endNode.x][endNode.y];
  var result = astar.search(graph.nodes, start, end, false);

  //load in tile sheet image
  var tileSheet = new Image();
  tileSheet.addEventListener('load', eventSheetLoaded, false);
  tileSheet.src = 'tiles.png';

  function eventSheetLoaded() {
    drawScreen();
  }

  function drawScreen() {
    for(var rowCtr = 0; rowCtr < mapRows; rowCtr++) {
      for(var colCtr=0; colCtr < mapCols; colCtr++) {
        var tileId = tileMap[rowCtr][colCtr];
        var sourceX = Math.floor(titeId % 5) * 32;
        var sourceY = Math.floor(tileId / 5) * 32;
        context.drawImage(tileSheet, sourceX, sourceY, 32, 32, colCtr*32, rowCtr*32, 32, 32);
      }
    }

    //draw green circle at start node
    context.beginPath();
    context.strokeStyle = "green";
    context.lineWidth = 5;
    context.arc((startNode.y*32)+16, (startNode.x * 32)+ 16, 10, 0, (Math.PI/180) * 360, false);
    context.stroke();
    context.closePath();

    //draw red circle at end node

  }
}
