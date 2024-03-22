taskSet.forEach((task) => dragEventListener(task));

tasksContainer.forEach((taskContainer) => {
    taskContainer.addEventListener('dragover', (e) => {
        const draggingTask = document.querySelector('.is-Dragging');

        const closestElement = findClosestElement(taskContainer, e.clientY);

        if(closestElement) 
            taskContainer.insertBefore(draggingTask, closestElement);
        else
            taskContainer.append(draggingTask);

        countTasks();
    })
})


const findClosestElement = (board, yaxis) => {
    const tasksInThisBoard = board.querySelectorAll('.task:not(.is-Dragging)');

    let closestElement = null;
    let closestDistance = Number.NEGATIVE_INFINITY;

    tasksInThisBoard.forEach((task) => {
        let top = task.getBoundingClientRect().top;
        let distance = yaxis - top;

        if(distance < 0 && distance > closestDistance) {
            closestDistance = distance;
            closestElement = task;
        }
    })

    return closestElement;
}



countTasks();
createDraftBeforeEachTask();