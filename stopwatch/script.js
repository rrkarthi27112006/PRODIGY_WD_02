let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const lapList = document.getElementById('lapList');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10); // Update every 10ms for milliseconds
        running = true;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10); // Get milliseconds (0-99)

    display.innerHTML = (hours < 10 ? "0" + hours : hours) + ":" +
                        (minutes < 10 ? "0" + minutes : minutes) + ":" +
                        (seconds < 10 ? "0" + seconds : seconds) + ":" +
                        (milliseconds < 10 ? "0" + milliseconds : milliseconds);
}

function pauseTimer() {
    clearInterval(tInterval);
    running = false;
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00:00";
    lapList.innerHTML = '';
    lapCount = 0;
}

function recordLap() {
    if (running) {
        lapCount++;
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((difference % 1000) / 10);
        
        const lapTime = (hours < 10 ? "0" + hours : hours) + ":" +
                        (minutes < 10 ? "0" + minutes : minutes) + ":" +
                        (seconds < 10 ? "0" + seconds : seconds) + ":" +
                        (milliseconds < 10 ? "0" + milliseconds : milliseconds);
        
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapList.appendChild(lapItem);
        
        // Auto-scroll to the latest lap
        lapList.scrollTop = lapList.scrollHeight;
    }
}

// Event Listeners
document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
document.getElementById('lapBtn').addEventListener('click', recordLap);

// Initialize display
display.innerHTML = "00:00:00:00";
