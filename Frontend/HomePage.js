// Get elements
const addTaskBtn = document.getElementById('addTaskBtn');
const taskModal = document.getElementById('taskModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

// Show the modal
function openModal() {
  taskModal.style.display = 'flex';
}

// Hide the modal
function closeModal() {
  taskModal.style.display = 'none';
}

// Add task to list
function addTask(taskName, dueDate, category, priority) {
  const li = document.createElement('li');
  li.innerHTML = `
    <strong>${taskName}</strong> (Due: ${dueDate}) - ${category} - Priority: ${priority}
    <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
  `;

  // Append the new task to the task list
  taskList.appendChild(li);
}

// Delete task
function deleteTask(button) {
  const taskItem = button.parentElement;
  taskList.removeChild(taskItem);
}

// Event listeners
addTaskBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

// Handle task form submission
taskForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const taskName = document.getElementById('taskName').value;
  const dueDate = document.getElementById('dueDate').value;
  const category = document.getElementById('category').value;
  const priority = document.getElementById('priority').value;

  // Add task to the list
  addTask(taskName, dueDate, category, priority);

  // Clear the form and close the modal
  taskForm.reset();
  closeModal();
});
