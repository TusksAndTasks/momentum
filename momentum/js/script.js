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
    const currentTime = dateInformation.toLocaleTimeString('ru-RU');
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
let backgroundNumber = 0;
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

//quotes
const quote = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');
const changeQuoteButton = document.querySelector('.change-quote');


async function getQuote(){
    const quoteUrl = `https://type.fit/api/quotes`;
    const quoteResponse = await fetch(quoteUrl);
    const quoteData = await quoteResponse.json();
    let randomQuoteNumber = Math.floor(Math.random() * 1463);

    quote.textContent = quoteData[randomQuoteNumber].text;
    quoteAuthor.textContent = quoteData[randomQuoteNumber].author;
}

getQuote();

changeQuoteButton.addEventListener('click', getQuote);

//audio


const playList = [
    {      
      title: 'Aqua Caelestis',
      src: '../momentum/assets/sounds/Aqua Caelestis.mp3',
      duration: '00:39'
    },
    {
      title: 'Ennio Morricone',
      src: '../momentum/assets/sounds/Ennio Morricone.mp3',
      duration: '01:37'
    },  
    {      
      title: 'River Flows In You',
      src: '../momentum/assets/sounds/River Flows In You.mp3',
      duration: '01:38'
    },
    {
      title: 'Summer Wind',
      src: '../momentum/assets/sounds/Summer Wind.mp3',
      duration: '01:50' 
    }
  ]

let audioNumber = 0;
const audio = new Audio();
let isPlay = false;
const playButton = document.querySelector('.play');
let currentTime = 0;
const prevPlay = document.querySelector('.play-prev');
const nextPlay = document.querySelector('.play-next');
const audioPlaylist = document.querySelector('.play-list');

function createPlaylist(){
    for(let i = 0; i < playList.length; i++) {
        const audioList = document.createElement('li');
        audioList.classList.add('play-item');
        audioList.textContent = playList[i].title;
        audioPlaylist.append(audioList);
      }
}

createPlaylist();

const audioActiveItem = document.querySelectorAll('.play-item');

function playAudio() {
audio.src = playList[audioNumber].src;
audio.currentTime = currentTime;
audio.play();
isPlay = true;
toggleButton();
audioActiveItem[audioNumber].classList.add('item-active');
}

function pauseAudio() {
    currentTime = audio.currentTime;
    audio.pause();
    isPlay = false;
    toggleButton();
}


function toggleButton(){
    if (isPlay){
        playButton.classList.add('pause');
    } else {
        playButton.classList.remove('pause');
    }
}

function togglePlay(){
 if (isPlay){
     pauseAudio();
 } else {
     playAudio();
 }
}

function nextAudio(){
    audioActiveItem[audioNumber].classList.remove('item-active');
    if(audioNumber === 3){
        audioNumber = 0;
    } else{
        audioNumber = audioNumber + 1;
    }
    audio.currentTime = 0;
    pauseAudio();
    getAudioData();
}

function prevAudio(){
    audioActiveItem[audioNumber].classList.remove('item-active');
    if(audioNumber === 0){
        audioNumber = 3;
    } else{
        audioNumber = audioNumber - 1;
    }
    audio.currentTime = 0;
    pauseAudio();
    getAudioData();
}

function checkForEnding() {
    if(audio.currentTime === audio.duration){
        nextAudio();
        togglePlay();
    }
}



audio.addEventListener('pause', checkForEnding);
playButton.addEventListener('click', togglePlay);      
prevPlay.addEventListener('click', prevAudio);
nextPlay.addEventListener('click', nextAudio);

//audio-pro

const audioTitle = document.querySelector('.audio-title');
const audioDuration = document.querySelector('.duration');
const audioCurrentTime = document.querySelector('.current-time');
const audioProgressBar = document.querySelector('.progress-big');
let mousedown = false;
const volumeButton = document.querySelector('.volume');
const volumeBar = document.querySelector('.progress-small');
const smallPlays = document.querySelectorAll('.small-play');

function transformCurrentTime(){
    let minutes = Math.floor(audio.currentTime / 60).toString().padStart(2, 0);
    let seconds = Math.floor(audio.currentTime - (minutes * 60)).toString().padStart(2, 0);
    audioCurrentTime.textContent = `${minutes}:${seconds}`;
    setTimeout(transformCurrentTime, 300);
}

transformCurrentTime();

