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
Enemy('E1',100,90,10,-8,30,30);
Enemy('E2',75,200,17,-15,30,30);
Enemy('E3',250,150,15,-3,50,50);