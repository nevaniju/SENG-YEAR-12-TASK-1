// Select DOM elements
const modal = document.getElementById('task-modal');
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementById('close-modal');
const taskForm = document.getElementById('task-form');
const taskContainer = document.querySelector('.task-container');
const sortBtn = document.querySelector('.sort-btn');

// Open modal
openModalBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

// Close modal
closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Add task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const taskName = document.getElementById('task-name').value;
  const dueDate = document.getElementById('due-date').value;
  const priority = document.getElementById('priority-level').value;
  const category = document.getElementById('category').value;

  const taskHTML = `
    <div class="task-item">
      <p class="task-name"><strong>${taskName}</strong></p>
      <p class="task-details">Due: ${dueDate} | Priority: ${priority} | Category: ${category}</p>
    </div>
  `;

  taskContainer.insertAdjacentHTML('beforeend', taskHTML);
  document.querySelector('.placeholder').style.display = 'none';

  taskForm.reset();
  modal.classList.add('hidden');
});

// Sort tasks
sortBtn.addEventListener('click', () => {
  const tasks = [...document.querySelectorAll('.task-item')];

  tasks.sort((a, b) => {
    const aDate = new Date(a.querySelector('.task-details').textContent.match(/Due: (\d{4}-\d{2}-\d{2})/)[1]);
    const bDate = new Date(b.querySelector('.task-details').textContent.match(/Due: (\d{4}-\d{2}-\d{2})/)[1]);
    return aDate - bDate;
  });

  taskContainer.innerHTML = '';
  tasks.forEach(task => taskContainer.appendChild(task));
});
