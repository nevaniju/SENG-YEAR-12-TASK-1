// Toggle between Sign Up and Login Forms
function toggleAuthForm() {
    document.getElementById('signUpForm').style.display = document.getElementById('signUpForm').style.display === 'none' ? 'block' : 'none';
    document.getElementById('loginForm').style.display = document.getElementById('loginForm').style.display === 'none' ? 'block' : 'none';
}

// Store user info and display the Welcome Section
function signUp() {
    const displayName = document.getElementById('displayName').value;
    localStorage.setItem('displayName', displayName);
    showWelcomeSection(displayName);
}

function logIn() {
    const loginDisplayName = document.getElementById('loginDisplayName').value;
    const savedDisplayName = localStorage.getItem('displayName');
    
    if (loginDisplayName === savedDisplayName) {
        showWelcomeSection(loginDisplayName);
    } else {
        alert('User not found.');
    }
}

function showWelcomeSection(displayName) {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('welcomeSection').style.display = 'block';
    document.getElementById('mainContainer').style.display = 'block';
    document.getElementById('welcomeMessage').textContent = `Welcome, ${displayName}! Let's organize your day!`;
}

// Task and Pomodoro Timer Logic
function openTaskModal() {
    document.getElementById('taskModal').style.display = 'block';
}

function closeTaskModal() {
    document.getElementById('taskModal').style.display = 'none';
}

function addTask() {
    const taskInput = document.getElementById('newTaskInput').value;
    const taskCategory = document.getElementById('taskCategory').value;
    const taskPriority = document.getElementById('taskPriority').value;
    // Add task to UI
    const taskCards = document.getElementById('taskCards');
    const newTaskCard = document.createElement('div');
    newTaskCard.className = 'task-card';
    newTaskCard.innerHTML = `<p>${taskInput} - ${taskCategory} (${taskPriority})</p>`;
    taskCards.appendChild(newTaskCard);
    closeTaskModal();
}

// Pomodoro Timer
let timerInterval;
function startPomodoro() {
    let timer = 25 * 60;
    document.getElementById('pomodoroSection').style.display = 'block';
    timerInterval = setInterval(() => {
        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;
        document.getElementById('pomodoroTimer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timer--;
        if (timer < 0) clearInterval(timerInterval);
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('pomodoroTimer').textContent = '25:00';
}
