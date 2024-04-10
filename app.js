import sampleData from "./data/data.js";
// console.log(sampleData.boards.length);
let newBoardColorId = null;

const init = () => {
    const boardContainer = document.getElementById('board-container');
    for(let board of sampleData.boards) {
        const b = createEmptyBoard(`${board.boardId}`);
        
        const header = createHeader();
        const titleContainer = createTitleContainer();

        const color = selectBoardColor(board.boardId-1);
        const title = setBoardTitle(`${board.title}`);
        const taskCount = createTaskCountContainer();
        
        createBoardTitle(titleContainer, color, title, taskCount);
        const description = createDescription(`${board.description}`);

        setHeader(header, titleContainer, description);
        const tasksContainer = createTasksContainer();

        createTask(board, tasksContainer);
        
        const addItem = addItemContainer();
        const input = createInputInAddItem();
        appendInputToAddItem(addItem, input);
    
        appendItemsToBoard(b, header, tasksContainer, addItem);
    
        boardContainer.append(b);
    }

    const newBoardBtn = createNewBoardBtn();
    boardContainer.append(newBoardBtn);
}

const addNewBoard = () => {
    const boardContainer = document.getElementById('board-container');

    const newDialogBox = document.createElement('dialog');
    newDialogBox.setAttribute('class', 'addBoardDialogBox');
    newDialogBox.setAttribute('id', 'addBoardDialogBox');

    const boardDiv = document.createElement('div');
    boardDiv.setAttribute('class', 'boardDiv');
    boardDiv.innerHTML = 'New Board';

    const hr1 = document.createElement('hr');
    hr1.setAttribute('class', 'hr');


    const boardTitle = document.createElement('div');
    boardTitle.setAttribute('class', 'dialogBody');
    boardTitle.setAttribute('id', 'boardTitle');
    boardTitle.innerHTML = 'Title';

    const boardTitleInput = document.createElement('input');
    boardTitleInput.setAttribute('class', 'dialogBodyInput');

    const boardDescription = document.createElement('div');
    boardDescription.setAttribute('class', 'dialogBody');
    boardDescription.innerHTML = 'Description';

    const boardDescriptionInput = document.createElement('textarea');
    boardDescriptionInput.setAttribute('class', 'dialogBodyInput');

    const boardColor = document.createElement('div');
    boardColor.setAttribute('class', 'dialogBody');
    boardColor.innerHTML = 'Color';

    const boardColorsContainer = document.createElement('div');
    boardColorsContainer.setAttribute('class', 'boardColorList');


    for(let i=0; i < sampleData.colors.length; i++) {
        const colorDiv = document.createElement('div');
        colorDiv.setAttribute('type', 'text');
        colorDiv.setAttribute('id', i);
        colorDiv.classList.add('colors');
        colorDiv.style.border = `2px solid ${sampleData.colors[i]}`;
        colorDiv.style.backgroundColor = `${sampleData.bgColors[i]}`;
        colorDiv.addEventListener('click', (e) => fun(e));

        boardColorsContainer.append(colorDiv);
    }

    const hr2 = document.createElement('hr');
    hr2.setAttribute('class', 'hr');


    const buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('class', 'buttonContainer');

    const cancelButton = document.createElement('div');
    cancelButton.setAttribute('class', 'dialogButton');
    cancelButton.setAttribute('id', 'cancelButton');
    cancelButton.innerHTML = 'Cancel';
    cancelButton.addEventListener('click', () => newDialogBox.close());

    const submitButton = document.createElement('div');
    submitButton.setAttribute('class', 'dialogButton');
    submitButton.setAttribute('id', 'submitButton');
    submitButton.innerHTML = 'Submit';
    submitButton.addEventListener('click', () => {
        if(boardTitleInput.value.replace(/\s+/g,' ').trim() !== '') {
            if(boardDescriptionInput.value.replace(/\s+/g,' ').trim() !== '') {
                if(newBoardColorId !== null) {
                    createNewBoard(boardTitleInput.value, boardDescriptionInput.value, newBoardColorId);
                    newDialogBox.close();
                } else {
                    alert('Board color must be selected');
                }
                
            } else {
                alert('Description must not be empty');
                boardDescriptionInput.value = '';
            }
        } else {
            alert('Title must not be empty');
            boardTitleInput.value = '';
        }
        
    });

    buttonContainer.append(cancelButton);
    buttonContainer.append(submitButton);
    
    newDialogBox.append(boardDiv);
    newDialogBox.append(hr1);
    newDialogBox.append(boardTitle);
    newDialogBox.append(boardTitleInput);
    newDialogBox.append(boardDescription);
    newDialogBox.append(boardDescriptionInput);
    newDialogBox.append(boardColor);
    newDialogBox.append(boardColorsContainer);
    newDialogBox.append(hr2);
    newDialogBox.append(buttonContainer);


    boardContainer.append(newDialogBox);

    // newDialogBox.close();
    newDialogBox.showModal();
}

