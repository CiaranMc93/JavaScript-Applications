var canvas = document.getElementById("canvas").getContext("2d");

canvas.font = ("30px Arial");

//global variables
var HEIGHT = 500;
var WEIGHT = 500;
var message = 'Bouncing';
var timeWhenGameStarted = Date.now();

var player = {
	x:150,
	spdX:30,
	y:340,
	spdY:5,
	name:'P',
	hp: 10,
	width:20,
	height:20,
	color:'green'
}

document.onmousemove = function(mouse)
{
	var mouseX = mouse.clientX - document.getElementById('canvas').getBoundingClientRect().left;
	var mouseY = mouse.clientY - document.getElementById('canvas').getBoundingClientRect().top;

	if(mouseX < player.width)
		mouseX = 0;
	if(mouseX > WEIGHT)
		mouseX = WEIGHT;
	if(mouseY < 0)
		mouseY = 0;
	if(mouseY > HEIGHT)
		mouseY = HEIGHT;

	player.x = mouseX;
	player.y = mouseY;
}

//update the canvas
update = function ()
{
	canvas.clearRect(0,0,WEIGHT,HEIGHT);

	for(var key in enemyList)
	{
		updateEntity(enemyList[key]);

		var collision = testCollision(player,enemyList[key]);

		if(collision)
		{
			//decrease the health
			player.hp = player.hp - 1;

			if(player.hp <= 0)
			{
				//count how long the player survived then reset the health and the timer
				var surviveCount = Date.now() - timeWhenGameStarted;
				console.log("You Lost and survived for " + surviveCount + " ms.");
				timeWhenGameStarted = Date.now();
				player.hp = 10;
			}
		}
	}

	drawEntity(player);
	canvas.fillStyle = "red";
	canvas.fillText(player.hp + " Hp",0,30);
}

//set the update speed
setInterval(update,40);