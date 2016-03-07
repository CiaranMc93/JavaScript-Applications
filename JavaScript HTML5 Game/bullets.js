//handle the upgrades
bulletList = {};

//enemy constructor
Bullets = function (id,x,y,spdX,spdY,width,height)
{

	var bullet = {
	x:x,
	spdX:spdX,
	y:y,
	spdY:spdY,
	name:'E',
	id:id,
	width:width,
	height:height,
	color:'purple',
	timer:0
	}

	bulletList[id] = bullet;
}

randomBulletGeneration = function()
{
	var x = player.x;
	var y = player.y;
	var height = 5;
	var width = 5;
	var id = Math.random();
	//get an angle between 0 and 360
	var angle = Math.random()*360;
	//change theangle into radians so it can be calculated correctly
	var spdX= Math.cos(angle/180*Math.PI)*5;
	var spdY = Math.cos(angle/180*Math.PI)*5;

	//generate enemy
	Bullets(id,x,y,spdX,spdY,width,height);

}