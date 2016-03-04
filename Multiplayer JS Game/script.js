var canvas = document.getElementById("canvas").getContext("2d");

canvas.font = ("30px Arial");

//global variables
var HEIGHT = 500;
var WEIGHT = 500;
var message = 'Bouncing';
var timeWhenGameStarted = Date.now();

var frameCount = 0;
var score = 0;

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

	if(mouseX < player.width/2)
		mouseX = player.width/2;
	if(mouseX > WEIGHT - player.width/2)
		mouseX = WEIGHT - player.width/2;
	if(mouseY < player.height/2)
		mouseY = player.height/2;
	if(mouseY > HEIGHT - player.height/2)
		mouseY = HEIGHT - player.height/2;

	player.x = mouseX;
	player.y = mouseY;
}

//update the canvas
update = function ()
{
	canvas.clearRect(0,0,WEIGHT,HEIGHT);

	frameCount++;
	score++;

	//create a new random enemy every 4 seconds
	if(frameCount % 100 === 0) //4 seconds
	{
		randomGeneration();
	}

	//create a new random bullet every 2 seconds
	if(frameCount % 50 === 0) //2 seconds
	{
		randomBulletGeneration();
	}

	//draw the bullets
	//for each upgrade in the list
	for(var key in bulletList)
	{
		//get each upgrade
		updateEntity(bulletList[key]);

		//remove bullet flag
		var toRemove = false;

		//count bullet timer
		bulletList[key].timer++;

		//if the timer is 100 then delete the bullet
		if(bulletList[key].timer > 100)
		{
			toRemove = true;
		}

		//if a bullet collides with an enemy
		for(var key2 in enemyList)
		{
			var collision = testCollision(bulletList[key],enemyList[key2]);

			if(collision)
			{
				//remove bullet and enemy
				delete bulletList[key];
				delete enemyList[key2];
				//increment score
				score += 500;
				break;
			}
		}//end for

		//if remove bullet is true
		if(toRemove)
		{
			delete bulletList[key];
		}
	}//end for

	//create random upgrades every 6 seconds
	if(frameCount % 150 === 0) //4 seconds
	{
		randomUpgradeGeneration();
	}

	//for each upgrade in the list
	for(var key in upgradeList)
	{
		//get each upgrade
		updateEntity(upgradeList[key]);

		//test the collisions
		var collision = testCollision(player,upgradeList[key]);

		if(collision)
		{
			if(upgradeList[key].category === 'low')
			{
				score += 1000;
			}
			else
			{
				score += 5000;
			}
			//decrease the health
			score += 1000;
			//remove upgrade from the list
			delete upgradeList[key];
		}
	}

	//for each enemy 
	for(var key in enemyList)
	{
		updateEntity(enemyList[key]);

		var collision = testCollision(player,enemyList[key]);

		if(collision)
		{
			//decrease the health
			player.hp = player.hp - 1;
		}
	}

	if(player.hp <= 0)
	{
		//count how long the player survived then reset the health and the timer
		var surviveCount = Date.now() - timeWhenGameStarted;
		console.log("You Lost and survived for " + surviveCount + " ms.");
		
		startNewGame();
	}

	drawEntity(player);
	canvas.fillStyle = "red";
	canvas.fillText(player.hp + " Hp",0,30);
	canvas.fillText("Score: " + score,200,30);
}

//reset the game
startNewGame = function()
{
	player.hp = 10;
	timeWhenGameStarted = Date.now();
	frameCount = 0;
	enemyList = {};
	upgradeList = {};
	bulletList = {};
	score = 0;

	//create new enemies
	randomGeneration();
	randomGeneration();
	randomGeneration();
	randomGeneration();
}

//set the update speed
setInterval(update,40);