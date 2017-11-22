

var canvas = document.getElementById('snake-canvas');
var controller = document.getElementsByClassName('controller')[0];
var topArrow = document.getElementById('top');
var bottom = document.getElementById('bottom');
var left = document.getElementById('left');
var right = document.getElementById('right');
var score = 0;

var canvasSize = window.innerWidth > (window.innerHeight * 0.8) ? (window.innerHeight * 0.8) : window.innerWidth;

canvas.width = canvasSize;
canvas.height = canvasSize;

controller.style.width = canvasSize + "px";
controller.style.height = canvasSize + "px";

var ctx = canvas.getContext('2d');

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var snakeWidth = canvasWidth / 20;
var snakeHeight = canvasHeight / 20;

//default direction
var direction = "right";

function drawSnake(x, y) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect((x * snakeWidth), (y * snakeHeight), snakeWidth, snakeHeight);

    ctx.fillstyle = "#000000";
    ctx.strokeRect((x * snakeWidth), (y * snakeHeight), snakeWidth, snakeHeight);
}

// CREATE SNAKE INITIALLY
var length = 4;
var snake = [];

for (var i = length - 1; i >= 0; i--) {
    snake.push({
        x: i,
        y: 0
    });
}

// CREATE FOOD
var foodLocation = {};
function generateFood() {
    foodLocation.x = snakeWidth * (Math.floor((Math.random() * 19)));
    foodLocation.y = snakeWidth * (Math.floor((Math.random() * 19)));
}
generateFood();
function drawFood(){
    ctx.fillStyle = "#FBBC34";
    ctx.fillRect(foodLocation.x, foodLocation.y, snakeWidth, snakeHeight);
}

// GAME OVER
function gameOver(){
    clearInterval(snakeInterval);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvasWidth, canvasWidth);
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    // centralise game over message
    var textString = "Game Over";
    var textWidth = ctx.measureText(textString).width;
    ctx.fillText(textString, ((canvasWidth / 2) - (textWidth / 2)), (canvasWidth / 2));
    
    var textStringTwo = "Final Score: " + score;
    var textWidthTwo = ctx.measureText(textStringTwo).width;
    ctx.fillText(textStringTwo, ((canvasWidth / 2) - (textWidthTwo / 2)), (canvasWidth / 2) + 30);
}

// CONTROLS
window.addEventListener('keydown', function (e) {
    if (e.keyCode === 38 && direction !== "down") { direction = "up"; }
    else if (e.keyCode === 40 && direction !== "up") { direction = "down"; }
    else if (e.keyCode === 39 && direction !== "left") { direction = "right"; }
    else if (e.keyCode === 37 && direction !== "right") { direction = "left"; }
});

// mobile safari requires click event directly bound
topArrow.addEventListener('click', function(e){
     if (e.target === topArrow && direction !== "down") { direction = "up"; }
});

bottom.addEventListener('click', function(e){
    if (e.target === bottom && direction !== "up") { direction = "down"; }
});

left.addEventListener('click', function(e){
    if (e.target === left && direction !== "right") { direction = "left"; }
});

right.addEventListener('click', function(e){
    if (e.target === right && direction !== "left") { direction = "right"; }
});
//

// MAIN DRAW FUNCTION
function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (var i = 0; i < snake.length; i++) {
        drawSnake(snake[i].x, snake[i].y);
    }

    // snake head
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    snake.pop();
    if (direction === "right") { snakeX++; }
    else if (direction === "left") { snakeX--; }
    else if (direction === "down") { snakeY++; }
    else if (direction === "up") { snakeY--; }

    // create a new head
    var newHead = {
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead);
    drawFood();

    // EAT FOOD
    var hasEaten = false;
    if ((snake[0].x * snakeWidth) === foodLocation.x && (snake[0].y * snakeHeight) === foodLocation.y) {
        snake.unshift(newHead);
        generateFood();
        drawFood();
        hasEaten = true;
        score++;
    } else {
        hasEaten = false;
    }

    // collision with tail detection
    for(var o = 1; o < snake.length; o++){
        if(newHead.x === snake[o].x && newHead.y === snake[o].y && hasEaten === false){
            gameOver();
        }
    }

    // edge of screen detection
    if (snakeX > 20 || snakeY > 20 || snakeX < -1 || snakeY < -1) {
        gameOver();
    }
}

var snakeInterval = setInterval(draw, 300);

// draw();