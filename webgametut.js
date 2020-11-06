// following tutorial from w3schools.com
// jmurphy94, Nov 2020

var gameCanvas = {
    canvas : document.getElementById("gameCanvas"),
    start : function () {
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.keys = [];
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameCanvas, 50);
        window.addEventListener('keydown', function (e) {
            gameCanvas.keys[e.key] = true;
        })
        window.addEventListener('keyup', function (e) {
            gameCanvas.keys[e.key] = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

var gamePiece;

function startGame () {
    gameCanvas.start();
    gamePiece = new component(30, 30, "red", 285, 185);
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function updateGameCanvas() {
    gameCanvas.clear();
    moveStop();
    handleKeyPress();
    gamePiece.newPos();
    gamePiece.update();
}

function handleKeyPress() {
    if (gameCanvas.keys["ArrowUp"]) {moveUp();}
    if (gameCanvas.keys["ArrowDown"]) {moveDown();}
    if (gameCanvas.keys["ArrowLeft"]) {moveLeft();}
    if (gameCanvas.keys["ArrowRight"]) {moveRight();}
} 

function moveUp() {
    gamePiece.speedY -= 1;
}

function moveDown() {
    gamePiece.speedY += 1;
}

function moveLeft() {
    gamePiece.speedX -= 1;
}

function moveRight() {
    gamePiece.speedX += 1;
}

function moveStop() {
    gamePiece.speedX = 0;
    gamePiece.speedY = 0;
}