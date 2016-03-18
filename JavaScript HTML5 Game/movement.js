//handling player movement

document.onkeydown = function(event)
{
	//moving using WASD
	if(event.keyCode == 68) {

		player.moveRight = true;
	} else if (event.keyCode == 83) {

		player.moveDown = true;
	}else if (event.keyCode == 65) {
		
		player.moveLeft = true;
	}else if (event.keyCode == 87) {
		
		player.moveUp = true;
	}
}

document.onkeyup = function(event)
{
	//moving using WASD
	if(event.keyCode == 68) {

		player.moveRight = false;
	} else if (event.keyCode == 83) {

		player.moveDown = false;
	}else if (event.keyCode == 65) {
		
		player.moveLeft = false;
	}else if (event.keyCode == 87) {
		
		player.moveUp = false;
	}
}

document.onmousemove = function(mouse)
{
	
	var mouseX = mouse.clientX - document.getElementById('canvas').getBoundingClientRect().left;
	var mouseY = mouse.clientY - document.getElementById('canvas').getBoundingClientRect().top;

	//position relative to the player from the mouse instead of the origin
	mouseX -= player.x;
	mouseY -= player.y;

	player.aimAngle = Math.atan2(mouseY,mouseX);

	player.aimAngle*5;

	/*
	if(mouseX < player.width/2)
		mouseX = player.width/2;
	if(mouseX > WEIGHT - player.width/2)
		mouseX = WEIGHT - player.width/2;
	if(mouseY < player.height/2)
		mouseY = player.height/2;
	if(mouseY > HEIGHT - player.height/2)
		mouseY = HEIGHT - player.height/2;

	player.x = mouseX;
	player.y = mouseY;
	*/
}