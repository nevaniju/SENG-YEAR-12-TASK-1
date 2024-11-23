// Toggle Sort Dropdown
document.getElementById("sort-btn").addEventListener("click", () => {
  const dropdown = document.getElementById("sort-options");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

// Handle Add Task Modal
document.getElementById("add-task-btn").addEventListener("click", () => {
  document.getElementById("task-modal").style.display = "block";
});

document.querySelector(".close-btn").addEventListener("click", () => {
  document.getElementById("task-modal").style.display = "none";
});

// Add Task
document.getElementById("task-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("task-name").value;
  const dueDate = document.getElementById("due-date").value;
  const category = document.getElementById("category").value;
  const priority = document.getElementById("priority").value;

  const taskList = document.getElementById("task-list");

  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");
  taskItem.innerHTML = `
      <div class="task-details">
          <span>${name}</span>
          <span>${dueDate}</span>
          <span>${category}</span>
          <span>${priority}</span>
      </div>
      <div class="task-actions">
          <button class="edit-btn">✏️</button>
          <button class="delete-btn">❌</button>
      </div>
  `;

  taskList.appendChild(taskItem);

  // Clear modal and hide it
  document.getElementById("task-form").reset();
  document.getElementById("task-modal").style.display = "none";

  // Add event listeners to the new task
  addTaskEventListeners(taskItem);
});

// Add Event Listeners to Task Actions
function addTaskEventListeners(taskItem) {
  // Delete Task
  taskItem.querySelector(".delete-btn").addEventListener("click", () => {
      taskItem.remove();
  });

  // Edit Task
  taskItem.querySelector(".edit-btn").addEventListener("click", () => {
      const details = taskItem.querySelectorAll(".task-details span");
      document.getElementById("task-name").value = details[0].innerText;
      document.getElementById("due-date").value = details[1].innerText;
      document.getElementById("category").value = details[2].innerText.toLowerCase();
      document.getElementById("priority").value = details[3].innerText.toLowerCase();

      // Show modal for editing
      document.getElementById("task-modal").style.display = "block";

      // Remove the old task after editing
      taskItem.remove();
  });
}

// Sort Tasks
const sortOptions = document.querySelectorAll(".dropdown-item");
sortOptions.forEach(option => {
  option.addEventListener("click", () => {
      const sortType = option.getAttribute("data-sort");
      sortTasks(sortType);
      document.getElementById("sort-options").style.display = "none";
  });
});

function sortTasks(sortType) {
  const tasks = Array.from(document.querySelectorAll(".task-item"));
  const taskList = document.getElementById("task-list");

  tasks.sort((a, b) => {
      const aDetails = a.querySelectorAll(".task-details span");
      const bDetails = b.querySelectorAll(".task-details span");

      switch (sortType) {
          case "due-date":
              return new Date(aDetails[1].innerText) - new Date(bDetails[1].innerText);
          case "priority":
              const priorityMap = { high: 1, medium: 2, low: 3 };
              return priorityMap[aDetails[3].innerText.toLowerCase()] - priorityMap[bDetails[3].innerText.toLowerCase()];
          case "category":
              return aDetails[2].innerText.localeCompare(bDetails[2].innerText);
          default:
              return 0;
      }
  });

  // Re-add sorted tasks to the list
  taskList.innerHTML = "";
  tasks.forEach(task => taskList.appendChild(task));
}

document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.querySelector(".task-list");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskModal = document.querySelector(".task-modal");
  const modalClose = document.querySelector(".close-modal");
  const saveTaskBtn = document.getElementById("saveTask");
  const sortDropdown = document.querySelector("#sortDropdown");

  const apiUrl = "http://localhost:3000/tasks"; // Backend API URL

  // Fetch tasks and display them
  const fetchTasks = async () => {
    const response = await fetch(apiUrl);
    const tasks = await response.json();

    taskList.innerHTML = "";
    tasks.forEach((task) => {
      taskList.innerHTML += `
        <div class="task" data-id="${task.id}">
          <span>${task.name}</span>
          <span>${task.due_date}</span>
          <span>${task.category}</span>
          <span>${task.priority}</span>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
    });
  };

  // Open Add Task Modal
  addTaskBtn.addEventListener("click", () => {
    taskModal.style.display = "block";
  });

  // Close Modal
  modalClose.addEventListener("click", () => {
    taskModal.style.display = "none";
  });

  // Add or Edit Task
  saveTaskBtn.addEventListener("click", async () => {
    const taskId = saveTaskBtn.dataset.id; // If editing, this will have a value
    const name = document.getElementById("taskName").value;
    const due_date = document.getElementById("taskDueDate").value;
    const category = document.getElementById("taskCategory").value;
    const priority = document.getElementById("taskPriority").value;

    const taskData = { name, due_date, category, priority };

    if (taskId) {
      // Edit Task
      await fetch(`${apiUrl}/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
    } else {
      // Add Task
      await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
    }

    taskModal.style.display = "none";
    fetchTasks();
  });

  // Delete Task
  taskList.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const taskId = e.target.closest(".task").dataset.id;
      await fetch(`${apiUrl}/${taskId}`, { method: "DELETE" });
      fetchTasks();
    }

    if (e.target.classList.contains("edit-btn")) {
      const taskElement = e.target.closest(".task");
      const taskId = taskElement.dataset.id;

      // Pre-fill modal for editing
      const taskData = {
        name: taskElement.children[0].textContent,
        due_date: taskElement.children[1].textContent,
        category: taskElement.children[2].textContent,
        priority: taskElement.children[3].textContent,
      };

      document.getElementById("taskName").value = taskData.name;
      document.getElementById("taskDueDate").value = taskData.due_date;
      document.getElementById("taskCategory").value = taskData.category;
      document.getElementById("taskPriority").value = taskData.priority;

      saveTaskBtn.dataset.id = taskId; // Set ID for editing
      taskModal.style.display = "block";
    }
  });

  // Fetch tasks on page load
  fetchTasks();
});
