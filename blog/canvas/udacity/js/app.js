const PLAYERSTEPX = 100;
const PLAYERSTEPY = 85;
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
        this.x -= PLAYERSTEPX;
    }
    if(keys == 'right'){
        this.x += PLAYERSTEPX;
    }
    if(keys == 'up'){
        this.y -= PLAYERSTEPY;
    }
    if(keys == 'down'){
        this.y += PLAYERSTEPY;
    }

}

function checkCollisions(enemy, player) {

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var enemy_1 = new Enemy();
var enemy_2 = new Enemy();
var enemy_3 = new Enemy();
var enemy_4 = new Enemy();
var enemy_5 = new Enemy();
var enemy_6 = new Enemy();
    allEnemies = [enemy_1, enemy_2, enemy_3, enemy_4, enemy_5,enemy_6];

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
