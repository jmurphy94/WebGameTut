// following tutorial from w3schools.com
// jmurphy94, Nov 2020

var gameCanvas = {
    canvas : document.getElementById("gameCanvas"),
    start : function () {
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

var gamePiece;

function startGame () {
    gameCanvas.start();
    gamePiece = new component(30, 30, "red", 10, 170);
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function updateGameArea() {
    gameCanvas.clear();
    gamePiece.x += 1;
    gamePiece.update();
}