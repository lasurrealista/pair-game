'use strict';

(function () {
    const shuffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };

    const icons = [
        'fa-crow',
        'fa-dog',
        'fa-frog',
        'fa-dragon',
        'fa-fish'
    ];

    const getCard = (icon) => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `<div class="front">
            <img src="./img/card-design.jpg" alt="">
            </div>
            <div class="back">
            <i class="fas ${icon}"></i>
            </div>`;
        return div;
    };

    const row1 = document.querySelector('.card__container .row:first-child');
    const row2 = document.querySelector('.card__container .row:last-child');
    const iconList = icons.concat(icons);

    shuffle(iconList);
    for (let i = 0; i < 10; i++) {
        if (i < 5) {
            row1.appendChild(getCard(iconList[i]));
        } else {
            row2.appendChild(getCard(iconList[i]));
        };
    };

    let points = 0;
    const cards = document.querySelectorAll('.card');

    let blockClick = false;

    const flipCard = (ev) => {
        if (!blockClick) {
            ev.currentTarget.classList.toggle('card--flipped');
        }
        const flipped = document.querySelectorAll('.card--flipped');
        if (flipped.length > 1) {
            blockClick = true;
            const to = setTimeout(() => {
                clearTimeout(to);
                cards.forEach(card => card.classList.remove('card--flipped'));
                blockClick = false;
            }, 1000);
            const cls = document.querySelector('.card--flipped i').className.split(' ').pop();
            if (document.querySelectorAll(`.card--flipped i.${cls}`).length > 1) {
                points++;
                flipped.forEach(card => card.classList.add('fixed'));
            }
        }
    };

    const timer = document.querySelector('.timer');
    const minute = document.querySelector('.minute');
    const second = document.querySelector('.second');
    let seconds = 0;

    const measureTime = setInterval(() => {
        minute.textContent = update(parseInt(seconds / 60));
        second.textContent = update(++seconds % 60);
    }, 1000);

    const update = (number) => {
        if (number < 10) { return '0' + number }
        else { return number };
    };

    cards.forEach(card => card.addEventListener('click', flipCard));
})();
