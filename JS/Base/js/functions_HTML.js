
function formSend() {
	name = document.getElementById("name").value;
	age = document.getElementById("age").value;

	var resultId = document.getElementById("result");

	resultId.innerHTML = name + " (" + age + ")";

}


