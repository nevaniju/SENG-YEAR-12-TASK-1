// Select DOM elements
const modal = document.getElementById("task-modal");
const openModalBtn = document.getElementById("open-modal");
const closeModalBtn = document.getElementById("close-modal");
const taskForm = document.getElementById("task-form");
const taskContainer = document.querySelector(".task-container");
const sortBtn = document.querySelector(".sort-btn");

// Backend URL
const BACKEND_URL = "http://localhost:3000/tasks";

// Variables for editing mode
let isEditing = false;
let currentEditTaskId = null;

// Open modal
openModalBtn.addEventListener("click", () => {
  isEditing = false; // Reset editing mode
  currentEditTaskId = null;
  taskForm.reset();
  modal.classList.remove("hidden");
});

// Close modal
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Fetch tasks from the backend
const loadTasks = async () => {
  try {
    const response = await fetch(BACKEND_URL);
    const tasks = await response.json();
    taskContainer.innerHTML = ""; // Clear current tasks

    if (tasks.length === 0) {
      taskContainer.innerHTML = `<p class="placeholder">Add Your First Task!</p>`;
    } else {
      tasks.forEach((task) => {
        const taskHTML = `
          <div class="task-item" data-id="${task.id}">
            <div>
              <p class="task-name"><strong>${task.name}</strong></p>
              <p class="task-details">Due: ${task.due_date} | Priority: ${task.priority} | Category: ${task.category}</p>
            </div>
            <div class="task-actions">
              <button class="btn edit-task-btn" data-id="${task.id}">Edit</button>
              <button class="btn delete-task-btn" data-id="${task.id}">Delete</button>
            </div>
          </div>
        `;
        taskContainer.insertAdjacentHTML("beforeend", taskHTML);
      });

      // Add event listeners for edit and delete buttons
      document.querySelectorAll(".edit-task-btn").forEach((button) => {
        button.addEventListener("click", openEditTask);
      });
      document.querySelectorAll(".delete-task-btn").forEach((button) => {
        button.addEventListener("click", deleteTask);
      });
    }
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
};

// Add task or edit existing task
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const taskName = document.getElementById("task-name").value;
  const dueDate = document.getElementById("due-date").value;
  const priority = document.getElementById("priority-level").value;
  const category = document.getElementById("category").value;

  try {
    if (isEditing) {
      // Update task
      await fetch(`${BACKEND_URL}/${currentEditTaskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: taskName, due_date: dueDate, priority, category }),
      });
    } else {
      // Add new task
      await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: taskName, due_date: dueDate, priority, category }),
      });
    }

    loadTasks(); // Refresh tasks
    taskForm.reset();
    modal.classList.add("hidden");
  } catch (error) {
    console.error("Error adding/editing task:", error);
  }
});

// Delete task
const deleteTask = async (e) => {
  const taskId = e.target.dataset.id;
  try {
    await fetch(`${BACKEND_URL}/${taskId}`, { method: "DELETE" });
    loadTasks(); // Refresh tasks
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

// Open modal to edit task
const openEditTask = async (e) => {
  const taskId = e.target.dataset.id;

  try {
    const response = await fetch(`${BACKEND_URL}/${taskId}`);
    const task = await response.json();

    // Fill modal form with task details
    document.getElementById("task-name").value = task.name;
    document.getElementById("due-date").value = task.due_date;
    document.getElementById("priority-level").value = task.priority;
    document.getElementById("category").value = task.category;

    isEditing = true;
    currentEditTaskId = taskId;

    modal.classList.remove("hidden");
  } catch (error) {
    console.error("Error fetching task:", error);
  }
};

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);
