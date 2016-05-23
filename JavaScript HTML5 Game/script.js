//set the window height/width
var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
x = w.innerWidth || e.clientWidth || g.clientWidth,
y = w.innerHeight|| e.clientHeight|| g.clientHeight;

var canvasVariables = document.getElementById("canvas");
var canvas = document.getElementById("canvas").getContext("2d");

//get home screen/game over screen
var gameOver = document.getElementById("gameOver");
var game = document.getElementById("game");
var homeScreen = document.getElementById("homeScreen");


canvasVariables.width = x - 30;
canvasVariables.height = y - 30;

//change the font sizes accordingly.
if(canvasVariables.width<480)
{
    canvas.font='10px verdana';

}
else if(canvasVariables.width<768)
{
    canvas.font='30px verdana';
}
else
{
    canvas.font='40px verdana';
} 

//global variables
var HEIGHT = canvasVariables.height;
var WEIGHT = canvasVariables.width;
var message = 'Bouncing';
var timeWhenGameStarted = Date.now();
var frameCount = 0;
//set the leve to be 0 at start
var player;
var playerIsHit = false;
var hitTimer = 0;

//game over flag
var gameOverFlag = false;

STATS = {
	level:0,
	score:0,
	enemiesKilled:0,
	bulletsFired:200,
	timesHit:0,
	specialAttacks:0,
	gotUpgrade:0,
	healthRecovered:0,
	timeLastHit:0,

}

//entity constructor
Entity = function (type,id,x,y,spdX,spdY,width,height,color)
{

	//create the bones of each entity
	var self = {
		type:type,
		x:x,
		spdX:spdX,
		y:y,
		spdY:spdY,
		width:width,
		height:height,
		color:color,
	}

	//update the entity
	self.update = function()
	{
		self.updateEntityPosition();
		self.drawEntity();
	}

	self.updateEntityPosition = function()
	{

		self.x += self.spdX;
		self.y += self.spdY;
		
		//bounce off the x axis
		if(self.x < 0 || self.x > WEIGHT)
		{
			self.spdX = -self.spdX;
		}

		//bounce off the y axis
		if(self.y < 0 || self.y > HEIGHT)
		{
			self.spdY = -self.spdY;
		}
	}

	//draw the entity
	self.drawEntity = function()
	{
		canvas.fillStyle = self.color;
		canvas.fillRect(self.x-self.width/2,self.y-self.height/2,self.width,self.height);
	}

	//call the functions to update the self
	self.update();

	return self;
	
}

Actor = function(type,id,x,y,spdX,spdY,width,height,color,hp,attackSpd)
{
	var self = Entity(type,id,x,y,spdX,spdY,width,height,color);

	//save content of update before calling it
	var super_update = self.update;

	self.update = function()
	{
		super_update();
		self.attackCounter += self.attackSpd;
	}

	self.performAttack = function()
	{
		if(self.counter > 25)
		{
			randomBulletGeneration(self);
			counter = 0;
		}
	}


	self.attackSpd = attackSpd;
	self.hp = hp;
	self.counter = 0;
	self.aimAngle = 0;

	return self;
}

Player = function()
{
	var self = Actor("player","myID",50,40,30,5,20,20,"green",100,1);

	self.updateEntityPosition = function()
	{
		if(self.moveRight)
		{
			self.x += 10;
		}
		if(self.moveLeft)
		{
			self.x -= 10;
		}
		if(self.moveDown)
		{
			self.y += 10;
		}
		if(self.moveUp)
		{
			self.y -= 10;
		}

		//is the position valid?
		if(self.x < self.width/2)
			self.x = self.width/2;
		if(self.x > WEIGHT - self.width/2)
			self.x = WEIGHT - self.width/2;
		if(self.y < self.height/2)
			self.y = self.height/2;
		if(self.y > HEIGHT - self.height/2)
			self.y = HEIGHT - self.height/2;
	}

	self.moveUp = false;
	self.moveDown = false;
	self.moveRight = false;
	self.moveLeft = false;

	return self;
}

//mouse click
document.onclick = function()
{
	//decrement the bullets
	STATS.bulletsFired--;

	//check if the user used too many bullets
	if(STATS.bulletsFired >= 0)
	{
		randomBulletGeneration(player);
	}
}

counter = 0;

