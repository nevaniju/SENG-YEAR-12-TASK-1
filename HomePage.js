// Save user's name and show welcome message
function saveName() {
    const name = document.getElementById('userName').value;
    if (name) {
        localStorage.setItem('userName', name);
        document.getElementById('nameInputSection').style.display = 'none';
        displayMainApp();
    } else {
        alert('Please enter your name');
    }
}

// Display main app content
function displayMainApp() {
    const name = localStorage.getItem('userName');
    if (name) {
        document.getElementById('welcomeMessage').innerText = `Bonjour, ${name}, ready to conquer your day?`;
        document.getElementById('heroSection').style.display = 'block';
        document.getElementById('mainContainer').style.display = 'block';
        document.getElementById('addTaskBtn').style.display = 'block';
        document.getElementById('navbar').style.display = 'flex';
    }
}

// Open the task modal
function openTaskModal() {
    document.getElementById('taskModal').style.display = 'flex';
}

// Close the task modal
function closeTaskModal() {
    document.getElementById('taskModal').style.display = 'none';
}

// Add a new task
function addTask() {
     taskName = document.getElementById('newTaskInput').value;
     priority = document.getElementById('taskPriority').value;

    if (taskName) {
        const taskCards = document.getElementById('taskCards');
        const focusList = document.getElementById('focusList');

        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        taskCard.innerHTML = `
            <h3>${taskName}</h3>
            <div class="task-controls">
                <span class="priority">${priority}</span>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        `;
        taskCards.appendChild(taskCard);

        const focusTask = document.createElement('li');
        focusTask.innerText = taskName;
        focusList.appendChild(focusTask);

        document.getElementById('newTaskInput').value = '';
        closeTaskModal();
    } else {
        alert('Please enter a task');
    }
}

// Load name and tasks on page load
window.onload = function() {
    if (localStorage.getItem('userName')) {
        displayMainApp();
    }
};
