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

//updates the players position on the canvas
updatePlayerPosition = function()
{
	if(player.moveRight)
	{
		player.x += 10;
	}
	if(player.moveLeft)
	{
		player.x -= 10;
	}
	if(player.moveDown)
	{
		player.y += 10;
	}
	if(player.moveUp)
	{
		player.y -= 10;
	}

	//is the position valid?
	if(player.x < player.width/2)
		player.x = player.width/2;
	if(player.x > WEIGHT - player.width/2)
		player.x = WEIGHT - player.width/2;
	if(player.y < player.height/2)
		player.y = player.height/2;
	if(player.y > HEIGHT - player.height/2)
		player.y = HEIGHT - player.height/2;
}

document.onmousemove = function(mouse)
{
	/*
	var mouseX = mouse.clientX - document.getElementById('canvas').getBoundingClientRect().left;
	var mouseY = mouse.clientY - document.getElementById('canvas').getBoundingClientRect().top;

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