// Получаем нынешний правый и левый активный блок
var arrayRight = document.getElementsByClassName("slider-right-feedbacks");
var arrayLeft = document.getElementsByClassName("slider-left-feedbacks");

 // Берем кнопки слайдера
var rightButton = document.getElementsByClassName("right-container")[0];
var leftButton =  document.getElementsByClassName("left-container")[0];

var sliderContLeft = document.getElementsByClassName("slider-left-container")[0], sliderContRight = document.getElementsByClassName("slider-right-container")[0];

// Получаем общий объект с переключателями (три квадратных кнопки по середине)
var tabMenu = document.getElementsByClassName("tabs");
var indicator = 0; // Количество слайдов, изначально мы на нулевом
var sliderStop = false;

function addClass(param , numbs, end) {
	if(!sliderStop){
		sliderStop = true; // Устанавливаем что слайдер в работе
		// Добавление различных стилей к различным блокам
		sliderContRight.classList.add("animation-rotates");
		sliderContLeft.classList.add("animation-rotates");
		arrayRight[param + numbs].classList.add('animation-slide');
		arrayLeft[param + numbs].classList.add('animation-slide');
		tabMenu[param + numbs].classList.remove("click-tab");

		// Через 700 милисекунд устанавливаем нужные стили
		// Таким образом получается эффект анимации
		setTimeout(function(){
			arrayRight[param + numbs].classList.add('disable');
			arrayLeft[param + numbs].classList.add('disable');
			arrayRight[param + end].classList.add('active');
			arrayLeft[param + end].classList.add('active');
			arrayRight[param + end].classList.remove('disable');
			arrayLeft[param + end].classList.remove('disable');
			arrayRight[param + end].classList.remove('animation-slide');
			arrayLeft[param + end].classList.remove('animation-slide');
			sliderContRight.classList.remove("animation-rotates");
			sliderContLeft.classList.remove("animation-rotates");
			tabMenu[param + end].classList.add("click-tab");
			sliderStop = false;
		},700);
	}
}

function NewSlide(param) { // Функция для вызова следующего слайда
	if(!sliderStop){
		if(param == arrayLeft.length){
			addClass(indicator,-1, -arrayLeft.length);
			indicator = 0;
		} else
				addClass(indicator, -1, 0)
	}
}
function PrevSlide(param) { // Функция для вызова предыдущего слайда
	if(param == -1) {
		addClass(indicator, 1, arrayLeft.length);
		indicator = arrayLeft.length-1;
	} else
			addClass(indicator, 1, 0)
}

rightSlide = function () { // Обработчик события при нажатии на правую кнопку
	if(!sliderStop) {
		indicator++;
		NewSlide(indicator);
	}
}

leftSlide = function () { // Обработчик события при нажатии на левую кнопку
	if(!sliderStop) {
		indicator--;
		PrevSlide(indicator);
	}
}

// Функция для переключения слайдов по нажатию на табы (кнопки под блоками)
function ResetSlider(params) {
		if(!sliderStop) {
			sliderStop = true; // Устанавливаем что слайдер в работе
			// Добавление различных стилей к различным блокам
			arrayRight[indicator].classList.add('animation-slide');
			arrayLeft[indicator].classList.add('animation-slide');
			sliderContRight.classList.add("animation-rotates");
			sliderContLeft.classList.add("animation-rotates");
			tabMenu[indicator].classList.remove("click-tab");

			// Через 700 милисекунд устанавливаем нужные стили
			// Таким образом получается эффект анимации
			setTimeout(function() {
				arrayRight[indicator].classList.add('disable');
				arrayLeft[indicator].classList.add('disable');
				arrayRight[indicator].classList.remove('active');
				arrayLeft[indicator].classList.remove('active');
				arrayRight[params].classList.add('active');
				arrayLeft[params].classList.add('active');
				arrayRight[params].classList.remove('disable');
				arrayLeft[params].classList.remove('disable');
				arrayRight[params].classList.remove('animation-slide');
				arrayLeft[params].classList.remove('animation-slide');
				sliderContRight.classList.remove("animation-rotates");
				sliderContLeft.classList.remove("animation-rotates");
				tabMenu[params].classList.add("click-tab");
				sliderStop = false;
				indicator = params;
			},700);
		}
}

// Вызываем функцию переключения на нужный слайду
// при нажатии на соответсвующую кнопку под слайдером (три мелких квадратика)
tabMenu[0].onclick = function() {
	if(!sliderStop) // Если слайдер сейчас неактивный,
		ResetSlider(0); // то вызываем функцию для переключения слайда
}

// Аналогичные действия, но при нажатии на другие кнопки
tabMenu[1].onclick = function() {
	if(!sliderStop)
		ResetSlider(1);
}

tabMenu[2].onclick = function() {
	if(!sliderStop)
		ResetSlider(2);
}

// Добавляем обработчик события при нажатии на кнопку вправо/влево
leftButton.addEventListener("click", leftSlide);
rightButton.addEventListener("click" , rightSlide);
