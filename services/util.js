let tasksContainer = document.querySelectorAll('.tasks-container');
let taskSet = document.querySelectorAll('.task');
let taskSubContSet1 = document.querySelectorAll('.taskSubCont1');
let taskSubContSet2 = document.querySelectorAll('.taskSubCont2');
let originBoard = null;
let destBoard = null;
let movingTask = null;


const countTasks = () => {
    tasksContainer = document.querySelectorAll('.tasks-container');
    taskSet = document.querySelectorAll('.task');
    
    tasksContainer.forEach((container) => {
        const noOfTasks = container.querySelectorAll(".task").length;
        container.parentNode.children[0].children[0].children[0].children[2].innerHTML = noOfTasks;
    })
}

const createDraftBeforeEachTask = () => {
    taskSubContSet2.forEach((task) => {
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
        const draggable = task.getAttribute('draggable');
        if(draggable) {
            task.classList.add('is-Dragging');
            originBoard = task.closest('.board').getAttribute('id').slice(-1) - 1;
            // console.log('Origin Board: ' + originBoard.getAttribute('id'));
            let kanbanBoardData = JSON.parse(localStorage.getItem('kanban')); 
            
            const tasksObj = kanbanBoardData.boards[originBoard].tasks;
            // console.log(tasksObj);
            const taskId = task.getAttribute('id').slice(4);
            // console.log(taskId);
            const findIndex = tasksObj.findIndex(t => t.taskId === Number(taskId));
            if(findIndex !== -1) {
                movingTask = tasksObj[findIndex];
                tasksObj.splice(findIndex, 1);
                // console.log(tasksObj);
                // console.log(kanbanBoardData);
                localStorage.setItem('kanban', JSON.stringify(kanbanBoardData));
            }
            
        }
            
    });

    //Listen to Drag end events
    task.addEventListener('dragend', () => {
        const draggable = task.getAttribute('draggable');
        if(draggable) {
            task.classList.remove('is-Dragging');
            destBoard = task.closest('.board').getAttribute('id').slice(-1) - 1;
            // console.log('Dest Board: ' + destBoard);
            let kanbanBoardData = JSON.parse(localStorage.getItem('kanban')); 
            if(movingTask !== null) kanbanBoardData.boards[destBoard].tasks.push(movingTask);
            localStorage.setItem('kanban', JSON.stringify(kanbanBoardData));
            // console.log(kanbanBoardData);
        }
            
    });
}

const createEmptyTask = () => {
    const t = createElement('div');
    t.setAttribute('class', 'task');
    t.setAttribute('draggable', 'true');
    return t;
}