'use strict';

const timer = document.querySelector('.timer');
const minute = document.querySelector('.minute');
const second = document.querySelector('.second');

const cards = document.querySelectorAll('.card');

let seconds = 0;

const measureTime = setInterval( () => {
    minute.textContent = update(parseInt(seconds / 60));
    second.textContent = update(++seconds % 60);
}, 1000);

const update = (number) => {
    if (number < 10) { return '0' + number } 
    else {return number};
};


