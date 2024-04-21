const countBoards = () => {
    const add = document.querySelectorAll('.addItem');

    add.forEach((addTask) => {
        addTask.addEventListener('keydown', (e) => {
            const boardColor = e.target.closest('.board').children[0].children[0].children[0].children[0].style.backgroundColor;
            // console.log(color);
            const key = e.key;
            const value = addTask.value;
            if(key === 'Enter' && value.trim() !== '' && document.activeElement.tagName === 'INPUT') {
                const ref = addTask.parentNode.parentNode.children[1];
                const newTask = createNewTask(value, ref, boardColor);
                addTask.value = '';
                createDraft(newTask);
            }
        })
    })
}

countBoards();
// const tasksContainer = document.querySelectorAll('.tasks-container');



const createNewTask = (value, ref, boardColor) => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.style.backgroundColor = boardColor;
    taskDiv.setAttribute('draggable', 'true');

    const childTaskDiv = document.createElement('div');
    childTaskDiv.classList.add('tsk');
    childTaskDiv.innerHTML = value;

    taskDiv.appendChild(childTaskDiv);
    ref.appendChild(taskDiv);

    dragEventListener(taskDiv);

    countTasks();
    // setTasksColor();

    return taskDiv;
}