const inputAddTaskEl = document.querySelector('.add-task input')
const buttonAddTaskEl = document.querySelector('.add-task button')
const taskListEl = document.querySelector('.task-list')
const noTasksEl = document.querySelector('.no-tasks')
 
buttonAddTaskEl.addEventListener('click', () => {
    const value = inputAddTaskEl.value
    createTask(value)
})
 
function deleteTask(id) {
    fetch('http://localhost:3333/api/tasks/' + id, { method: 'DELETE' })
        .then(() => {
            getAllTasks()
        })
}
 
function createTask(value) {
    fetch('http://localhost:3333/api/tasks/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: value, checked: false })
    })
        .then(() => {
            getAllTasks()
        })
}
 
function updateTask(id, name, checked) {
    fetch('http://localhost:3333/api/tasks/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, checked: checked })
    })
        .then(() => {
            getAllTasks()
        })
}
 
function mountTask(task) {

    const taskEl = document.createElement('label');
    const checkboxEl = document.createElement('input');
    const labelEl = document.createElement('label');
    const nameEl = document.createElement('p');
    const deleteButtonEl = document.createElement('button');

    taskEl.className = 'task custom-checkbox';
    
    checkboxEl.type = 'checkbox';
    checkboxEl.id = 'task-' + task.id;
    checkboxEl.className = 'task-checkbox';
    checkboxEl.checked = task.checked;
    checkboxEl.addEventListener('change', () => {
        updateTask(task.id, task.name, checkboxEl.checked);
    });

    labelEl.className = 'checkbox-label';
    labelEl.htmlFor = 'task-' + task.id;

    nameEl.innerHTML = task.name;

    deleteButtonEl.innerHTML = '<img src="./assets/css/img/trash.png" alt="">';
    deleteButtonEl.addEventListener('click', () => {
        deleteTask(task.id);
    });

    taskEl.appendChild(checkboxEl);
    taskEl.appendChild(labelEl);
    taskEl.appendChild(nameEl);
    taskEl.appendChild(deleteButtonEl);

    taskListEl.appendChild(taskEl);
}
 
function getAllTasks() {
    fetch('http://localhost:3333/api/tasks')
        .then((response) => response.json())
        .then(data => {
            if (!data || data.length === 0) {
                taskListEl.innerHTML = '<p class="no-tasks active">Nenhuma tarefa cadastrada.</p>'
            } else {
                taskListEl.innerHTML = ''
                data.forEach(mountTask)
            }
        })
} 
 
 
getAllTasks()