//update the entity to accept whatever entity is sent in
updateEntity = function (entity)
{
	updateEntityPosition(entity);
	drawEntity(entity);
}

updateEntityPosition = function(entity)
{

	if(entity.type === 'player')
	{
		if(entity.moveRight)
		{
			entity.x += 10;
		}
		if(entity.moveLeft)
		{
			entity.x -= 10;
		}
		if(entity.moveDown)
		{
			entity.y += 10;
		}
		if(entity.moveUp)
		{
			entity.y -= 10;
		}

		//is the position valid?
		if(entity.x < entity.width/2)
			entity.x = entity.width/2;
		if(entity.x > WEIGHT - entity.width/2)
			entity.x = WEIGHT - entity.width/2;
		if(entity.y < entity.height/2)
			entity.y = entity.height/2;
		if(entity.y > HEIGHT - entity.height/2)
			entity.y = HEIGHT - entity.height/2;
		}
	else
	{
		entity.x += entity.spdX;
		entity.y += entity.spdY;
		
		//bounce off the x axis
		if(entity.x < 0 || entity.x > WEIGHT)
		{
			entity.spdX = -entity.spdX;
		}

		//bounce off the y axis
		if(entity.y < 0 || entity.y > HEIGHT)
		{
			entity.spdY = -entity.spdY;
		}
	}
}

performAttack = function(entity)
{
	if(entity.counter > 25)
	{
		randomBulletGeneration(entity);
		counter = 0;
	}
}

performSpecialAttack = function(entity)
{
	if(entity.counter > 50)
	{
		for(var i = 0; i <= 360;i++)
		{
			//attack from all directions
			randomBulletGeneration(entity,i);
		}
		
		entity.attackCounter = 0;
	}

	mouse.preventDefault();
}

drawEntity = function(entity)
{
	canvas.fillStyle = entity.color;
	canvas.fillRect(entity.x-entity.width/2,entity.y-entity.height/2,entity.width,entity.height);
}