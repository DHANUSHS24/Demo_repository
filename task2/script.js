const todoList = document.getElementById('todo-list');
const addButton = document.getElementById('add-button');
const newTaskInput = document.getElementById('new-task');

// Load tasks from local storage
const savedTasks = JSON.parse(localStorage.getItem('todo-list')) || [];
loadTasks(savedTasks);

// Add a new task
addButton.addEventListener('click', () => {
  const newTask = newTaskInput.value.trim();

  if (newTask) {
    const taskItem = createTaskItem(newTask);
    todoList.appendChild(taskItem);
    savedTasks.push(taskItem.dataset.id);
    localStorage.setItem('todo-list', JSON.stringify(savedTasks));
    newTaskInput.value = '';
  }
});

// Mark a task as completed
todoList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-button')) {
    removeTask(event.target.parentElement);
  } else if (event.target.classList.contains('task-item')) {
    toggleCompleted(event.target);
  }
});

// Function to create a new task item
function createTaskItem(task) {
  const listItem = document.createElement('li');
  listItem.classList.add('task-item');
  listItem.dataset.id = Math.random().toString(36).substring(2, 15);
  listItem.innerHTML = `
    <span class="task-text">${task}</span>
    <button class="delete-button" style="background-color: #f44336; height: 25px; border-radius: 5px">Delete</button>`;
  return listItem;
}

// Function to load tasks from storage
function loadTasks(tasks) {
  tasks.forEach(task => {
    const taskItem = createTaskItem(task);
    todoList.appendChild(taskItem);
  });
}

// Function to remove a task item
function removeTask(taskItem) {
  taskItem.remove();
  const savedTasks = JSON.parse(localStorage.getItem('todo-list')); // Access and update localStorage
  const taskIndex = savedTasks.indexOf(taskItem.dataset.id);
  savedTasks.splice(taskIndex, 1);
  localStorage.setItem('todo-list', JSON.stringify(savedTasks));
}

// Function to toggle task completion
function toggleCompleted(taskItem) {
  taskItem.classList.toggle('completed');
}