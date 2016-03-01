//todo list javascript application

var btnNew = document.getElementById("button");

var inItemText = document.getElementById("textItem");

function addNewItem(list, itemText)
{

	//get unique id for each new item
	var date = new Date();
	var uniqueId = "" + date.getMinutes() + date.getSeconds() + date.getMilliseconds();

	//create html element variables
	var listItem = document.createElement("li");
	listItem.id = "li_" + uniqueId;
	listItem.ondblclick = removeItem;

	var checkBox = document.createElement("input");

	checkBox.type = "checkbox";
	//get the id of the current checkbox
	checkBox.id = "checkId_" + uniqueId;
	checkBox.onclick = checkItem;

	var span = document.createElement("span");
	span.id = "spanId_" + uniqueId;

	//onclick functions
	span.onclick = renameItem;

	span.innerText = itemText;

	listItem.appendChild(checkBox);
	listItem.appendChild(span);

	//append text
	list.appendChild(listItem);
};

//rename item
function renameItem()
{
	//get span = this
	var newText = prompt("Rename this text to....");

	if(!newText || newText == "" || newText == " ")
	{
		return false;
	}

	this.innerText = newText;

	document.getElementById("li_" + removeItem).style.display = "none";

}

//remove item
function removeItem()
{
	this.style.display = "none";
}

//strikethrough the text
function checkItem()
{
	//this is the current checkbox and extract the id number
	var updateById = this.id.replace("checkId_","");

	//enable the change of the text
	var itemText = document.getElementById("spanId_" + updateById);

	//if the checkbox is checked, remove the styling
	if(!this.checked)
	{
		itemText.className = "";
	}
	else
	{
		itemText.className = "checked";
	}

};

//cursor focus' on text box
inItemText.focus();

inItemText.onkeyup = function(event)
{
	//catch enter event = num 13
	//proceed when enter

	if(event.which == 13)
	{
		//add new item
		addNew();
	}
}

//Button creates a new list item based on the button click
function addNew()
{
	var itemText = inItemText.value;
	
	//check if item is false or no value is placed
	if(!itemText || itemText == "")
	{
		return false;
	}

	addNewItem(document.getElementById("todoList"), itemText);

	inItemText.focus();

	//select current text so I can delete/create new easier
	inItemText.select();
};
