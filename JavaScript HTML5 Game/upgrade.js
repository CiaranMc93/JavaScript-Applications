//handle the upgrades
upgradeList = {};

//enemy constructor
Upgrade = function (id,x,y,spdX,spdY,width,height,category,image)
{

	var self = Entity("upgrade",id,x,y,spdX,spdY,width,height,image);
	
	self.category = category;

	upgradeList[id] = self;
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
		//score category
		var category = 'score';

		//generate upgrade
		Upgrade(id,x,y,spdX,spdY,width,height,category,image.upgrade1);
	}
	else
	{
		//speed category
		var category = 'speed';
		//generate upgrade
		Upgrade(id,x,y,spdX,spdY,width,height,category,image.upgrade2);
	}

}