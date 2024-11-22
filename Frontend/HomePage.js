document.getElementById("add-task-btn").addEventListener("click", function() {
  document.getElementById("task-modal").style.display = "block";
});

document.getElementById("task-form").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const taskName = document.getElementById("task-name").value;
  const dueDate = document.getElementById("due-date").value;
  const category = document.getElementById("category").value;
  const priority = document.getElementById("priority").value;
  
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");
  taskItem.innerHTML = `
      <span>${taskName} - ${dueDate} - ${category} - ${priority}</span>
      <button class="edit-btn">✏️</button>
      <button class="delete-btn">❌</button>
  `;
  
  document.getElementById("task-list").appendChild(taskItem);
  
  taskItem.querySelector(".edit-btn").addEventListener("click", function() {
      // the code to edit taks (ill add it later)
  });
  
  taskItem.querySelector(".delete-btn").addEventListener("click", function() {
      taskItem.remove();
  });

  document.getElementById("task-modal").style.display = "none";
  document.getElementById("task-form").reset();
});

document.querySelector(".close-btn").addEventListener("click", function() {
  document.getElementById("task-modal").style.display = "none";
});
