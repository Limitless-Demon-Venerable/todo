const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function renderTasks() {
    taskList.innerHTML = ''; 
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }

        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleComplete(index));

        
        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text; 
        
       
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => deleteTask(index));

        //
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}


function addTask() {
    const text = taskInput.value.trim();
    if (text === '') {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        text: text,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = ''; 
}


function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}


function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}


addBtn.addEventListener('click', addTask);




renderTasks();