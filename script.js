const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const taskInput = document.getElementById('task-input'); 
const dateInput = document.getElementById('date-input');


document.addEventListener('DOMContentLoaded', loadTasks);


todoForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const task = taskInput.value;  
    const date = dateInput.value;   

    if (task && date) {
        addTaskToList(task, date);
        saveTask(task, date);
        taskInput.value = '';      
        dateInput.value = '';       
    }
});


function addTaskToList(task, date) {
    const li = document.createElement('li'); 
    li.innerHTML = `
        ${date} - ${task} 
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    `;
    todoList.appendChild(li);

    
    li.querySelector('.delete').addEventListener('click', deleteTask);
    li.querySelector('.edit').addEventListener('click', editTask);
		
}


function saveTask(task, date) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // let instead of Let
    tasks.push({ task, date });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // let instead of Let
    tasks.forEach(taskObj => addTaskToList(taskObj.task, taskObj.date)); // Correct taskObj.date
}


function deleteTask(e) {
    const li = e.target.parentElement;  // Corrected assignment
    const task = li.innerText.split('-')[1].split('Edit')[0].trim();
    li.remove();

    let tasks = JSON.parse(localStorage.getItem('tasks')); // let instead of Let
    tasks = tasks.filter(taskObj => taskObj.task !== task); // Corrected assignment
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function editTask(e) {
    const li = e.target.parentElement; 
    const task = li.innerText.split('-')[1].split('Edit')[0].trim();
    const date = li.innerText.split('-')[0].trim();  

   
    taskInput.value = task;
    dateInput.value = date;

    deleteTask(e);  
}