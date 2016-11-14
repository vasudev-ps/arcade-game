// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.rowToYMultiplier = 75;
    this.maxSpeed = 250;
    this.y = this.enemy_position();
    this.speed = Math.floor(Math.random() * this.maxSpeed + 1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        this.x += this.speed * dt;
    // if the x position is large than the canvas width
    // set the x position to 0
    if (this.x > ctx.canvas.width) {
        this.x = 0;
        this.y = this.enemy_position();
    }
    //Checking for collision
        if (this.collidesWith(player)) {
        player.point = player.point - 10; // decrease the point if collided.
        console.log(player.point);
        player.reset();
    }
};

// provide enemy bugs positon.
Enemy.prototype.enemy_position = function() {
    return Math.floor(Math.random() * 3 + 1) * this.rowToYMultiplier;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//check for collision
Enemy.prototype.collidesWith = function(player) {
    var colWidth = 101;
    var rowHeight = 101;

    var col = Math.floor(this.x/colWidth);
    var row = Math.floor(this.y/rowHeight) + 1;

    if (col == player.col && row == player.row) {
        return true;
    }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    //this.sprite = 'images/char-boy.png';
    this.startCol = 2;
    this.startRow = 5;
    this.col = this.startCol;
    this.row = this.startRow;
    this.columnToXMultiplier = 100;
    this.rowToYMultiplier = 80;
    this.point = 0;
    // Convert the columns and rows to xy coordinates
    this.x = this.col * this.columnToXMultiplier;
    this.y = this.row * this.rowToYMultiplier;

};
// Update the player's position
Player.prototype.update = function() {
    this.x = this.col * this.columnToXMultiplier;
    this.y = this.row * this.rowToYMultiplier;
};

//Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.printPoints();
};

//drawing player to starting position if collided or completes the task
Player.prototype.reset = function() {
    this.col = this.startCol;
    this.row = this.startRow;
};

//input handling for player
Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            this.col -= 1;
            if (this.col < 0) {
                this.col = 0;
            }
            break;
        case 'up':
            this.row -= 1;
            if (this.row == 0) {
                this.row = 5;
                this.point = this.point + 10;
                console.log(this.point);//add point
            }
            break;
        case 'right':
            this.col += 1;
            if (this.col > 4) {
                this.col = 4;
            }
            break;
        case 'down':
            this.row += 1;
            if (this.row > 5) {
                this.row = 5;
            }
            break;
    }
};

//funtion for printing point
Player.prototype. printPoints = function(){
            ctx.font = "36px impact";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText(this.point,450,100);
            ctx.strokeStyle = "black";
            ctx.lineWidth= 2;
            ctx.strokeText(this.point,450,100);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var allEnemies = [];
allEnemies.push(enemy1,enemy2,enemy3,enemy4);
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