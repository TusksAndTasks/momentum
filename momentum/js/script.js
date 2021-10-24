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
    localStorage.setItem('name', username.value);
    localStorage.setItem('city', userCity.value);
}

function getLocalStorage() {
    if(localStorage.getItem('name')){
    username.value = localStorage.getItem('name');
    userCity.value = localStorage.getItem('city');}
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

//Weather

const weatherIcon = document.querySelector('.weather-icon');
const weatherDescription = document.querySelector('.weather-description');
const weatherTemperature = document.querySelector('.temperature');
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const userCity = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');

async function getWeatherReport(){
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity.value}&lang=en&appid=5cc23a006441156384f62c595fd1eae9&units=metric`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

      if(weatherResponse.ok){
    humidity.textContent = `Humidity: ${Math.round(weatherData.main.humidity)}%`;
    windSpeed.textContent = `Wind speed: ${Math.round(weatherData.wind.speed)} m/s`;
    weatherDescription.textContent = weatherData.weather[0].description;
    weatherTemperature.textContent = `${Math.round(weatherData.main.temp)}°C`;
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${weatherData.weather[0].id}`);
    weatherError.textContent = ``;
    } else  {
        weatherError.textContent = `Error! city not found for '${userCity.value}'!`
        humidity.textContent = ``;
        windSpeed.textContent = ``;
        weatherDescription.textContent = ``;
        weatherTemperature.textContent = ``;
        weatherIcon.className = 'weather-icon owf';
    }
}

getWeatherReport();

userCity.addEventListener('change', getWeatherReport)



