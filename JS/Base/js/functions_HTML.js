function buttonsStyle(){
	var divClass = document.getElementById("divJS");
	divClass.style.color = "blue";

	var elements = divClass.querySelectorAll("div.myItemJS");
	//elements[0].style.color = "red";

	//for (item = 0; item < elements.length; item++) {
	//	elements[item].style.color = "red";
	//}

	//for (let element of elements) {
	//	element.style.color = "red";
	//}

	document.myForm.name.value = "vmvpro";
}


function insertCommentsNew() {
	
	// Ищем класс в документе boxJS
	var boxJs = document.getElementsByClassName("boxJS")[0];

	// К содержимомоу класса добавляем наши элементы
	// в начало
	// (простой способ)
	boxJs.innerHTML = "<div class='itemJS'>" +
		new Date() +
		"</div >" +
		boxJs.innerHTML;
	
	//-------------------

	// С помощью объектной модели DOM API

	var date = new Date();

	var div = document.createElement("div");
	div.className = "itemJS";
	div.innerHTML = date.getMinutes() + ":" + date.getSeconds();

	// метод добавляет в начало
	boxJs.prepend(div);

	// в конец 
	//boxJs.appendChild(div);

	// Создает текстовое содержимое
	//var textnode = document.createTextNode("Water");         
	
}

function styleButtons() {
	var buttons = document.getElementsByTagName("button");
	//buttons[0].style.color = "red";

	for (item = 0; item < buttons.length; item++) {
		buttons[item].classList.add("classButton");
	}

	var boxJs = document.getElementsByClassName("boxJS")[0];

	//boxJs.innerHTML = "<div class='itemJS'>" +
	//	new Date()
	//	+ "</div >" + boxJs.innerHTML;


	//-------------------

	var date = new Date();

	var div = document.createElement("div");
	div.className = "itemJS";
	div.innerHTML = date.getMinutes() + ":" + date.getSeconds();

	//boxJs.appendChild(div);

	boxJs.prepend(div);

	//var text = document.createTextNode("Object my Js");


	//var node = document.createElement("LI");                 // Create a <li> node
	//var textnode = document.createTextNode("Water");         // Create a text node
	//node.appendChild(textnode);                              // Append the text to <li>

	//boxJs.appendChild(node); 

	//var comment = "<div class='comment'><b>Email:</b> " +
	//	email.value + "<br><b>Имя:</b> " + name.value + "<br><b>Телефон:</b> "
	//	+ telephone.value + "<br>" + message.value + "</div>";
	//// Добавлям новый комментарий в начало и после него добавляем все прошлые
	//document.getElementById("allComments").innerHTML =
	//	comment + document.getElementById("allComments").innerHTML;
}

//myItemClass();

function myItemClass() {

	var divClass = document.getElementById("divJS");
	divClass.style.color = "blue";

	var elements = divClass.querySelectorAll("div.myItemJS");
	//elements[0].style.color = "red";

	for (item = 0; item < elements.length; item++) {
		elements[item].style.color = "red";
	}

}



//------------------------------------------
function formSend() {
	var name = document.getElementById("name").value;
	var age = document.getElementById("age").value;

	var resultId = document.getElementById("result");

	resultId.innerHTML = name + " (" + age + ")";

}


function btnStyle() {

	var txt = document.getElementById("txtHide");
	
	var myButton = document.getElementById("myButton");

	if (txt.value == 1) {
	
		myButton.style.fontSize = "15px";
		myButton.style.fontFamily = "Comic Sans MS";
		myButton.style.color = "blue";

		myButton.style.cssText = "margin: 0; padding: 0;";

		txt.value = 2;
	} else if (txt.value == 2) {

		myButton.style.cssText =
			"margin: 5px 15px; " +
			"padding: 5px 15px; " +
			"border-radius: 5px; " +
			"border-style: groove;";
		
		txt.value = 1;

	}

}

function btnStyle2() {
	// Выбираем нужный элемент
	var textChange = document.getElementById("btnStyle");
	// Меняем размер шрифта
	textChange.style.fontSize = "15px";
	// Меняем шрифт
	
	// Меняем цвет
	textChange.style.color = "blue";
}