let tasksContainer = document.querySelectorAll('.tasks-container');
let taskSet = document.querySelectorAll('.task');


const countTasks = () => {
    tasksContainer = document.querySelectorAll('.tasks-container');
    taskSet = document.querySelectorAll('.task');
    
    tasksContainer.forEach((container) => {
        const noOfTasks = container.querySelectorAll(".task").length;
        container.parentNode.children[0].children[0].children[0].children[2].innerHTML = noOfTasks;
    })
}

const createDraftBeforeEachTask = () => {
    taskSet.forEach((task) => {
        const div = document.createElement('div');
        div.setAttribute('class', 'draft');
        div.innerHTML = 'Draft';
        task.prepend(div);
    })
}

const createDraft = (task) => {
    const div = document.createElement('div');
    div.setAttribute('class', 'draft');
    div.innerHTML = 'Draft';
    task.prepend(div);
}

const dragEventListener = (task) => {
    //Listen to Drag start events
    task.addEventListener('dragstart', () => {
        task.classList.add('is-Dragging');
    });

    //Listen to Drag end events
    task.addEventListener('dragend', () => {
        task.classList.remove('is-Dragging');
    });
}
