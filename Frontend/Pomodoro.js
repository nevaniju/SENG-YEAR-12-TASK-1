const pomodoroPage = document.getElementById("pomodoro-page");
const breakPage = document.getElementById("break-page");
const pomodoroTimerDisplay = document.getElementById("pomodoro-timer");
const breakTimerDisplay = document.getElementById("break-timer");

// Buttons
const startPomodoroBtn = document.getElementById("start-pomodoro");
const pausePomodoroBtn = document.getElementById("pause-pomodoro");
const breakButton = document.getElementById("break-button");

const startBreakBtn = document.getElementById("start-break");
const pauseBreakBtn = document.getElementById("pause-break");
const pomodoroButton = document.getElementById("pomodoro-button");

const backToHome = document.getElementById("back-to-home");
const backToHome2 = document.getElementById("back-to-home-2");

// timer Variables
let pomodoroTime = 25 * 60;
let breakTime = 5 * 60;
let pomodoroInterval, breakInterval;

// functions
function startTimer(timerDisplay, time, intervalVar, endCallback) {
  clearInterval(intervalVar);
  intervalVar = setInterval(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    if (time === 0) {
      clearInterval(intervalVar);
      endCallback();
    }
    time--;
  }, 1000);
  return intervalVar;
}

function stopTimer(intervalVar) {
  clearInterval(intervalVar);
}

// Poodoro Timer
startPomodoroBtn.addEventListener("click", () => {
  pomodoroInterval = startTimer(
    pomodoroTimerDisplay,
    pomodoroTime,
    pomodoroInterval,
    () => {
      alert("Your study period is over! Would you like to begin your break?");
      breakButton.click();
    }
  );
});

pausePomodoroBtn.addEventListener("click", () => {
  stopTimer(pomodoroInterval);
});

breakButton.addEventListener("click", () => {
  pomodoroPage.classList.add("hidden");
  breakPage.classList.remove("hidden");
});

// Break timer
startBreakBtn.addEventListener("click", () => {
  breakInterval = startTimer(
    breakTimerDisplay,
    breakTime,
    breakInterval,
    () => {
      alert("Your break is over! Would you like to return to your study session?");
      pomodoroButton.click();
    }
  );
});

pauseBreakBtn.addEventListener("click", () => {
  stopTimer(breakInterval);
});

pomodoroButton.addEventListener("click", () => {
  breakPage.classList.add("hidden");
  pomodoroPage.classList.remove("hidden");
});

// back Buttons
backToHome.addEventListener("click", () => {
  window.location.href = "home.html";
});

backToHome2.addEventListener("click", () => {
  window.location.href = "home.html";
});

pomodoroPage.classList.add("active");
