// Display username from login
document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem('username');
    document.getElementById('userName').textContent = username || 'User';
  });
  
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
    document.getElementById('goalsList').appendChild(taskItem);
  
    closeTaskForm();
    document.getElementById('taskName').value = '';
    document.getElementById('taskDate').value = '';
  }
  
  // Add goals (max 5)
  function addGoal() {
    const goalsList = document.getElementById('goalsList');
    if (goalsList.childElementCount < 5) {
      const goalItem = document.createElement('li');
      goalItem.textContent = "Goal " + (goalsList.childElementCount + 1);
      goalsList.appendChild(goalItem);
    } else {
      alert("Maximum of 5 goals reached.");
    }
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
        if (confirm("Pomodoro complete! Start 5-minute break?")) startBreak();
      }
    }, 1000);
  }
  
  function startBreak() {
    clearInterval(timerInterval);
    let time = breakTime;
    timerInterval = setInterval(() => {
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      document.getElementById('timerDisplay').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      time--;
      if (time < 0) {
        clearInterval(timerInterval);
        alert("Break complete!");
      }
    }, 1000);
  }
  