//collision detection
getDistanceBetweenEntities = function (player,enemy)
{
	var vx = player.x - enemy.x;
	var vy = player.y - enemy.y;

	//return the distance between
	return Math.sqrt(vx*vx + vy*vy);
}

//test collision
testCollision = function(player,enemy)
{
	//create the rectangles
	var player = {
		x:player.x-player.width/2,
		y:player.y-player.height/2,
		width:player.width,
		height:player.height
	}

	var enemy = {
		x:enemy.x-enemy.width/2,
		y:enemy.y-enemy.height/2,
		width:enemy.width,
		height:enemy.height
	}

	return testRectCollision(player,enemy);
}

//rectangle collision
testRectCollision = function(player,enemy)
{
	return player.x <= enemy.x+enemy.width
	&& enemy.x <= player.x+player.height
	&& player.y <= enemy.y + enemy.height
	&& enemy.y <= player.y + player.height;
}