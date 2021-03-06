var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Canvas variables
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

// Ball variable
var ballRadius = 10;

// Paddle variables
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;

// Moving paddle variables
var rightPressed = false;
var leftPressed = false;

// Brick field variables
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// Bricks array
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

// Ball function
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Paddle function
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Bricks function
function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
      var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;
      ctx.beginPath();
      ctx.rect(brickX, brickY, brickWidth, brickHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath():
    }
  }
}

// Game mechanics function
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }
  else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval) // needed for Chrome to end game
    }
  }
  
  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  
  x += dx;
  y += dy;
}

var interval = setInterval(draw, 10);
