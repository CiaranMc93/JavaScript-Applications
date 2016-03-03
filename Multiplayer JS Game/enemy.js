//create a list of enemies
var enemyList = {};

//enemy constructor
Enemy = function (id,x,y,spdX,spdY,width,height)
{

	var enemy = {
	x:x,
	spdX:spdX,
	y:y,
	spdY:spdY,
	name:'E',
	id:id,
	width:width,
	height:height,
	color:'black'
	}

	enemyList[id] = enemy;
}

//call enemy function

randomGeneration = function()
{
	var x = Math.random()*WEIGHT;
	var y = Math.random()*HEIGHT;
	var height = 10 + Math.random()*30;
	var width = 10 + Math.random()*30;
	var id = Math.random();
	var spdX = 5 + Math.random()* 5;
	var spdY = 5 + Math.random()* 5;

	//generate enemy
	Enemy(id,x,y,spdX,spdY,width,height);

}


randomGeneration();
randomGeneration();
randomGeneration();