const createNewBoard = (boardTitle, boardDescription) => {
    const boardContainer = document.getElementById('board-container');
    const newBoardBtn = document.getElementById('newBoardBtn');

    const b = createEmptyBoard(document.querySelectorAll('.board').length + 1);

    const header = createHeader();
    const titleContainer = createTitleContainer();

    const color = selectBoardColor(newBoardColorId);
    const title = setBoardTitle(boardTitle);
    const taskCount = createTaskCountContainer();

    createBoardTitle(titleContainer, color, title, taskCount);
    const description = createDescription(boardDescription);

    setHeader(header, titleContainer, description);
    
    const tasksContainer = createTasksContainer();

    const addItem = addItemContainer();
    const input = createInputInAddItem();
    appendInputToAddItem(addItem, input);

    appendItemsToBoard(b, header, tasksContainer, addItem);
    
    boardContainer.insertBefore(b, newBoardBtn);
    
    countBoards();
    countTasks();
    taskDragListener();
    boardDragListener();
}

const createEmptyBoard = (id) => {
    const b = document.createElement('div');
    b.setAttribute('id', id);
    b.setAttribute('class', 'board');
    return b;
}

const createHeader = () => {
    const header = document.createElement('div');
    header.setAttribute('class', 'header');
    return header;
}

const createTitleContainer = () => {
    const titleContainer = document.createElement('div');
    titleContainer.setAttribute('class', 'title-container');
    return titleContainer;
}

const selectBoardColor = (id) => {
    const color = document.createElement('div');
    color.setAttribute('class', 'color');
    color.style.border = `2px solid ${sampleData.colors[id]}`;
    color.style.backgroundColor = `${sampleData.bgColors[id]}`;
    return color;
}

const setBoardTitle = (boardTitle) => {
    const title = document.createElement('div');
    title.setAttribute('class', 'title');
    title.innerHTML = boardTitle;
    return title;
}

const createTaskCountContainer = () => {
    const taskCount = document.createElement('div');
    taskCount.setAttribute('class', 'task-count');
    return taskCount;
}

const createBoardTitle = (titleContainer, color, title, taskCount) => {
    titleContainer.append(color);
    titleContainer.append(title);
    titleContainer.append(taskCount);
}

const createDescription = (boardDescription) => {
    const description = document.createElement('div');
    description.setAttribute('class', 'description');
    description.innerHTML = boardDescription;
    return description;
}

const setHeader = (header, titleContainer, description) => {
    header.append(titleContainer);
    header.append(description);
}

const createTasksContainer = () => {
    const tasksContainer = document.createElement('div');
    tasksContainer.setAttribute('class', 'tasks-container');
    return tasksContainer;
}

const addItemContainer = () => {
    const addItem = document.createElement('div');
    addItem.setAttribute('title', 'Add Item');
    return addItem;
}

const createInputInAddItem = () => {
    const input = document.createElement('input');
    input.setAttribute('class', 'addItem');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', '+ Add item');
    return input;
}

const appendInputToAddItem = (addItem, input) => {
    addItem.append(input);
}

const appendItemsToBoard = (b, header, tasksContainer, addItem) => {
    b.append(header);
    b.append(tasksContainer);
    b.append(addItem);
}


const createTask = (board, tasksContainer) => {
    for(let task of board.tasks) {
        const t = createEmptyTask();

        const child = document.createElement('div');
        child.setAttribute('class', 'tsk');
        child.innerHTML = `${task.name}`;

        t.append(child);
        tasksContainer.append(t);
    }
}

const createEmptyTask = () => {
    const t = document.createElement('div');
    t.setAttribute('class', 'task');
    t.setAttribute('draggable', 'true');
    return t;
}


const createNewBoardBtn = () => {
    const newBoardBtn = document.createElement('div');
    newBoardBtn.innerHTML = '+';
    newBoardBtn.setAttribute('class', 'newBoardBtn');
    newBoardBtn.setAttribute('id', 'newBoardBtn');
    newBoardBtn.addEventListener('click', () => {
        addNewBoard();
    });
    return newBoardBtn;
}
    
    
    

const fun = (event) => {
    const colors = document.querySelectorAll('.colors');
    colors.forEach(item => {
        item.innerHTML = '';
    })

    event.target.innerHTML = "&nbsp;✓";
    newBoardColorId = event.target.id;
}

init();