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
