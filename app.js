import sampleData from "./data/data.js";
let newBoardColorId = null;

const init = () => {
    const boardContainer = document.getElementById('board-container');
    for(let board of sampleData.boards) {
        const b = createEmptyBoard(`${board.boardId}`);
        
        const header = createAndSetBoardTitleDescription((board.boardId-1), `${board.title}`, `${board.description}`);
        
        const tasksContainer = createTasksContainer();

        createTask(board, tasksContainer);
        
        const addItem = createAddItemSection();
    
        appendItemsToBoard(b, header, tasksContainer, addItem);
    
        boardContainer.append(b);
    }

    const newBoardBtn = createNewBoardBtn();
    boardContainer.append(newBoardBtn);

    document.body.addEventListener('click', (event) => {
        const menu = document.querySelector('.menu');
        if (menu && !menu.contains(event.target)) {
            menu.remove();
        }
    });
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

    const header = createAndSetBoardTitleDescription(newBoardColorId, boardTitle, boardDescription);
    
    const tasksContainer = createTasksContainer();

    const addItem = createAddItemSection();

    appendItemsToBoard(b, header, tasksContainer, addItem);
    
    boardContainer.insertBefore(b, newBoardBtn);
    
    countBoards();
    countTasks();
    taskDragListener();
    boardDragListener();
}

const createAndSetBoardTitleDescription = (id, t, desc) => {
    const header = createHeader();
    const parentTitleContainer = createParentTitleContainer();

    const titleContainer = createTitleContainer();
    const color = selectBoardColor(id);
    const title = setBoardTitle(t);
    const taskCount = createTaskCountContainer();
    createBoardTitle(titleContainer, color, title, taskCount);

    const threeDotsImgContainer = createThreeDotsImgContainer();
    const threeDotsImg = createAndSetThreeDotsImg();
    threeDotsImgContainer.append(threeDotsImg);

    parentTitleContainer.append(titleContainer);
    parentTitleContainer.append(threeDotsImgContainer);
    const description = createDescription(desc);

    setHeader(header, parentTitleContainer, description);
    return header;
}

const createAndSetThreeDotsImg = () => {
    const threeDotsImg = createThreeDotsImg();
    threeDotsImg.setAttribute('src', '/Images/three-dots.svg');
    threeDotsImg.setAttribute('alt', 'Del');
    threeDotsImg.addEventListener('click', (event) => {
        event.stopPropagation();

        const menu = createContextMenu();

        // Calculate position for menu
        calcMenuPos(threeDotsImg, menu);

        // Ensure there's only one menu at a time
        const existingMenu = document.querySelector('.menu');
        if (existingMenu) {
            existingMenu.remove();
        }

        document.body.appendChild(menu);
        // document.body.children[1].children[id].children[0].children[0].children[1].appendChild(menu);
    })
    return threeDotsImg;
}

const createContextMenu = () => {
    const menu = document.createElement('ul');
    menu.classList.add('menu');

    const editOption = createEditOption();
    const deleteOption = createDeleteOption();

    menu.appendChild(editOption);
    menu.appendChild(deleteOption);

    return menu;
}

const createEditOption = () => {
    const editOption = document.createElement('li');
    editOption.setAttribute('class', 'edit');
    editOption.textContent = 'Edit';
    editOption.addEventListener('click', () => {
        // Handle edit action
        console.log('Edit option clicked');
    });
    return editOption;
}

const createDeleteOption = () => {
    const deleteOption = document.createElement('li');
    deleteOption.setAttribute('class', 'delete');
    deleteOption.textContent = 'Delete';
    deleteOption.addEventListener('click', () => {
        // Handle edit action
        console.log('Delete option clicked');
    });
    return deleteOption;
}

const calcMenuPos = (threeDotsImg, menu) => {
    const rect = threeDotsImg.getBoundingClientRect();
    menu.style.position = 'fixed';
    menu.style.top = (rect.bottom-13) + 'px';
    menu.style.left = (rect.left-50) + 'px';
}

const createAddItemSection = () => {
    const addItem = addItemContainer();
    const input = createInputInAddItem();
    appendInputToAddItem(addItem, input);
    return addItem;
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

const createParentTitleContainer = () => {
    const parentTitleContainer = createElement('div');
    parentTitleContainer.setAttribute('class', 'parent-title-container');
    parentTitleContainer.setAttribute('id', 'parentTitleContainer');
    return parentTitleContainer;
}

const createTitleContainer = () => {
    const titleContainer = createElement('div');
    titleContainer.setAttribute('class', 'title-container');
    titleContainer.setAttribute('id', 'titleContainer');
    return titleContainer;
}

const createThreeDotsImgContainer = () => {
    const threeDotsImgContainer = createElement('div');
    threeDotsImgContainer.setAttribute('class', 'threeDotsImagecontainer');
    threeDotsImgContainer.setAttribute('id', 'threeDotsImagecontainer'+document.querySelectorAll('.board').length);
    return threeDotsImgContainer;
}

const createThreeDotsImg = () => {
    const threeDotsImg = createElement('img');
    threeDotsImg.setAttribute('class', 'threeDotsImg');
    threeDotsImg.setAttribute('id', 'threeDotsImg');
    return threeDotsImg;
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