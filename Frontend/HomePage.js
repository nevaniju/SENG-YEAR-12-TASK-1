document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const taskList = document.getElementById("task-list");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskModal = document.getElementById("task-modal");
  const modalClose = document.querySelector(".close-btn");
  const taskForm = document.getElementById("task-form");
  const sortDropdown = document.getElementById("sort-options");
  const apiUrl = "http://localhost:3000/tasks"; // Backend API URL

  // Fetch tasks and display them
  const fetchTasks = async () => {
    try {
      const response = await fetch(apiUrl);
      const tasks = await response.json();

      taskList.innerHTML = ""; // Clear current list
      tasks.forEach((task) => {
        taskList.innerHTML += `
          <div class="task-item" data-id="${task.id}">
            <span class="task-name">${task.name}</span>
            <span class="task-due">${task.due_date}</span>
            <span class="task-category">${task.category}</span>
            <span class="task-priority">${task.priority}</span>
            <button class="edit-btn">✏️ Edit</button>
            <button class="delete-btn">❌ Delete</button>
          </div>
        `;
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Open Add Task Modal
  addTaskBtn.addEventListener("click", () => {
    taskModal.style.display = "block";
    taskForm.reset(); // Clear form fields
    taskForm.dataset.id = ""; // Reset task ID for new entries
  });

  // Close Modal
  modalClose.addEventListener("click", () => {
    taskModal.style.display = "none";
  });

  // Add or Edit Task
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const taskId = taskForm.dataset.id;
    const name = document.getElementById("task-name").value;
    const due_date = document.getElementById("due-date").value;
    const category = document.getElementById("category").value;
    const priority = document.getElementById("priority").value;

    if (!name || !due_date || !category || !priority) {
      alert("All fields are required.");
      return;
    }

    const taskData = { name, due_date, category, priority };
    const url = taskId ? `${apiUrl}/${taskId}` : apiUrl;
    const method = taskId ? "PUT" : "POST";

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      taskModal.style.display = "none";
      fetchTasks();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  });

  // Delete Task
  taskList.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const taskId = e.target.closest(".task-item").dataset.id;

      try {
        await fetch(`${apiUrl}/${taskId}`, { method: "DELETE" });
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }

    // Edit Task
    if (e.target.classList.contains("edit-btn")) {
      const taskElement = e.target.closest(".task-item");
      const taskId = taskElement.dataset.id;

      document.getElementById("task-name").value =
        taskElement.querySelector(".task-name").textContent;
      document.getElementById("due-date").value =
        taskElement.querySelector(".task-due").textContent;
      document.getElementById("category").value =
        taskElement.querySelector(".task-category").textContent;
      document.getElementById("priority").value =
        taskElement.querySelector(".task-priority").textContent;

      taskForm.dataset.id = taskId; // Set task ID for editing
      taskModal.style.display = "block";
    }
  });

  // Sort Tasks
  document.getElementById("sort-btn").addEventListener("click", () => {
    sortDropdown.style.display =
      sortDropdown.style.display === "block" ? "none" : "block";
  });

  document.querySelectorAll(".dropdown-item").forEach((option) => {
    option.addEventListener("click", () => {
      const sortType = option.dataset.sort;

      fetchTasks(sortType);
      sortDropdown.style.display = "none"; // Hide dropdown
    });
  });

  // Fetch tasks on page load
  fetchTasks();
});
