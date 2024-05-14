// app.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('to-do-form');
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('to-do-list');



    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            saveTask(taskText);
            taskInput.value = '';
        }
    });

    function addTask(task) {
        const li = document.createElement('li');

        // Create task content
        const taskContent = document.createElement('span');
        taskContent.textContent = task;

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            li.remove();  // Remove the task element from the DOM
            removeTask(task);  // Remove the task from local storage
        });

        // Append content and button to the list item
        li.appendChild(taskContent);
        li.appendChild(deleteButton);

        // Append the list item to the task list
        taskList.appendChild(li);
    }

    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task));
    }
});
