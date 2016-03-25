//handle the upgrades
bulletList = {};

//enemy constructor
Bullets = function (id,x,y,spdX,spdY,width,height)
{

	var self = Entity("bullet",id,x,y,spdX,spdY,width,height,image.bullet);

	self.timer = 0;

	bulletList[id] = self;
}

randomBulletGeneration = function(entity,overwriteAngle)
{
	var x = entity.x;
	var y = entity.y;
	var height = 32;
	var width = 32;
	var id = Math.random();
	//get an angle between 0 and 360
	var angle = entity.aimAngle;

	if(overwriteAngle !== undefined)
	{
		angle = overwriteAngle;
	}
	//change theangle into radians so it can be calculated correctly
	var spdX= Math.cos((angle/180)* Math.PI)*5;
	var spdY = Math.sin((angle/180)* Math.PI)*5;

	//generate bullet
	Bullets(id,x,y,spdX,spdY,width,height);

}