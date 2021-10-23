// time and date

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const dateOptions = {weekday: 'long', month: 'long', day: '2-digit'};

function showDate(){
    const dateInformation = new Date();
    const currentDate = dateInformation.toLocaleDateString('en-EN', dateOptions);
    date.textContent = currentDate;
}

function showTime(){
    const dateInformation = new Date();
    const currentTime = dateInformation.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    setTimeout(showTime, 1000);
}

showTime();

//greeting

const username = document.querySelector('.name')

function setLocalStorage() {
    localStorage.setItem(username, username.value);
}

function getLocalStorage() {
    if(localStorage.getItem(username)){
    username.value = localStorage.getItem(username);}
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);


const greeting = document.querySelector('.greeting');
let timeOfDay = '';

function getTimeOfDay(){
    const dateInformation = new Date();
    const hours = dateInformation.getHours();
    if(hours >= 6 && hours < 12){
        timeOfDay = 'morning';
    }
    else if(hours >= 12 && hours < 18){
        timeOfDay = 'afternoon';
    }
    else if(hours >= 18 && hours < 24){
        timeOfDay = 'evening';
    }
    else{
        timeOfDay = 'night';
    }
}


function showGreeting(){
    getTimeOfDay();
    let greetingMessage = `Good ${timeOfDay}`;
    greeting.textContent = greetingMessage;
    setTimeout(showGreeting, 1000);
}

showGreeting();

//background

let randomNumber = 0;
const body = document.querySelector('body');
const leftArrow = document.querySelector('.slide-prev');
const rightArrow = document.querySelector('.slide-next');


function getRandomNumber() {
    let min = Math.ceil(1);
    let max = Math.floor(20);
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomNumber();

function setBackgroundNumber() {
    backgroundNumber = randomNumber.toString().padStart(2,'0');
}

function setBackground(){
    setBackgroundNumber();
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/TusksAndTasks/stage1-tasks/assets/images/${timeOfDay}/${backgroundNumber}.jpg`;
    img.onload = () =>{
    body.style.backgroundImage = `url(${img.src})`;
    }; 
}

setBackground()

function getNextSlide(){
    if (randomNumber < 20){
        randomNumber = randomNumber + 1;
    } else{
        randomNumber = 1;
    }
    setBackground();
}

function getPrevSlide(){
    if (randomNumber > 1){
        randomNumber = randomNumber - 1; 
    } else {
        randomNumber = 20;
    }
    setBackground();
}

leftArrow.addEventListener('click', getPrevSlide);
rightArrow.addEventListener('click', getNextSlide);






