// JavaScript code for handling modals and form submissions
const openTaskModal = document.getElementById("openTaskModal");
const taskModal = document.getElementById("taskModal");
const closeTaskModal = document.getElementById("closeTaskModal");
const taskForm = document.getElementById("taskForm");

openTaskModal.onclick = () => { taskModal.style.display = "flex"; };
closeTaskModal.onclick = () => { taskModal.style.display = "none"; };
taskForm.onsubmit = (e) => {
    e.preventDefault();
    addTask();
    taskForm.reset();
    taskModal.style.display = "none";
};

// Adding tasks to the task list
function addTask() {
    const taskName = document.getElementById("taskName").value;
    const dueDate = document.getElementById("dueDate").value;
    const category = document.getElementById("category").value;
    const priority = document.getElementById("priority").value;

    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
        <div class="task-details">
            <strong>${taskName}</strong><br>
            Due: ${dueDate} | Priority: ${priority}<br>
            Category: ${category}
        </div>
        <div>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    `;
    document.getElementById("tasksList").appendChild(taskItem);
}

// Goal Modal
const openGoalModal = document.getElementById("openGoalModal");
const goalModal = document.getElementById("goalModal");
const closeGoalModal = document.getElementById("closeGoalModal");
const goalForm = document.getElementById("goalForm");

openGoalModal.onclick = () => { goalModal.style.display = "flex"; };
closeGoalModal.onclick = () => { goalModal.style.display = "none"; };
goalForm.onsubmit = (e) => {
    e.preventDefault();
    addGoal();
    goalForm.reset();
    goalModal.style.display = "none";
};

// Adding goals with a limit of 5
function addGoal() {
    if (document.getElementById("goalsList").children.length >= 5) {
        alert("Only 5 goals allowed!");
        return;
    }

    const goalText = document.getElementById("goalText").value;
    const goalItem = document.createElement("li");
    goalItem.textContent = goalText;
    document.getElementById("goalsList").appendChild(goalItem);
}
