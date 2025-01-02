let taskList = [
    {text: "New task is created and added to the list", isChecked: false},
    {text: "Clicking the checkbox toggles the completeness", isChecked: false},
    {text: "Delete button will delete the task from the list", isChecked: false},
    {text: "Complete tasks show at the end with strikethrough", isChecked: false},
    {text: "Marking in complete will put it back in pending list", isChecked: false},
    {text: "Exemplo teste", isChecked: false}
]

const taskContainer = document.querySelector(".task-container");
const inputBar = document.querySelector('.input-container');
const inputAddTask = inputBar.children[0];
const enterButton = inputBar.children[1];

function createInnerElementsInChildren(innerText) {
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

    return [checkbox, task, deleteIcon]
}

function createChildren(innerElements) {
    const newTask = document.createElement('li');
    for (let i = 0; i < innerElements.length; i++) {
        newTask.appendChild(innerElements[i]);
    }
    return newTask
}

function createTask(innerText) {
    const innerElements = createInnerElementsInChildren(innerText)
    const newTask = createChildren(innerElements);
    taskContainer.appendChild(newTask);
}

function deleteOldTasks() {
    while (taskContainer.firstChild) {
        taskContainer.removeChild(taskContainer.firstChild);
    }
}

function orderedNonCheckedChildren() {
    let checkedArray = []
    for(let i = 0; i < taskList.length; i++) {
        if(!taskList[i].isChecked) {
            createTask(taskList[i].text);
            continue
        }
        checkedArray.push(taskList[i])
    }
    return checkedArray
}

function orderedCheckedChildren(checkedArray, difference) {
    let reorderedList = difference
    for(let i = 0; i < checkedArray.length; i++) {
        createTask(checkedArray[i].text);
        const checkbox = taskContainer.lastChild.children[0];
        const task = taskContainer.lastChild.children[1];
        task.style.textDecoration = 'line-through';
        task.style.color = 'rgb(150, 150, 150)';
        checkbox.checked = checkedArray[i].isChecked;
        reorderedList.push(checkedArray[i])
    }
    return reorderedList
}

function renderTasks() {
    deleteOldTasks()
    let checkedArray = orderedNonCheckedChildren()
    let difference = taskList.filter(item => !checkedArray.includes(item));
    taskList = orderedCheckedChildren(checkedArray, difference)
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

function inputValidation() {
    if(inputAddTask.value) {
        taskList.push({text: inputAddTask.value, isChecked: false})
        deleteOldTasks()
        renderTasks()
        appleAnimation()
        inputAddTask.value = '';
    }
}

function selectedChildren(checkbox) {
    let childrens = Array.from(taskContainer.children);
    let currentElement = checkbox.parentElement;
    let index = childrens.indexOf(currentElement);
    let children = childrens[index];
    let span = children.children[1]
    return [checkbox, children, span, index];
}

function changeElementsPosition(checkbox, children, span, index) {
    taskList.splice(index, 1);
    if(checkbox.checked) {
        taskContainer.appendChild(children);
        taskList.splice(taskList.length, 0, {text: span.innerHTML, isChecked: true});
    } else {
        if(taskContainer.firstChild) {
            taskContainer.insertBefore(children, taskContainer.firstChild);
        } else {
            taskContainer.appendChild(children);
        }
        taskList.splice(0, 0, {text: span.innerHTML, isChecked: false});
    }
}

function saveChange() {
    let taskListString = JSON.stringify(taskList);
    localStorage.setItem('taskListKey', taskListString)
}

function loadChange() {
    console.log(localStorage.getItem('taskListKey'));
    if(localStorage.getItem('taskListKey') !== null) {
        let taskListString = localStorage.getItem('taskListKey')
        taskList = JSON.parse(taskListString)
    }
}

document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        inputValidation()
        appleAnimation()
    }

    saveChange()
})

document.addEventListener('click', (e)=> {
    if(e.target.classList.contains("checked")) {
        let args = selectedChildren(e.target)
        changeElementsPosition(...args)
        renderTasks()
        appleAnimation()
    }

    if(e.target.classList.contains("delete")) {
        const childRemove = e.target.parentElement;
        const index = Array.prototype.indexOf.call(taskContainer.children, childRemove)
        taskList.splice(index, 1)
        taskContainer.removeChild(childRemove);
    }

    if(e.target === enterButton) {
        inputValidation();
        appleAnimation();
    }

    saveChange()
})

document.addEventListener('DOMContentLoaded', () => {
    // localStorage.clear(); // Usado para limpar o cache
    loadChange()
    renderTasks()
    appleAnimation()
})