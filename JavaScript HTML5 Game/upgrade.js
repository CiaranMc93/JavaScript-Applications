//handle the upgrades
upgradeList = {};

//upgrade functionality
var ringAttack = false;

//enemy constructor
Upgrade = function (id,x,y,spdX,spdY,width,height,category,color)
{

	var self = Entity("upgrade",id,x,y,spdX,spdY,width,height,color);
	
	self.category = category;
	self.timer = 0;

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
	//get a random whole number between 1 and 3
	var random = Math.floor(Math.random() * 3) + 1

	//high or low category
	if(random === 1)
	{
		//score category
		var category = 'score';
		var color = 'red';
	}
	else if(random === 2)
	{
		//ring attack category
		var category = 'ringAttack';
		var color = 'green';
	}
	else if(random === 3)
	{
		//speed category
		var category = 'reload';
		var color = 'purple';
	}

	//generate enemy
	Upgrade(id,x,y,spdX,spdY,width,height,category,color);

}