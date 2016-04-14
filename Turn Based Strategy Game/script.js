var canvas;
var context;

canvas = document.getElementById("canvas");
    
context = canvas.getContext("2d");


//settings class
var settings = {
    rows: 10,
    collumns: 10,
    width: 30,
    height: 30,
    fps: 30
};

var box;

function init()
{
    
    box = new Image();
    box.src = "../images/book.png"
    
    drawCanvas();
}

function drawCanvas()
{
    context.clearRect(0,0,400,400);
    
    context.save();
    
    for(var i = 0; i < settings.rows; i++)
    {
        for(var j = 0; j < settings.collumns; j++)
        {
            var x = j*settings.width;
            var y = i*settings.height;
            
            //draw the grid
            context.fillRect(x,y,25,25);
        }
    }
    
    context.restore();
}

init();
/*
function drawCheckeredBackground(can, nRow, nCol) {
    var ctx = can.getContext("2d");
    var w = can.width;
    var h = can.height;

    nRow = nRow || 10;    // default number of rows
    nCol = nCol || 10;    // default number of columns

    w /= nCol;            // width of a block
    h /= nRow;            // height of a block

    for (var i = 0; i < nRow; ++i) 
    {
        for (var j = 0, col = nCol / 2; j < col; ++j) 
        {
            //logic to draw the tiles
            //shifting the x co-ordinate of each block every other row
            ctx.rect(2 * j * w + (i % 2 ? 0 : w), i * h, w, h);
        }
    }

    ctx.fill();
}

var canvas = document.getElementById("canvas");

drawCheckeredBackground(canvas);

canvas.font = ("30px Arial");

//global variables
var HEIGHT = 500;
var WEIGHT = 500;
var message = 'Bouncing';
var timeWhenGameStarted = Date.now();

//Turn based game - get static positions
//var positions x and y
var xPos = [99,194,107,402,304,382];

var yPos = [109,260,403,87,256,396];

var frameCount = 0;
var score = 0;

var player;

var image = {};

image.player = new Image();
image.player.src = "../images/player.png";


image.map = new Image();
image.map.src = "../images/gameMap.png";

image.enemy = new Image();
image.enemy.src = "../images/enemy.png";

//enemy constructor
Entity = function (type,id,x,y,width,height,image)
{

	var self = {
		type:type,
		x:x,
		y:y,
		width:width,
		height:height,
		image:image,
	}

	self.update = function()
	{
        self.drawEntity();
	}

	self.updateEntityPosition = function()
	{

	}

	self.drawEntity = function()
	{
		canvas.save();
		//update the image
		canvas.drawImage(self.image,0,0,self.image.width,self.image.height,x,y,self.width,self.height);
		
		canvas.fillStyle = self.image;
	}

	//call the functions to update the self
	self.update();

	return self;
	
}

Actor = function(type,id,x,y,width,height,image,hp)
{
	var self = Entity(type,id,x,y,width,height,image);

	//save content of update before calling it
	var super_update = self.update;

	self.update = function()
	{
		super_update();
	}

	self.performAttack = function()
	{

	}

	self.performSpecialAttack = function()
	{


	}

	self.hp = hp;

	return self;
}

Player = function()
{
    var pos = Math.floor(Math.random() * 5) + 0 ;
    
    
	var self = Actor("player","myID",xPos[pos],yPos[pos],50,50,image.player,10);

	self.updateEntityPosition = function()
	{
        
	}

	return self;
}


//mouse click
document.onclick = function(mouse)
{
	console.log("Got here x: " + mouse.x);
    console.log("Got here y: " + mouse.y);
}

counter = 0;

//update the canvas
update = function ()
{
	canvas.clearRect(0,0,WEIGHT,HEIGHT);


	player.update();

	canvas.fillStyle = "red";
	canvas.fillText(player.hp + " Hp",0,30);
	canvas.fillText("Score: " + score,WEIGHT-185,30);
}

//reset the game
startNewGame = function()
{
	player.hp = 10;
	timeWhenGameStarted = Date.now();
	frameCount = 0;
	
	score = 0;
    
}

player = Player();

//set the update speed
setInterval(update,50);
*/