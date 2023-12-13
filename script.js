let countdownInterval;
let countdownTime;
let countdownPaused = true;
let pauseTimestamp;

function startCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    const minutesInput = document.getElementById("minutesInput");
    const countdownDisplay = document.getElementById("countdown");

    countdownTime = parseInt(minutesInput.value) * 60;
    pauseTimestamp = Date.now();

    updateCountdownDisplay(countdownDisplay);

    countdownInterval = setInterval(function () {
        if (countdownTime > 0 && !countdownPaused) {
            countdownTime--;
            updateCountdownDisplay(countdownDisplay);
        } else {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

function togglePlayPause() {
    const playBtn = document.getElementById("playBtn");
    const countdownDisplay = document.getElementById("countdown");
    const minutesInput = document.getElementById("minutesInput");

    if (countdownPaused) {
        countdownPaused = false;
        playBtn.style.backgroundImage = 'url("./icons8-pause-button-64.png")';
        startCountdown();
    } else {
        countdownPaused = true;
        playBtn.style.backgroundImage = 'url("./icons8-play-button-47.png")';
        clearInterval(countdownInterval);
        updateCountdownDisplay(countdownDisplay);
        pauseTimestamp = Date.now();
    }
}

function updateCountdownDisplay(displayElement) {
    const hours = Math.floor(countdownTime / 3600);
    const minutes = Math.floor((countdownTime % 3600) / 60);
    const seconds = countdownTime % 60;

    displayElement.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : `${time}`;
}

const minutesInput = document.getElementById("minutesInput");
minutesInput.addEventListener("change", function () {
    if (!countdownPaused) {
        startCountdown();
    }
});