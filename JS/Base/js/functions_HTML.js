﻿

myItemClass();

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