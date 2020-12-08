'use strict';

const minute = document.querySelector('.minute');
const second = document.querySelector('.second');

let seconds = 0;
let hasGameStarted = 0;

const update = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
};

let timerStopped = false;
function measureTime() {
    if (hasGameStarted === 0) {
        hasGameStarted = 1;
        setInterval(function() {
            if (timerStopped) {
                return;
            }
            seconds++;
            showTime();
        }, 1000);
    };
};

function showTime() {
    minute.textContent = update(Math.floor(seconds / 60));
    second.textContent = update(seconds % 60);
};

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
        measureTime();
        
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
                const pointCounter = document.querySelector('.point__counter')
                pointCounter.textContent = `YOUR POINTS: ${points}`;
                flipped.forEach(card => card.classList.add('fixed'));
            }; 
        }; 

        // Check winning.

        const fixed = document.querySelectorAll('.card.fixed');
        if (fixed.length == 10) {
            timerStopped = true;
            seconds = 0;
            setTimeout( () => {
                cards.forEach(card => card.classList.remove('fixed'));
                showTime();
            }, 5000);
        }
        }; 


    cards.forEach(card => card.addEventListener('click', flipCard));
})();