// app.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('to-do-form');
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('to-do-list');

    // Load tasks from local storage
    loadTasks();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText, false);
            saveTask(taskText, false);
            taskInput.value = '';
        }
    });

    function addTask(task, crossedOff) {
        const li = document.createElement('li');

        // Create task content
        const taskContent = document.createElement('span');
        taskContent.textContent = task;
        if (crossedOff) {
            taskContent.classList.add('crossed-off');
        }

        // Add click event to cross off the task
        taskContent.addEventListener('click', () => {
            taskContent.classList.toggle('crossed-off');
            toggleCrossOffTask(task);
        });

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

    function saveTask(task, crossedOff) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ task, crossedOff });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t.task !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function toggleCrossOffTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(t => {
            if (t.task === task) {
                t.crossedOff = !t.crossedOff;
            }
            return t;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // If no tasks are found in local storage, add default tasks
        if (tasks.length === 0) {
            tasks = [
                { task: "Create Concept", crossedOff: false },
                { task: "Create Code", crossedOff: false },
                { task: "Refine Code", crossedOff: false },
                { task: "Publish Code", crossedOff: false }
            ];
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        tasks.forEach(taskObj => addTask(taskObj.task, taskObj.crossedOff));
    }
});
