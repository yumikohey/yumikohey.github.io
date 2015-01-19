var START = 0;
var StartGame = function() {
}

StartGame.prototype.update = function(keys) {
    if(keys == 'space'){
        START = 1;
    }

    if(START === 0)
        this.render();
    return;
}



StartGame.prototype.render = function() {
    ctx.font = "30px Verdana";
    var gradient = ctx.createLinearGradient(0, 0, 606, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fillText("Start Game", 200, 250);
    //Description
    ctx.font = "16px Georgia";
    ctx.fillText("Press Space to Start the game", 200, 350);
}



// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    var enemyXpos = [-100,-75,-45,-20,0];
    var enemyYpos = [55,145,225];
    this.sprite = 'images/enemy-bug.png';
    this.x = enemyXpos[Math.floor(Math.random() * 5)];
    this.y = enemyYpos[Math.floor(Math.random() * 3)];
    this.width = 171;
    this.height = 101;
    var enemySpeed = [100,150,190,220,280];
    this.speed = enemySpeed[Math.floor(Math.random() * 5)];
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    if(this.x > 800){
        this.x = 0;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 200;
    this.y = 390;
    this.width = 171;
    this.height = 101;
    this.perStepX = 100;
    this.perStepY = 85;
}

Player.prototype.update = function() {
    if(this.x <= 0){
        this.x = 0;
    }
    if(this.x >= 405){
        this.x = 405;
    }
    if(this.y <= 50){
        this.y = 50;
    }
    if(this.y >= 390){
        this.y = 390;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (keys) {
    if(keys == 'left'){
        this.x -= this.perStepX;
    }
    if(keys == 'right'){
        this.x += this.perStepX;
    }
    if(keys == 'up'){
        this.y -= this.perStepY;
    }
    if(keys == 'down'){
        this.y += this.perStepY;
    }

}

function Life() {
    this.x = 370;
    this.y = 50;
    this.lifeCount = 3;
    this.loseLife = false;
    this.sprite = 'images/Heart.png';
}

Life.prototype.update = function() {
    if(loseLife){
        this.lifeCount -= 1;
        allLives.pop();
    }
}

Life.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 35, 45);
}

function checkCollisions() {
    loseLife = false;
    for(var i=0; i < allEnemies.length; i++){
        if (collisionDetect(allEnemies[i], player)){
            player.x = 200;
            player.y = 390;
            loseLife = true;
        }
    }
}

function collisionDetect(object1, object2) {

    var left1 = object1.x;
    var left2 = object2.x;
    var right1 = object1.x + object1.width/2;
    var right2 = object2.x + object2.width/2;
    var top1 = object1.y;
    var top2 = object2.y;
    var bottom1 = object1.y + object1.height/2;
    var bottom2 = object2.y + object2.height/2;

    if (bottom1 < top2) return(false);
    if (top1 > bottom2) return(false);

    if (right1 < left2) return(false);
    if (left1 > right2) return(false);

    return(true);
}



// Now instantiate your objects.
var game = new StartGame();
// Place all enemy objects in an array called allEnemies

var enemy_1 = new Enemy();
var enemy_2 = new Enemy();
var enemy_3 = new Enemy();
var enemy_4 = new Enemy();
var enemy_5 = new Enemy();
var enemy_6 = new Enemy();
var allEnemies = [enemy_1, enemy_2, enemy_3, enemy_4, enemy_5,enemy_6];

// Place the player object in a variable called player
var player = new Player();

// Life instance
var loseLife = false;
var life_1 = new Life();
var life_2 = new Life();
life_2.x = 410;
var life_3 = new Life();
life_3.x = 450;
// A bug here!
var life_4 = new Life();
life_4.x = 450;
var allLives = [life_1,life_2,life_3, life_4];

//Start the game


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        36: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    game.update(allowedKeys[e.keyCode]);
    player.handleInput(allowedKeys[e.keyCode]);
});
