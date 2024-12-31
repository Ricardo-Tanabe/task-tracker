const taskList = [
    "New task is created and added to the list",
    "Clicking the checkbox toggles the completeness",
    "Delete button will delete the task from the list",
    "Complete tasks show at the end with strikethrough",
    "Marking in complete will put it back in pending list"
]

const taskContainer = document.querySelector(".task-container");

function createTask(innerText) {
    const newTaks = document.createElement('li')
    const checkbox = document.createElement('input');
    const task = document.createElement('span');
    const deleteIcon = document.createElement('img');
    checkbox.className = 'checked'
    checkbox.type = 'checkbox'
    task.className = 'task'
    task.innerHTML = innerText
    deleteIcon.className = 'delete'
    deleteIcon.src = './trash-can.png'
    deleteIcon.alt = 'trash icon'

    newTaks.appendChild(checkbox);
    newTaks.appendChild(task);
    newTaks.appendChild(deleteIcon);

    taskContainer.appendChild(newTaks);
}

document.addEventListener('click', ()=> {})

document.addEventListener('DOMContentLoaded', () => {
    for(let i = 0; i < taskList.length; i++) {
        createTask(taskList[i]);
    }

    // console.log(taskContainer);
})