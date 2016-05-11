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
	var x = player.x;
	var y = player.y;
	var height = 5;
	var width = 5;
	var id = Math.random();

	if(overwriteAngle !== undefined)
	{
		angle = overwriteAngle;
	}
	else
	{
		angle = entity.aimAngle;
	}

	/*change theangle into radians so it can be calculated correctly
	var spdX = Math.cos((angle/180)* Math.PI)*5;
	var spdY = Math.sin((angle/180)* Math.PI)*5;*/

	var spdX = Math.cos(angle/180*Math.PI)*5;
	var spdY = Math.sin(angle/180*Math.PI)*5;

	//generate bullet
	Bullets(id,x,y,spdX,spdY,width,height,angle);

}