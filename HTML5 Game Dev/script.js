var canvas = document.getElementById("mainCanvas");

var context = canvas.getContext("2d");

//get canvas bounds
var width = 500;
var height = 400;
var speed = 2;

var score = 0;

//create the player
var player = {
	x: 10,
	y: 10,
	width: 20,
	height: 20
};

//create the enemy
var enemy = {
	x: Math.random() * (width - 20),
	y: Math.random() * (height - 20),
	width: 20,
	height: 20
};

//create list of key listeners.
var keys = [];

//capture the event on key down 
window.addEventListener("keydown",function(event)
{
	keys[event.keyCode] = true;

}, false);

//capture the event on key up 
window.addEventListener("keyup",function(event)
{
	delete keys[event.keyCode];
	
}, false);

/*Create list of key codes

up = 38
down = 40
left = 37
right = 39

w = 87
a = 65
s = 83
d = 68

*/

function game()
{
	update();
	render();
}

//updating the canvas at 30 frames per second
function update()
{
	//up
	if(keys[38] || keys[87])
	{
		player.y-=speed;
	}

	//down
	if(keys[40] || keys[83])
	{
		player.y+=speed;
	}

	if(keys[37] || keys[65])
	{
		player.x-=speed;
	}

	if(keys[39] || keys[68])
	{
		player.x+=speed;
	}

	//if it is outside the bounds
	if(player.x < 0)
	{
		player.x = 0;
	}

	if(player.y < 0)
	{
		player.y = 0;
	}

	if(player.x >= width)
	{
		player.x = width - 20;
	}

	if(player.y >= height)
	{
		player.y = height - 20;
	}


	//check collision
	if(collision(player, enemy))
	{
		process();
	}
}

function process()
{

	score++;

	//reset the enemy
	enemy.x = Math.random() * (width - 20);
	enemy.y =  Math.random() * (height - 20);
}

//collision detection
function collision(player, enemy)
{
	//check if the rectangles collide
	if(!(player.x > (enemy.x + enemy.width) || 
		(player.x + player.width) < enemy.x ||
		player.y > (enemy.y + enemy.height) ||
		(player.y + player.height) < enemy.y
		))
	{
		return true;
	}
	else
	{
		return false;
	}
}

function render()
{
	//clear the rectangle
	context.clearRect(0,0,width,height);

	//render the player
	context.fillStyle = "green";
	context.fillRect(player.x,player.y,player.width,player.height);

	//render the enemy
	context.fillStyle = "red";
	context.fillRect(enemy.x,enemy.y,enemy.width,enemy.height);

	context.fillStyle = "black";
	context.font = "bold 30px helvetica";
	context.fillText(score, 30, 30);

}

//Run at 30 frames per second
setInterval(function()
{
	game();
}, 1000/60)

