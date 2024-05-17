// script.js
let startTime;
let updatedTime;
let difference = 0; // Initialize difference to 0
let tInterval;
let running = false;
let lapCounter = 0;
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 10);
        startStopBtn.innerHTML = "Pause";
        running = true;
        startStopBtn.style.backgroundColor = "#ffc107";
    } else {
        clearInterval(tInterval);
        startStopBtn.innerHTML = "Start";
        running = false;
        startStopBtn.style.backgroundColor = "#28a745";
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0; // Reset difference to 0
    running = false;
    display.innerHTML = "00:00:00.0";
    startStopBtn.innerHTML = "Start";
    startStopBtn.style.backgroundColor = "#28a745";
    laps.innerHTML = '';
    lapCounter = 0;
}

function lap() {
    if (running) {
        const lapTime = document.createElement('div');
        lapCounter++;
        lapTime.innerHTML = `Lap ${lapCounter}: ${display.innerHTML}`;
        laps.appendChild(lapTime);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 100);

    display.innerHTML = 
        (hours < 10 ? "0" : "") + hours + ":" + 
        (minutes < 10 ? "0" : "") + minutes + ":" + 
        (seconds < 10 ? "0" : "") + seconds + "." + milliseconds;
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
