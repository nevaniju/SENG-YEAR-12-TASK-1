const tabs = document.querySelectorAll('.tab');
const timerTitle = document.getElementById('timer-title');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const backHome = document.getElementById('back-home');

let timerDuration = 25 * 60; // just because default is 25 minutes
let interval;
let remainingTime = timerDuration;

const timers = {
  pomodoro: { title: 'Pomodoro Timer', duration: 25 * 60 },
  'short-break': { title: 'Short Break Timer', duration: 5 * 60 },
  'long-break': { title: 'Long Break Timer', duration: 15 * 60 },
};

// Switch tabs
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    // Highlight active tab
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    // Update timer
    const timerType = tab.dataset.timer;
    const { title, duration } = timers[timerType];
    timerTitle.textContent = title;
    timerDuration = duration;
    remainingTime = duration;

    // Reset display and stop interval
    clearInterval(interval);
    updateTimerDisplay();
  });
});

// Start Timer
startButton.addEventListener('click', () => {
  clearInterval(interval);
  interval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateTimerDisplay();
    } else {
      clearInterval(interval);
      alert(`${timerTitle.textContent} Complete!`);
    }
  }, 1000);
});

// Pause Timer
pauseButton.addEventListener('click', () => {
  clearInterval(interval);
});

// Back to Home
backHome.addEventListener('click', () => {
  window.location.href = 'home.html';
});

// Update Timer Display
function updateTimerDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered with scope: ", registration.scope);
      })
      .catch((err) => {
        console.error("Service Worker registration failed: ", err);
      });
  });
}

// Initialize Default Timer
updateTimerDisplay();
