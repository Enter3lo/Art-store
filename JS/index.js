
const loadingStates = [false, false, false, false]; // Массив для отслеживания состояния загрузки кнопок
let loadingIntervals = []; // Массив для хранения интервалов загрузки

function startLoading(button) {
    const isInCart = localStorage.getItem('productInCart');
    if (isInCart) {
        document.getElementById('buy-button').innerText = 'В корзине';
        document.getElementById('buy-button').style.backgroundColor = '#5B3A32'; // Меняем цвет кнопки, если в корзине
    }
    else {
        const buttonIndex = Array.from(document.querySelectorAll('.button-buy')).indexOf(button);

        if (loadingStates[buttonIndex]) return; // Если загрузка уже началась, ничего не делаем
        loadingStates[buttonIndex] = true; // Устанавливаем флаг загрузки для этой кнопки

        button.disabled = true; // Отключаем кнопку во время загрузки
        let dots = 0;

        // Запускаем анимацию точек
        loadingIntervals[buttonIndex] = setInterval(() => {
            dots = (dots + 1) % 4; // Меняем количество точек от 0 до 3
            button.innerText = 'Загрузка' + '.'.repeat(dots);
        }, 500); // Каждые 500 мс обновляем текст кнопки

        // Симуляция завершения загрузки через 5 секунд
        setTimeout(() => {
            clearInterval(loadingIntervals[buttonIndex]);
            button.innerText = 'В корзине';
            button.style.backgroundColor = '#5B3A32'; // Изменяем цвет кнопки
            button.disabled = false; // Включаем кнопку обратно
        }, 5000); // Загрузка длится 5 секунд
        updateButtonState()
    }
}