// Display username from login
document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem('username');
  document.getElementById('userName').textContent = username || 'User';
});

// Goal Modal
function showGoalForm() {
  document.getElementById('goalModal').style.display = 'flex';
}

function closeGoalForm() {
  document.getElementById('goalModal').style.display = 'none';
}

function addGoal() {
  const goalInput = document.getElementById('goalInput').value;
  if (goalInput && document.getElementById('goalsList').childElementCount < 5) {
    const goalItem = document.createElement('li');
    goalItem.textContent = goalInput;
    document.getElementById('goalsList').appendChild(goalItem);
    document.getElementById('goalInput').value = '';
    closeGoalForm();
  } else {
    alert("Maximum of 5 goals reached.");
  }
}

// Task Modal
function showTaskForm() {
  document.getElementById('taskModal').style.display = 'flex';
}

function closeTaskForm() {
  document.getElementById('taskModal').style.display = 'none';
}

function addTask() {
  const taskName = document.getElementById('taskName').value;
  const taskDate = document.getElementById('taskDate').value;
  const taskPriority = document.getElementById('taskPriority').value;
  const taskCategory = document.getElementById('taskCategory').value;

  const taskItem = document.createElement('li');
  taskItem.textContent = `${taskName} - ${taskDate} - ${taskPriority} - ${taskCategory}`;
  taskItem.className = `task-${taskPriority}`;
  document.getElementById('tasksList').appendChild(taskItem);

  closeTaskForm();
}

// Pomodoro Timer
let pomodoroTime = 25 * 60;
let breakTime = 5 * 60;
let timerInterval;

function startPomodoro() {
  clearInterval(timerInterval);
  let time = pomodoroTime;
  timerInterval = setInterval(() => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    document.getElementById('timerDisplay').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    time--;
    if (time < 0) {
      clearInterval(timerInterval);
      alert("Pomodoro complete!");
    }
  }, 1000);
}

// Stopwatch
let stopwatchTime = 0;
let stopwatchInterval;
let isStopwatchRunning = false;

function toggleStopwatch() {
  if (isStopwatchRunning) {
    clearInterval(stopwatchInterval);
    isStopwatchRunning = false;
  } else {
    stopwatchInterval = setInterval(() => {
      stopwatchTime++;
      let minutes = Math.floor(stopwatchTime / 60);
      let seconds = stopwatchTime % 60;
      document.getElementById('stopwatchDisplay').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
    isStopwatchRunning = true;
  }
}

// Sorting tasks by different attributes
function sortTasks() {
  let tasks = Array.from(document.getElementById('tasksList').children);
  let sortBy = document.getElementById('sortTasks').value;

  tasks.sort((a, b) => {
    let [aName, aDate, aPriority, aCategory] = a.textContent.split(" - ");
    let [bName, bDate, bPriority, bCategory] = b.textContent.split(" - ");

    if (sortBy === 'due-date') {
      return new Date(aDate) - new Date(bDate);
    } else if (sortBy === 'priority') {
      return ['low', 'medium', 'high'].indexOf(aPriority) - ['low', 'medium', 'high'].indexOf(bPriority);
    } else if (sortBy === 'category') {
      return aCategory.localeCompare(bCategory);
    }
  });

  document.getElementById('tasksList').innerHTML = '';
  tasks.forEach(task => document.getElementById('tasksList').appendChild(task));
}