//update the canvas
update = function ()
{
	canvas.clearRect(0,0,WEIGHT,HEIGHT);

	//increase framecount and score
	frameCount++;
	STATS.score++;

	//increase the STATS.levels and the difficulty
	if(STATS.level == 0)
	{
		//create a new random enemy every 4 seconds while the score is less than 10000
		if(frameCount % 100 === 0) //4 seconds
		{
			//basic enemy generation
			randomGeneration();
		}

		//increment STATS.level
		if(STATS.score > 10000)
		{
			STATS.level++;
		}
	}
	else if(STATS.level == 1)
	{
		//create a new random enemy every 3 seconds while the score is less than 10000
		if(frameCount % 75 === 0) //3 seconds
		{
			//basic enemy generation
			randomGeneration();
			randomGeneration();
		}

		//increment STATS.level
		if(STATS.score > 20000)
		{
			STATS.level++;
		}
	}
	else if(STATS.level == 2)
	{
		//create a new random enemy every 2 seconds while the score is less than 10000
		if(frameCount % 50 === 0) //2 seconds
		{
			//basic enemy generation
			randomGeneration();
			randomGeneration();
			randomGeneration();
			randomGeneration();
		}

		//increment STATS.level
		if(STATS.score > 30000)
		{
			STATS.level++;
		}
	}
	else if(STATS.level == 3)
	{
		//create a new random enemy every 1 seconds while the score is less than 10000
		if(frameCount % 25 === 0) //1 seconds
		{
			//basic enemy generation
			randomGeneration();
			randomGeneration();
		}

		//increment STATS.level
		if(STATS.score > 50000)
		{
			STATS.level++;
		}
	}
	else if(STATS.level == 4)
	{
		//create random enemies less than 1 second
		if(frameCount % 10 === 0) //less than 1 second
		{
			//basic enemy generation
			randomGeneration();
			randomGeneration();
		}
	}

	player.counter += player.attackSpd;

	//draw the bullets
	//for each upgrade in the list
	for(var key in bulletList)
	{
		//get each upgrade
		bulletList[key].update();

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
				STATS.score += 500;
				//enemies killed
				STATS.enemiesKilled++;

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
	if(frameCount % 150 === 0) //6 seconds
	{
		randomUpgradeGeneration();
	}

	//for each upgrade in the list
	for(var key in upgradeList)
	{
		//remove upgrade flag
		var toRemove = false;

		//get each upgrade
		upgradeList[key].update();

		//count a timer for each upgrade
		upgradeList[key].timer++;

		//if the upgrade timer is 4 seconds 25x4 = 100
		if(upgradeList[key].timer === 100)
		{
			toRemove = true;
		}

		//test if there is a collision between the player and an upgrade
		var collision = testCollision(player,upgradeList[key]);

		if(collision)
		{
			//update the upgrade stats
			STATS.gotUpgrade++;

			//different category of upgrade is defined
			if(upgradeList[key].category === 'score')
			{
				STATS.score += 1000;
			}
			else if(upgradeList[key].category === 'score' && STATS.level == 1)
			{
				STATS.score += 2000;
			}
			else if(upgradeList[key].category === 'ringAttack')
			{
				//enable a ring attack
				ringAttack = true;
			}
			else if(upgradeList[key].category === 'reload')
			{
				//reload the bullets by 10
				STATS.bulletsFired += 20;
			}
			else if(upgradeList[key].category === 'health')
			{
				//health is restored by 10
				player.hp += 10;
			}

			//remove upgrade from the list
			delete upgradeList[key];
		}

		//remove the upgrade from the list
		if(toRemove)
		{
			delete upgradeList[key];
		}
	}

	//for each enemy 
	for(var key in enemyList)
	{
		//update the enemies
		enemyList[key].update();

		//test collision with the player
		var collision = testCollision(player,enemyList[key]);

		hitTimer++;

		//check if there is a collision
		if(collision && playerIsHit == false)
		{
			//reset hit Timer
			hitTimer = 0;

			//decrease the health
			player.hp = player.hp - 10;

			//player hit counter
			STATS.timesHit++;

			//if the player is hit, let them regroup.
			playerIsHit = true;
		}

		//hit timer is equal to 3 seconds (25 frames per second)
		if(hitTimer === 100 && playerIsHit === true)
		{
			playerIsHit = false;
		}
	}

	if(player.hp <= 0)
	{
		//count how long the player survived then reset the health and the timer
		var surviveCount = Date.now() - timeWhenGameStarted;

		//when the player loses their health, show their statistics
		game.style.display = 'none';
		gameOver.style.display = 'inline-block';

		if(!gameOverFlag)
		{	
			//set game over flag to be true
			gameOverFlag = true;
			//display stats
			statistics();
		}
	}

	//update the player
	player.update();

	canvas.fillStyle = "red";
	canvas.fillText(player.hp + " Hp",0,30);
	canvas.fillText("Level: " + STATS.level,300,30);
	canvas.fillText("Score: " + STATS.score,WEIGHT-300,30);
}

//on right click
document.oncontextmenu = function(mouse)
{
	//if the player gets a green box(ring attack) they can defeat all enemies at once.
	if(ringAttack == true)
	{
		for(var i = 0; i <= 360;i++)
		{
			//attack from all directions
			randomBulletGeneration(player,i);
		}

		//reset the ring attack
		ringAttack = false;
	}

	
}

statistics = function()
{
	//display stats
	gameOver.innerHTML += '<h3>' + 'Enemies Killed: ' + STATS.enemiesKilled + '</h3>';
	gameOver.innerHTML += '</br>';
	gameOver.innerHTML += '<h3>' + 'Times Hit By Enemy: ' + STATS.timesHit + '</h3>';
	gameOver.innerHTML += '</br>';
	gameOver.innerHTML += '<h3>' + 'Upgrades Collected: ' + STATS.gotUpgrade + '</h3>';
	gameOver.innerHTML += '</br>';
	gameOver.innerHTML += '<h3>' + 'Level Reached: ' + STATS.level + '</h3>';
	gameOver.innerHTML += '</br>';
	gameOver.innerHTML += '<h3>' + 'Score: ' + STATS.score + '</h3>';
	gameOver.innerHTML += '</br>';
	gameOver.innerHTML += '<button onclick="startNewGame()">' + '<h1>' + 'Start New Game?' + '</h1>' + '</button>';
}

//reset the game
startNewGame = function()
{
	//hide the game screen
	homeScreen.style.display = 'none'
	game.style.display = 'inline-block';
	gameOver.style.display = 'none';

	//start a new game
	player.hp = 100;
	timeWhenGameStarted = Date.now();
	STATS.enemiesKilled = 0;
	frameCount = 0;
	STATS.score = 0;
	bulletsLeft = 0;
	STATS.level = 0;
	STATS.timesHit = 0;
	STATS.bulletsFired = 200;
	gameOverFlag = false;

	//entity lists
	enemyList = {};
	upgradeList = {};
	bulletList = {};

	//create new enemies
	randomGeneration();
	randomGeneration();
	randomGeneration();
	randomGeneration();
}

//create the player
player = Player();

//set the update speed
setInterval(update,50);