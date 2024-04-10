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

    const newDialogBox = createNewDialogBox();

    const dialogBoxHeading = createdialogBoxHeading();
    const hr1 = createHR('hr1');
    const boardTitle = setNewBoardTitle();
    const boardTitleInput = createNewBoardTitleInput();
    const boardDescription = createBoardDescription();
    const boardDescriptionInput = createNewBoardDescriptionInput();
    const boardColor = createNewBoardColorParentDiv();
    const boardColorsContainer = createBoardColorsContainer();
    setColorsInColorContainer(boardColorsContainer);
    const hr2 = createHR('hr2');

    const buttonContainer = createButtonContainer();
    const cancelButton = createCancelButton();
    const submitButton = createSubmitButton(boardTitleInput, boardDescriptionInput, newDialogBox);

    buttonContainer.append(cancelButton);
    buttonContainer.append(submitButton);
    
    newDialogBox.append(dialogBoxHeading);
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
    const b = createElement('div');
    b.setAttribute('id', id);
    b.setAttribute('class', 'board');
    return b;
}

const createHeader = () => {
    const header = createElement('div');
    header.setAttribute('class', 'header');
    return header;
}

const createTitleContainer = () => {
    const titleContainer = createElement('div');
    titleContainer.setAttribute('class', 'title-container');
    return titleContainer;
}

const selectBoardColor = (id) => {
    const color = createElement('div');
    color.setAttribute('class', 'color');
    color.style.border = `2px solid ${sampleData.colors[id]}`;
    color.style.backgroundColor = `${sampleData.bgColors[id]}`;
    return color;
}

const setBoardTitle = (boardTitle) => {
    const title = createElement('div');
    title.setAttribute('class', 'title');
    title.innerHTML = boardTitle;
    return title;
}

const createTaskCountContainer = () => {
    const taskCount = createElement('div');
    taskCount.setAttribute('class', 'task-count');
    return taskCount;
}

const createBoardTitle = (titleContainer, color, title, taskCount) => {
    titleContainer.append(color);
    titleContainer.append(title);
    titleContainer.append(taskCount);
}

const createDescription = (boardDescription) => {
    const description = createElement('div');
    description.setAttribute('class', 'description');
    description.innerHTML = boardDescription;
    return description;
}

const setHeader = (header, titleContainer, description) => {
    header.append(titleContainer);
    header.append(description);
}

const createTasksContainer = () => {
    const tasksContainer = createElement('div');
    tasksContainer.setAttribute('class', 'tasks-container');
    return tasksContainer;
}

const addItemContainer = () => {
    const addItem = createElement('div');
    addItem.setAttribute('title', 'Add Item');
    return addItem;
}

const createInputInAddItem = () => {
    const input = createElement('input');
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

        const child = createElement('div');
        child.setAttribute('class', 'tsk');
        child.innerHTML = `${task.name}`;

        t.append(child);
        tasksContainer.append(t);
    }
}

const createEmptyTask = () => {
    const t = createElement('div');
    t.setAttribute('class', 'task');
    t.setAttribute('draggable', 'true');
    return t;
}


const createNewBoardBtn = () => {
    const newBoardBtn = createElement('div');
    newBoardBtn.innerHTML = '+';
    newBoardBtn.setAttribute('class', 'newBoardBtn');
    newBoardBtn.setAttribute('id', 'newBoardBtn');
    newBoardBtn.addEventListener('click', () => {
        addNewBoard();
    });
    return newBoardBtn;
}
    

const createNewDialogBox = () => {
    const newDialogBox = createElement('dialog');
    newDialogBox.setAttribute('class', 'addBoardDialogBox');
    newDialogBox.setAttribute('id', 'addBoardDialogBox');
    return newDialogBox;
}
    
const createdialogBoxHeading = () => {
    const dialogBoxHeading = createElement('div');
    dialogBoxHeading.setAttribute('class', 'dialogBoxHeading');
    dialogBoxHeading.innerHTML = 'New Board';
    return dialogBoxHeading;
}

const createHR = (hr) => {
    const el = createElement('hr');
    el.setAttribute('class', 'hr');
    el.setAttribute('id', hr);
    return el;
}
    
const setNewBoardTitle = () => {
    const boardTitle = createElement('div');
    boardTitle.setAttribute('class', 'dialogBody');
    boardTitle.setAttribute('id', 'boardTitle');
    boardTitle.innerHTML = 'Title';
    return boardTitle;
}

const createNewBoardTitleInput = () => {
    const boardTitleInput = createElement('input');
    boardTitleInput.setAttribute('class', 'dialogBodyInput');
    return boardTitleInput;
}


const createBoardDescription = () => {
    const boardDescription = createElement('div');
    boardDescription.setAttribute('class', 'dialogBody');
    boardDescription.innerHTML = 'Description';
    return boardDescription;
}

const createNewBoardDescriptionInput = () => {
    const boardDescriptionInput = createElement('textarea');
    boardDescriptionInput.setAttribute('class', 'dialogBodyInput');
    return boardDescriptionInput;
}

const createNewBoardColorParentDiv = () => {
    const boardColor = createElement('div');
    boardColor.setAttribute('class', 'dialogBody');
    boardColor.innerHTML = 'Color';
    return boardColor;
}
const createBoardColorsContainer = () => {
    const boardColorsContainer = createElement('div');
    boardColorsContainer.setAttribute('class', 'boardColorList');
    return boardColorsContainer;
}

const setColorsInColorContainer = (boardColorsContainer) => {
    for(let i=0; i < sampleData.colors.length; i++) {
        const colorDiv = createElement('div');
        colorDiv.setAttribute('type', 'text');
        colorDiv.setAttribute('id', i);
        colorDiv.classList.add('colors');
        colorDiv.style.border = `2px solid ${sampleData.colors[i]}`;
        colorDiv.style.backgroundColor = `${sampleData.bgColors[i]}`;
        colorDiv.addEventListener('click', (e) => fun(e));

        boardColorsContainer.append(colorDiv);
    }
}

const createButtonContainer = () => {
    const buttonContainer = createElement('div');
    buttonContainer.setAttribute('class', 'buttonContainer');
    return buttonContainer;
}

const createCancelButton = () => {
    const cancelButton = createElement('div');
    cancelButton.setAttribute('class', 'dialogButton');
    cancelButton.setAttribute('id', 'cancelButton');
    cancelButton.innerHTML = 'Cancel';
    cancelButton.addEventListener('click', () => newDialogBox.close());
    return cancelButton;
}

const createSubmitButton = (boardTitleInput, boardDescriptionInput, newDialogBox) => {
    const submitButton = createElement('div');
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

    return submitButton;
}

const createElement = (x) => {
    return document.createElement(x);
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