function getAudioData(){
    audioTitle.textContent = playList[audioNumber].title;
    audioDuration.textContent = playList[audioNumber].duration;
}

getAudioData();

function handleProgress() {
    let percent = (audio.currentTime / audio.duration) * 100;
    if (isNaN(percent)){
       percent = 0;
       audioProgressBar.style.background = `linear-gradient(to right, #2370a3 0%, #2370a3 ${percent}%, #C4C4C4 ${percent}%, #C4C4C4 100%)`;
    }
    else {audioProgressBar.style.background = `linear-gradient(to right, #2370a3 0%, #2370a3 ${percent}%, #C4C4C4 ${percent}%, #C4C4C4 100%)`;}
 }
  
 function scrub (e) {
    currentTime = (e.offsetX / audioProgressBar.offsetWidth) * audio.duration;
    audio.currentTime = currentTime;
 }


 function handleRangeUpdate(){
    audio.volume = volumeBar.value;
    let volumeValue = volumeBar.value * 100;
    this.style.background = `linear-gradient(to right, #2370a3 0%, #2370a3 ${volumeValue}%, #C4C4C4 ${volumeValue}%, #C4C4C4 100%)`
  };
  
  function updateVolumeButton() {
     if (audio.volume === 0){
        volumeButton.style.backgroundImage = 'url(../momentum/assets/svg/mute.svg)';
     }
     else {
        volumeButton.style.backgroundImage = 'url(../momentum/assets/svg/volume.svg)';
     }
  }

  function toggleVolume(){
    if (audio.volume === 0){
        audio.volume = 0.5;
        updateVolumeButton();
    } else {
        audio.volume = 0;
        updateVolumeButton();
    }
  }


smallPlays[0].onclick = function(){
    if(isPlay && audioNumber === 0){
        pauseAudio();
    } 
    else if (!isPlay && audioNumber === 0){
        playAudio();
    } else {
    pauseAudio();
    audioActiveItem[audioNumber].classList.remove('item-active');
    audioNumber = 0;
    currentTime = 0;
    getAudioData();
    playAudio();
}
};
smallPlays[1].onclick = function(){
    if(isPlay && audioNumber === 1){
        pauseAudio();
    }   
    else if (!isPlay && audioNumber === 1){
        playAudio();
   } else {
   pauseAudio();
   audioActiveItem[audioNumber].classList.remove('item-active');
   audioNumber = 1;
   currentTime = 0;
   getAudioData();
   playAudio();
}
};
smallPlays[2].onclick = function(){
    if(isPlay && audioNumber === 2){
        pauseAudio();
    }   
    else if (!isPlay && audioNumber === 2){
        playAudio();
   } else {
   pauseAudio();
   audioActiveItem[audioNumber].classList.remove('item-active');
   audioNumber = 2;
   currentTime = 0;
   getAudioData();
   playAudio();
}
};
smallPlays[3].onclick = function(){
    if(isPlay && audioNumber === 3){
        pauseAudio();
    }   
    else if (!isPlay && audioNumber === 3){
        playAudio();
   } else {
   pauseAudio();
   audioActiveItem[audioNumber].classList.remove('item-active');
   audioNumber = 3;
   currentTime = 0;
   getAudioData();
   playAudio();
}
};

 audio.addEventListener('timeupdate', handleProgress);
 audioProgressBar.addEventListener('click', scrub);
 audioProgressBar.addEventListener('mousedown', () => mousedown = true);
 audioProgressBar.addEventListener('mouseup', () => mousedown = false);
 audioProgressBar.addEventListener('mousemove', (e) => mousedown && scrub(e));
 volumeBar.addEventListener('change', handleRangeUpdate);
 volumeBar.addEventListener('mousemove', handleRangeUpdate);
 volumeBar.addEventListener('touchmove', handleRangeUpdate);
 volumeBar.addEventListener('change', updateVolumeButton);
 volumeBar.addEventListener('mousemove', updateVolumeButton);
 volumeBar.addEventListener('touchmove', updateVolumeButton);
 volumeButton.addEventListener('click', toggleVolume);
 
// Translator

async function getRussianQuotes(){
const ruQuotes = 'quotes.json';
const ruResponse = await fetch(ruQuotes);
const ruQuoteData = await ruResponse.json(); 
let randomRuNumber = Math.floor(Math.random() * 23);

quote.textContent = ruQuoteData[randomRuNumber].text;
quoteAuthor.textContent = ruQuoteData[randomRuNumber].author;
}
