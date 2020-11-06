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
    this.velX = 0;
    this.velY = 0;
    this.accel = 1;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        if ((this.x + this.velX + 30) < gameCanvas.canvas.width && this.x + this.velX > 0) {
            this.x += this.velX;
        }
        if ((this.y + this.velY + 30) < gameCanvas.canvas.height && this.y + this.velY > 0) {
            this.y += this.velY;
        }
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
    if (gameCanvas.keys["ArrowUp"]) {
        if (gamePiece.velY > -7) {
            gamePiece.velY -= gamePiece.accel;
        }
    }
    if (gameCanvas.keys["ArrowDown"]) {
        if (gamePiece.velY < 7) {
            gamePiece.velY += gamePiece.accel;
        }
    }
    if (gameCanvas.keys["ArrowLeft"]) {
        if (gamePiece.velX > -7) {
            gamePiece.velX -= gamePiece.accel;
        }
    }
    if (gameCanvas.keys["ArrowRight"]) {
        if (gamePiece.velX < 7) {
            gamePiece.velX += gamePiece.accel;
        }
    }
} 

function moveStop() {
    if (gamePiece.velY < 0 && !gameCanvas.keys["ArrowUp"]) {
        gamePiece.velY += 1;
    } else if (gamePiece.velY > 0 && !gameCanvas.keys["ArrowDown"]) {
        gamePiece.velY -= 1;
    }

    if (gamePiece.velX < 0 && !gameCanvas.keys["ArrowLeft"]) {
        gamePiece.velX += 1;
    } else if (gamePiece.velX > 0 && !gameCanvas.keys["ArrowRight"]) {
        gamePiece.velX -= 1;
    }
}