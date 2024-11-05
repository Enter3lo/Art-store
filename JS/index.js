
const loadingStates = [false, false, false, false]; // Массив для отслеживания состояния загрузки кнопок
let loadingIntervals = []; // Массив для хранения интервалов загрузки

// Функция для обновления состояния кнопки на основе localStorage
function updateButtonState() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const buyButtons = document.querySelectorAll('.button-buy');

    buyButtons.forEach((button, index) => {
        if (cartItems.includes(index)) {
            button.innerText = 'В корзине';
            const image = document.createElement('img');
            image.src = '/images/icon-chek.svg';
            image.alt = 'галочка';
            button.appendChild(image);
            button.style.backgroundColor = '#5B3A32'; // Меняем цвет кнопки, если в корзине
            button.disabled = false; // Включаем кнопку обратно
            loadingStates[index] = false; // Сбрасываем состояние загрузки
        }
    });
}

function startLoading(button) {
    const buttonIndex = Array.from(document.querySelectorAll('.button-buy')).indexOf(button);
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartItems.includes(buttonIndex)) {
        button.innerText = 'В корзине';
        button.style.backgroundColor = '#5B3A32'; // Меняем цвет кнопки, если в корзине
        return; // Если товар уже в корзине, ничего не делаем
    }

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
        const image = document.createElement('img');
        image.src = '/images/icon-chek.svg';
        image.alt = 'галочка';
        button.appendChild(image);

        button.style.backgroundColor = '#5B3A32'; // Изменяем цвет кнопки

        // Обновляем состояние localStorage
        if (!cartItems.includes(buttonIndex)) {
            cartItems.push(buttonIndex);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }

        button.disabled = false; // Включаем кнопку обратно
        alert("Товар был успешно добавлен в корзину");
    }, 5000); // Загрузка длится 5 секунд
}

// При загрузке страницы обновляем состояние кнопок
window.onload = updateButtonState;


function resetButtons() {
    // Очищаем localStorage и сбрасываем состояние кнопок
    localStorage.removeItem('cartItems');
    updateButtonState(); // Обновляем состояние кнопок
    alert("Состояние кнопок было сброшено. Пожалуйста перезагрузите страницу");
}