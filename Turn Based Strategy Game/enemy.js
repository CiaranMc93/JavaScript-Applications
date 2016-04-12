//create a list of enemies
var enemyList = {};

//enemy constructor
Enemy = function (id,x,y,spdX,spdY,width,height)
{

	var self = Actor("enemy",id,x,y,spdX,spdY,width,height,image.enemy,10,1);

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
	var height = 55;
	var width = 55;
	var id = Math.random();
	var spdX = 5 + Math.random()* 5;
	var spdY = 5 + Math.random()* 5;

	//generate enemy
	Enemy(id,x,y,spdX,spdY,width,height);

}
