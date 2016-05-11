//handle the upgrades
bulletList = {};

//enemy constructor
Bullets = function (id,x,y,spdX,spdY,width,height,aimAngle)
{

	var self = Entity("bullet",id,x,y,spdX,spdY,width,height,"purple");

	self.timer = 0;
	self.aimAngle = aimAngle;

	bulletList[id] = self;
}

randomBulletGeneration = function(entity,overwriteAngle)
{
	var x = entity.x;
	var y = entity.y;
	var height = 5;
	var width = 5;
	var id = Math.random();
	//get an angle between 0 and 360
	var angle = entity.aimAngle;

	if(overwriteAngle !== undefined)
	{
		angle = overwriteAngle;
	}

	//change theangle into radians so it can be calculated correctly
	var spdX = Math.cos((angle/180)* Math.PI)*5;
	var spdY = Math.sin((angle/180)* Math.PI)*5;

	var angX = Math.cos(angle/180);
	var angY = Math.sin(angle/180);

	var piX = angX*Math.PI;
	var piY = angY*Math.PI;

	var x5 = piX*5;
	var y5 = piY*5;

	//generate bullet
	Bullets(id,x,y,x5,y5,width,height,angle);

}