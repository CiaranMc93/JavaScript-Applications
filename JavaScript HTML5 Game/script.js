var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
x = w.innerWidth || e.clientWidth || g.clientWidth,
y = w.innerHeight|| e.clientHeight|| g.clientHeight;

var canvasVariables = document.getElementById("canvas");
var canvas = document.getElementById("canvas").getContext("2d");

canvas.font = ("30px Arial");

canvasVariables.width = x - 30;
canvasVariables.height = y - 30;

//global variables
var HEIGHT = canvasVariables.height;
var WEIGHT = canvasVariables.width;
var message = 'Bouncing';
var timeWhenGameStarted = Date.now();
var frameCount = 0;
var score = 0;
//set the level to be 0 at start
var level = 0;	
var player;
var playerIsHit = false;
//if the player is hit, the player can regroup
var regroupTime = 0;

//player statistics
var enemiesKilled = 0;

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
	randomBulletGeneration(player);
}

counter = 0;

//update the canvas
update = function ()
{
	canvas.clearRect(0,0,WEIGHT,HEIGHT);

	//increase framecount and score
	frameCount++;
	score++;

	//increase the levels and the difficulty
	if(level == 0)
	{
		//create a new random enemy every 4 seconds while the score is less than 10000
		if(frameCount % 100 === 0) //4 seconds
		{
			//basic enemy generation
			randomGeneration();
		}

		//increment level
		if(score > 10000)
		{
			level++;
		}
	}
	else if(level == 1)
	{
		//create a new random enemy every 3 seconds while the score is less than 10000
		if(frameCount % 75 === 0) //3 seconds
		{
			//basic enemy generation
			randomGeneration();
			randomGeneration();
		}

		//increment level
		if(score > 20000)
		{
			level++;
		}
	}
	else if(level == 2)
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

		//increment level
		if(score > 30000)
		{
			level++;
		}
	}
	else if(level == 3)
	{
		//create a new random enemy every 1 seconds while the score is less than 10000
		if(frameCount % 25 === 0) //1 seconds
		{
			//basic enemy generation
			randomGeneration();
			randomGeneration();
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
				score += 500;
				//enemies killed
				enemiesKilled++;

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
			//different category of upgrade is defined
			if(upgradeList[key].category === 'score')
			{
				score += 1000;
			}
			else if(upgradeList[key].category === 'score' && level == 1)
			{
				score += 2000;
			}
			else if(upgradeList[key].category === 'ringAttack')
			{
				//enable a ring attack
				ringAttack = true;
			}

			//remove upgrade from the list
			delete upgradeList[key];
		}

		if(toRemove)
		{
			delete upgradeList[key];
		}
	}

	//for each enemy 
	for(var key in enemyList)
	{
		enemyList[key].update();

		var collision = testCollision(player,enemyList[key]);

		//check the flag
		if(playerIsHit == true)
		{
			//increment time.
			regroupTime++;

			/*every second, flash the player on the screen 
			if(regroupTime % 25 === 0)
			{
				Player.color = 'white'
			}*/

			//if 2 seconds pass, time is over.
			if(regroupTime > 75)
			{
				//reset hit
				playerIsHit = false;
				//reset timer
				regroupTime = 0;
			}
		}

		//check if there is a collision
		if(collision && playerIsHit == false)
		{
			//decrease the health
			player.hp = player.hp - 10;

			//if the player is hit, let them regroup.
			playerIsHit = true;
		}
	}

	if(player.hp <= 0)
	{
		//count how long the player survived then reset the health and the timer
		var surviveCount = Date.now() - timeWhenGameStarted;
		console.log("You Lost and survived for " + surviveCount + " ms.");
		level = 0;
		
		startNewGame();
	}

	player.update();

	canvas.fillStyle = "red";
	canvas.fillText(player.hp + " Hp",0,30);
	canvas.fillText("Level: " + level,100,30);
	canvas.fillText("Score: " + score,WEIGHT-185,30);
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

//reset the game
startNewGame = function()
{
	//start a new game
	player.hp = 100;
	timeWhenGameStarted = Date.now();
	enemiesKilled = 0;
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

//create the player
player = Player();

//set the update speed
setInterval(update,50);