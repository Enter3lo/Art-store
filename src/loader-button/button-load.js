// Глобальные массивы и переменные
window.loadingStates = [false, false, false, false];
window.loadingIntervals = [];

// Глобальная функция для обновления состояния кнопок
window.updateButtonState = function () {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const buyButtons = document.querySelectorAll('.button-buy');

    buyButtons.forEach((button, index) => {
        if (cartItems.includes(index)) {
            button.innerText = 'В корзине';
            const image = document.createElement('img');
            image.src = '/images/icon-chek.svg';
            image.alt = 'галочка';
            button.appendChild(image);
            button.style.backgroundColor = '#5B3A32';
            button.disabled = false;
            window.loadingStates[index] = false;
        }
    });
};

// Глобальная функция для начала загрузки
window.startLoading = function (button) {
    const buttonIndex = Array.from(document.querySelectorAll('.button-buy')).indexOf(button);
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartItems.includes(buttonIndex)) {
        button.innerText = 'В корзине';
        const image = document.createElement('img');
        image.src = '/images/icon-chek.svg';
        image.alt = 'галочка';
        button.appendChild(image);
        button.style.backgroundColor = '#5B3A32';
        return;
    }

    if (window.loadingStates[buttonIndex]) return;
    window.loadingStates[buttonIndex] = true;

    button.disabled = true;
    let dots = 0;

    window.loadingIntervals[buttonIndex] = setInterval(() => {
        dots = (dots + 1) % 4;
        button.innerText = 'Загрузка' + '.'.repeat(dots);
    }, 500);

    setTimeout(() => {
        clearInterval(window.loadingIntervals[buttonIndex]);
        button.innerText = 'В корзине';
        const image = document.createElement('img');
        image.src = '/images/icon-chek.svg';
        image.alt = 'галочка';
        button.appendChild(image);

        button.style.backgroundColor = '#5B3A32';
        if (!cartItems.includes(buttonIndex)) {
            cartItems.push(buttonIndex);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }

        button.disabled = false;
        alert("Товар был успешно добавлен в корзину");
    }, 5000);
};

// Глобальная функция для сброса кнопок
window.resetButtons = function () {
    localStorage.removeItem('cartItems');
    window.updateButtonState();
    alert("Состояние кнопок было сброшено. Пожалуйста перезагрузите страницу");
};

// Обновление состояния кнопок при загрузке страницы
window.onload = window.updateButtonState;