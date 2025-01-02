let taskList = [
    "New task is created and added to the list",
    "Clicking the checkbox toggles the completeness",
    "Delete button will delete the task from the list",
    "Complete tasks show at the end with strikethrough",
    "Marking in complete will put it back in pending list",
    "Exemplo teste"
]

const taskContainer = document.querySelector(".task-container");
const inputBar = document.querySelector('.input-container');
const inputAddTask = inputBar.children[0];
const enterButton = inputBar.children[1];

function createTask(innerText) {
    const newTaks = document.createElement('li');

    const checkbox = document.createElement('input');
    const task = document.createElement('span');
    const deleteIcon = document.createElement('img');

    checkbox.className = 'checked';
    checkbox.type = 'checkbox';
    task.className = 'task';
    task.innerHTML = innerText;
    deleteIcon.className = 'delete';
    deleteIcon.src = './trash-can.png';
    deleteIcon.alt = 'trash icon';

    newTaks.appendChild(checkbox);
    newTaks.appendChild(task);
    newTaks.appendChild(deleteIcon);

    taskContainer.appendChild(newTaks);
}

function fillChildrenLi() {
    for(let i = 0; i < taskList.length; i++) {
        createTask(taskList[i]);
    }
}

function appleAnimation() {
    const childrens = taskContainer.querySelectorAll(".task");
    for(let i = 0; i < childrens.length; i++) {
        const task = childrens[i];
        const computedStyle = window.getComputedStyle(task);
        const childStyle = computedStyle.getPropertyValue("text-decoration-line") === 'none';
        task.classList.remove('animation')
        if(task.offsetWidth >= 350 && childStyle) {
            task.classList.add('animation')
        }
    }
}

function changeTextStyle(checkbox) {
    const textFieldStyle = checkbox.nextSibling.style
    if(checkbox.checked) {
        textFieldStyle.textDecoration = 'line-through';
        textFieldStyle.color = 'rgb(150, 150, 150)';
        return true
    }
    textFieldStyle.textDecoration = 'none';
    textFieldStyle.color = 'rgb(0, 0, 0)';
    return false
}

function inputValidation() {
    if(inputAddTask.value) {
        createTask(inputAddTask.value);
        inputAddTask.value = '';
    }
}

document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        inputValidation()
        appleAnimation()
        // Criar função que acrecenta um elemento em taskList
    }

})

document.addEventListener('click', (e)=> {
    if(e.target.classList.contains("checked")) {
        const checkbox = e.target;
        let styleDecoration = changeTextStyle(checkbox);
        var children = Array.from(taskContainer.children);
        var currentElement = checkbox.parentElement;
        var index = children.indexOf(currentElement);
        let tempChildren = taskContainer.children[index];
        taskContainer.removeChild(taskContainer.children[index]);
        if(styleDecoration) {
            taskContainer.appendChild(tempChildren);
        } else {
            if(taskContainer.firstChild) {
                taskContainer.insertBefore(tempChildren, taskContainer.firstChild);
            } else {
                taskContainer.appendChild(tempChildren);
            }
        }
        appleAnimation()
        // Criar função que reordena os elementos em taskList
    }

    if(e.target.classList.contains("delete")) {
        const liToRemove = e.target.parentElement;
        taskContainer.removeChild(liToRemove);
        // Criar função que elimina o elemento determinado em taskList        
    }

    if(e.target === enterButton) {
        inputValidation()
        appleAnimation()
        // Criar função que acrecenta um elemento em taskList
    }
})

document.addEventListener('DOMContentLoaded', () => {
    fillChildrenLi()
    appleAnimation()
})