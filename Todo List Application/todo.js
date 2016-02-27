// Each item should look like this
//<li><input type="checkbox"/><span>Create this application</span></li>

function addNewItem(list)
{
	var listItem = document.createElement("li");
	listItem.innerText = "Hello";

	list.appendChild(listItem);
};

var btnNew = document.getElementById("button");

//Button creates a new list item based on the button click
btnNew.onClick = function()
{
	alert("Got here");
	addNewItem(document.getElementById("todoList"));
};