const add = document.querySelectorAll('.addItem');
// const tasksContainer = document.querySelectorAll('.tasks-container');

add.forEach((addTask) => {
    addTask.addEventListener('keydown', (e) => {
        const key = e.key;
        const value = addTask.value;
        if(key === 'Enter' && value.trim() !== '' && document.activeElement.tagName === 'INPUT') {
            const ref = addTask.parentNode.parentNode.children[1];
            const newTask = createNewTask(value, ref);
            addTask.value = '';
            createDraft(newTask);
        }
        
    })
})

const createNewTask = (value, ref) => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.setAttribute('draggable', 'true');

    const childTaskDiv = document.createElement('div');
    childTaskDiv.classList.add('tsk');
    childTaskDiv.innerHTML = value;

    taskDiv.appendChild(childTaskDiv);
    ref.appendChild(taskDiv);

    dragEventListener(taskDiv);

    return taskDiv;
}