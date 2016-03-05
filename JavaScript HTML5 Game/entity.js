//update the entity to accept whatever entity is sent in
updateEntity = function (entity)
{
	updateEntityPosition(entity);
	drawEntity(entity);
}

updateEntityPosition = function(entity)
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

drawEntity = function(entity)
{
	canvas.fillStyle = entity.color;
	canvas.fillRect(entity.x-entity.width/2,entity.y-entity.height/2,entity.width,entity.height);
}