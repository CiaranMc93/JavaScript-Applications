//handle the upgrades
upgradeList = {};

//enemy constructor
Upgrade = function (id,x,y,spdX,spdY,width,height,category)
{

	var upgrade = {
	x:x,
	spdX:spdX,
	y:y,
	spdY:spdY,
	name:'E',
	id:id,
	width:width,
	height:height,
	color:'orange',
	category:category
	}

	upgradeList[id] = upgrade;
}

randomUpgradeGeneration = function()
{
	var x = Math.random()*WEIGHT;
	var y = Math.random()*HEIGHT;
	var height = 10;
	var width = 10;
	var id = Math.random();
	var spdX= 0;
	var spdY = 0;

	//high or low category
	if(Math.random()<0.5)
	{
		var category = 'low';
	}
	else
	{
		var category = 'high';
	}

	//generate enemy
	Upgrade(id,x,y,spdX,spdY,width,height,category);

}