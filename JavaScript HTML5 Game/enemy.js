//create a list of enemies
var enemyList = {};

//enemy constructor
Enemy = function (id,x,y,spdX,spdY,width,height)
{

	var self = Actor("enemy",id,x,y,spdX,spdY,width,height,"black",10,1);

	self.aimAngle = 0;
	self.attackSpd = 1;
	self.attackCounter = 0;
	

	enemyList[id] = self;
}

//call enemy function

randomGeneration = function()
{
	var x = Math.random()*WEIGHT;
	var y = Math.random()*HEIGHT;
	var id = Math.random();

	//increasing difficulty as it progresses
	if(level == 1)
	{
		var height = 45;
		var width = 45;
		var spdX = 5 + Math.random()* 10;
		var spdY = 5 + Math.random()* 10;
	}
	else if(level == 2)
	{
		var height = 35;
		var width = 35;
		var spdX = 5 + Math.random()* 10;
		var spdY = 5 + Math.random()* 10;
	}
	else if(level == 3)
	{
		var height = 25;
		var width = 25;
		var spdX = 5 + Math.random()* 10;
		var spdY = 5 + Math.random()* 10;
	}
	else
	{
		var height = 55;
		var width = 55;
		var spdX = 5 + Math.random()* 5;
		var spdY = 5 + Math.random()* 5;
	}

	//generate enemy
	Enemy(id,x,y,spdX,spdY,width,height);

}

randomGeneration();
randomGeneration();
randomGeneration();
randomGeneration();
