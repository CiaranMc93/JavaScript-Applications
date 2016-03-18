var canvas = document.getElementById("canvas").getContext("2d");

canvas.font = ("30px Arial");

//global variables
var HEIGHT = 500;
var WEIGHT = 500;
var message = 'Bouncing';
var timeWhenGameStarted = Date.now();

var frameCount = 0;
var score = 0;

var player;

//enemy constructor
Entity = function (type,id,x,y,spdX,spdY,width,height,color)
{

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

	self.update = function()
	{
		self.updateEntityPosition();
		self.drawEntity();
	}

	self.updateEntityPosition = function()
	{

		if(self.type === 'player')
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
		else
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
	}

	self.drawEntity = function()
	{
		canvas.fillStyle = self.color;
		canvas.fillRect(self.x-self.width/2,self.y-self.height/2,self.width,self.height);
	}

	//call the functions to update the self
	self.update();

	return self;
	
}



performAttack = function(entity)
{
	if(entity.counter > 25)
	{
		randomBulletGeneration(entity);
		counter = 0;
	}
}

performSpecialAttack = function(entity)
{
	if(entity.counter > 50)
	{
		for(var i = 0; i <= 360;i++)
		{
			//attack from all directions
			randomBulletGeneration(entity,i);
		}
		
		entity.attackCounter = 0;
	}

	mouse.preventDefault();
}

createPlayer = function()
{
	var self = Entity("player","myID",50,40,30,5,20,20,"green");

	self.attackSpd = 1;
	self.hp = 10;
	self.counter = 0;
	self.moveUp = false;
	self.moveDown = false;
	self.moveRight = false;
	self.moveLeft = false;
	self.aimAngle = 0;

	player = self;
	
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

	frameCount++;
	score++;

	//create a new random enemy every 4 seconds
	if(frameCount % 100 === 0) //4 seconds
	{
		randomGeneration();
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
		upgradeList[key].update();

		//test the collisions
		var collision = testCollision(player,upgradeList[key]);

		if(collision)
		{
			//different category of upgrade is defined
			if(upgradeList[key].category === 'score')
			{
				score += 1000;
			}
			else
			{
				player.attackSpd += 3;
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
		enemyList[key].update();

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

	player.update();
	canvas.fillStyle = "red";
	canvas.fillText(player.hp + " Hp",0,30);
	canvas.fillText("Score: " + score,WEIGHT-185,30);
}

//on right click
document.oncontextmenu = function(mouse)
{
	performSpecialAttack(player);
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

createPlayer();

//set the update speed
setInterval(update,50);