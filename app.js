import sampleData from "./data/data.js";
let newBoardColorId = null;

const init = () => {
    const boardContainer = document.getElementById('board-container');

    let kanbanBoardData = getDataFromLocalStorage();   //convert string received from local storage to object for further use
    if(!kanbanBoardData) {
        localStorage.setItem('kanban', JSON.stringify(sampleData));     //convert object to string before storing back to local storage
        kanbanBoardData = JSON.parse(localStorage.getItem('kanban'));
    }
    
    for(let board of kanbanBoardData.boards) {
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
        const dialog = document.querySelector('#editBoard');
        
        if (menu && !dialog && !menu.contains(event.target)) {
            menu.remove();
        }
    });
}

const addNewBoard = () => {
    const boardContainer = document.getElementById('board-container');

    const newDialogBox = createNewDialogBox('addBoard', 'addBoardDialogBox');

    const dialogBoxHeading = createdialogBoxHeading('New Board');
    const hr1 = createHR('hr1');
    const boardTitle = setNewBoardTitle();
    const boardTitleInput = createNewBoardTitleInput('');
    const boardDescription = createBoardDescription();
    const boardDescriptionInput = createNewBoardDescriptionInput('');
    const boardColor = createNewBoardColorParentDiv();
    const boardColorsContainer = createBoardColorsContainer();
    setColorsInColorContainer(boardColorsContainer);
    const hr2 = createHR('hr2');

    const buttonContainer = createButtonContainer();
    const cancelButton = createCancelButton(newDialogBox);
    const submitButton = createAndSetSubmitButtonToAddNewBoard(boardTitleInput, boardDescriptionInput, newDialogBox);

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
    let kanbanBoardData = JSON.parse(localStorage.getItem('kanban')); 

    const boardId = document.querySelectorAll('.board').length + 1;
    // console.log('Board Id-> ' + boardId);
    const b = createEmptyBoard(boardId);

    const header = createAndSetBoardTitleDescription(newBoardColorId, boardTitle, boardDescription);
    
    const tasksContainer = createTasksContainer();

    const addItem = createAddItemSection();

    appendItemsToBoard(b, header, tasksContainer, addItem);
    
    boardContainer.insertBefore(b, newBoardBtn);
    
    const newBoard = convertNewBoardToObj(boardId, `${kanbanBoardData.colors[newBoardColorId]}`, `${kanbanBoardData.bgColors[newBoardColorId]}`, boardTitle, boardDescription);
    kanbanBoardData.boards.push(newBoard);
    localStorage.setItem('kanban', JSON.stringify(kanbanBoardData));
    // console.log(JSON.parse(localStorage.getItem('kanban')));

    countBoards();
    countTasks();
    taskDragListener();
    boardDragListener();
    threeDotsFun();
    searchTasks();
    
    const boardColor = `${sampleData.bgColors[newBoardColorId]}`;
    taskColorChangeonDragover(b, boardColor);
}

const getDataFromLocalStorage = () => {
    // debugger;
    let kanbanBoardData = JSON.parse(localStorage.getItem('kanban'));
    if(kanbanBoardData) return kanbanBoardData;
    return false;
}

const convertNewBoardToObj = (id, color, bgColor, tit, desc) => {
    const newObj = {
        boardId : id,
        color : color,
        bgColor : bgColor,
        title : tit,
        description : desc,
        tasks : [ ]
    }
    return newObj;
}

const convertNewTaskToObj = (id, nm, ord) => {
    const newObj = {
        taskId : id,
        name : nm,
        order : ord,
    }
    return newObj;
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

    parentTitleContainer.append(titleContainer);
    parentTitleContainer.append(threeDotsImgContainer);
    const description = createDescription(desc);

    setHeader(header, parentTitleContainer, description);
    return header;
}

const createAndSetThreeDotsImg = (id) => {
    const threeDotsImg = createThreeDotsImg();
    threeDotsImg.setAttribute('src', '/Images/three-dots.svg');
    threeDotsImg.setAttribute('alt', 'Del');
    threeDotsImg.addEventListener('click', (event) => {
        event.stopPropagation();

        const menu = createContextMenu();

        // Calculate position for menu
        calcMenuPos(threeDotsImg, menu, event);

        // Ensure there's only one menu at a time
        const existingMenu = document.querySelector('.menu');
        if (existingMenu) {
            existingMenu.remove();
        }

        // document.body.appendChild(menu);
        document.body.children[1].children[id].children[0].children[0].children[1].appendChild(menu);
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
    editOption.addEventListener('click', (event) => {
        event.stopPropagation();
        // Handle edit action
       // console.log('Edit option clicked');
        const boardContainer = document.getElementById('board-container');

        const newDialogBox = createNewDialogBox('editBoard', 'editBoardDialogBox');
        const dialogBoxHeading = createdialogBoxHeading('Edit Board');
        const hr1 = createHR('hr3');
        const boardTitle = setNewBoardTitle();
        const prevBoardTitleVal = event.target.closest('#parentTitleContainer').children[0].children[1].innerHTML;
        // console.log(prevBoardTitleVal);
        const boardTitleInput = createNewBoardTitleInput(prevBoardTitleVal);
        const boardDescription = createBoardDescription();
        const prevBoardDescVal = event.target.closest('.header').children[1].innerHTML;
        // console.log(prevBoardDescVal);
        const boardDescriptionInput = createNewBoardDescriptionInput(prevBoardDescVal);
        // const boardColor = createNewBoardColorParentDiv();
        // const boardColorsContainer = createBoardColorsContainer();
        
        // const prevSelectedColor = event.target.closest('#parentTitleContainer').children[0].children[0].style.backgroundColor;
        // setColorsInColorContainer(boardColorsContainer, prevSelectedColor);

        const hr2 = createHR('hr4');

        const buttonContainer = createButtonContainer();
        const cancelButton = createCancelButton(newDialogBox);
        const submitButton = createAndSetSubmitButtonToModifyBoardTitle(boardTitleInput, boardDescriptionInput, newDialogBox, newBoardColorId, event);

        buttonContainer.append(cancelButton);
        buttonContainer.append(submitButton);
        
        newDialogBox.append(dialogBoxHeading);
        newDialogBox.append(hr1);
        newDialogBox.append(boardTitle);
        newDialogBox.append(boardTitleInput);
        newDialogBox.append(boardDescription);
        newDialogBox.append(boardDescriptionInput);
        // newDialogBox.append(boardColor);
        // newDialogBox.append(boardColorsContainer);
        newDialogBox.append(hr2);
        newDialogBox.append(buttonContainer);
    
    
        boardContainer.append(newDialogBox);
    
        newDialogBox.showModal();
    });
    return editOption;
}

const createDeleteOption = () => {
    const deleteOption = document.createElement('li');
    deleteOption.setAttribute('class', 'delete');
    deleteOption.textContent = 'Delete';
    deleteOption.addEventListener('click', (event) => {
        event.stopPropagation();
        // Handle delete action
        const board = event.target.closest('.board');
        //console.log('Board removed: ' + board.getAttribute('id'));

        createWarningDialogBox(board);
        // board.remove();
        // rewrite3DotsContId();
        // threeDotsFun();
    });
    return deleteOption;
}

const createWarningDialogBox = (board) => {
    const boardContainer = document.getElementById('board-container');

    const newDialogBox = createNewDialogBox('warning', 'warningDialogBox');
    const dialogBoxHeading = createWarningDialogBoxHeading('Are you sure you want to delete ' + board.getAttribute('id') + '?');

    const buttonContainer = createButtonContainer();
    const noButton = createNoButton(newDialogBox);
    const yesButton = createYesButton(board, newDialogBox);

    buttonContainer.append(yesButton);
    buttonContainer.append(noButton);
    
    newDialogBox.append(dialogBoxHeading);
    newDialogBox.append(buttonContainer);

    boardContainer.append(newDialogBox);

    newDialogBox.showModal();

}

const createNoButton = (newDialogBox) => {
    const noButton = createElement('div');
    noButton.classList.add('warningDialogBoxButtons');
    noButton.classList.add('noButton');
    noButton.setAttribute('id', 'noButton');
    noButton.innerHTML = 'No';
    noButton.addEventListener('click', () => newDialogBox.remove());
    return noButton;
}

const createYesButton = (board, newDialogBox) => {
    const yesButton = createElement('div');
    yesButton.classList.add('warningDialogBoxButtons');
    // yesButton.classList.add('Button');
    yesButton.setAttribute('id', 'yesButton');
    yesButton.innerHTML = 'Yes';
    yesButton.addEventListener('click', () => {
        board.remove();
        rewrite3DotsContId();
        threeDotsFun();
        newDialogBox.remove();
    });
    return yesButton;
}

const rewrite3DotsContId = () => {
    let i=0;
    const threeDotsImgContainer = document.querySelectorAll('.threeDotsImagecontainer');
    threeDotsImgContainer.forEach(cont => {
        cont.setAttribute('id', 'threeDotsImagecontainer'+i);
        i++;
    })
}

const calcMenuPos = (threeDotsImg, menu, event) => {
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
    b.setAttribute('id', 'board'+id);
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
        createAndSetTask(`${task.name}`, tasksContainer, `${task.taskId}`);
    }
}

const createNewTask = (value, ref, boardColor, id, board) => {
    let kanbanBoardData = JSON.parse(localStorage.getItem('kanban')); 

    const obj = createAndSetTask(value, ref, id);
    console.log(obj);
    obj.val.style.backgroundColor = boardColor;

    // console.log('Tasks container length: ' + ref.childElementCount);
    const newTaskObj = convertNewTaskToObj(id, value, ref.childElementCount);
    kanbanBoardData.boards[board].tasks.push(newTaskObj);
    localStorage.setItem('kanban', JSON.stringify(kanbanBoardData));
    // console.log(JSON.parse(localStorage.getItem('kanban')));

    dragEventListener(obj.val);
    countTasks();

    return obj.ref;
}

const createAndSetTask = (value, ref, id=null) => {
    const taskDiv = createEmptyTask(id);

    const taskSubContainer1 = createTaskSubCont('taskSubCont1');
    const taskSubContainer2 = createTaskSubCont('taskSubCont2');
    const taskSubContainer3 = createTaskSubCont('taskSubCont3');

    const childTaskDiv = createChildTask(value);
    taskSubContainer2.appendChild(childTaskDiv);

    const delButton = createTaskContButtons('taskContBtn','delBtnDiv');
    const lockButton = createTaskContButtons('taskContBtn','lockBtnDiv');
    const unlockButton = createTaskContButtons('taskContBtn','unlockBtnDiv');
    unlockButton.style.display = 'none';

    const delButtonImg = createTaskContBtnImg('delete.png', 'Delete');
    delButtonImg.addEventListener('click', setDelBtnEventListener);
    delButton.append(delButtonImg);

    const lockButtonImg = createTaskContBtnImg('lock.png', 'Lock');
    lockButtonImg.addEventListener('click', () => {
        setLockBtnEventListener(event, lockButton, unlockButton);
    });
    lockButton.append(lockButtonImg);

    const unlockButtonImg = createTaskContBtnImg('unlock.png', 'UnLock');
    unlockButtonImg.addEventListener('click', () => {
        setUnLockBtnEventListener(event, lockButton, unlockButton);
    });
    unlockButton.append(unlockButtonImg);

    taskSubContainer3.append(delButton);
    taskSubContainer3.append(lockButton);
    taskSubContainer3.append(unlockButton);

    taskSubContainer1.appendChild(taskSubContainer2);
    taskSubContainer1.appendChild(taskSubContainer3);
    taskDiv.append(taskSubContainer1);
    ref.append(taskDiv);

    return {val: taskDiv, ref: taskSubContainer2};
}

const createTaskSubCont = (taskSubCont) => {
    const taskSubContainer1 = document.createElement('div');
    taskSubContainer1.classList.add(taskSubCont);
    return taskSubContainer1;
}

const createTaskContButtons = (taskContBtn, id) => {
    const taskContButton = document.createElement('div');
    taskContButton.classList.add(taskContBtn);
    taskContButton.setAttribute('id', id);
    return taskContButton;
}

const createTaskContBtnImg = (img, altVal) => {
    const taskContButtonImg = document.createElement('img');
    taskContButtonImg.setAttribute('src', `/Images/${img}`);
    taskContButtonImg.setAttribute('alt', altVal);
    taskContButtonImg.setAttribute('class', 'img');
    taskContButtonImg.setAttribute('id', altVal);
    return taskContButtonImg;
}

const setDelBtnEventListener = (event) => {
    event.stopPropagation();
    console.log('Delete Button clicked');
    const task = event.target.closest('.task');
    task.remove();
    countTasks();
}

const setLockBtnEventListener = (event, lockButton, unlockButton) => {
    event.stopPropagation();
    // const tsk = event.target.closest('.taskSubCont1').children[0].children[1].innerHTML;
    // console.log('tsk: ' + tsk);
    lockButton.style.display = 'none';
    unlockButton.style.display = 'block';
    event.target.closest('.task').setAttribute('draggable', 'true');
    event.target.closest('.taskSubCont1').children[0].children[1].setAttribute('contenteditable', 'true');
    event.target.closest('.taskSubCont1').children[0].children[1].focus();

    // Set the selection range to the end of the content
    var range = document.createRange();
    range.selectNodeContents(event.target.closest('.taskSubCont1').children[0].children[1]);
    range.collapse(false);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}

const setUnLockBtnEventListener = (event, lockButton, unlockButton) => {
    event.stopPropagation();
    unlockButton.style.display = 'none';
    lockButton.style.display = 'block';
    event.target.closest('.task').setAttribute('draggable', 'false');
    event.target.closest('.taskSubCont1').children[0].children[1].setAttribute('contenteditable', 'false');
}


const createChildTask = (val) => {
    const childTaskDiv = document.createElement('div');
    childTaskDiv.classList.add('tsk');
    // childTaskDiv.setAttribute('onClick', "this.contentEditable='true';");
    // childTaskDiv.setAttribute('contenteditable', 'true');
    childTaskDiv.innerHTML = val;
    return childTaskDiv;
}

const countBoards = () => {
    const add = document.querySelectorAll('.addItem');

    add.forEach((addTask) => {
        addTask.addEventListener('keydown', (e) => {
            const boardColor = e.target.closest('.board').children[0].children[0].children[0].children[0].style.backgroundColor;
            // console.log(color);
            const key = e.key;
            const value = addTask.value;
            if(key === 'Enter' && value.trim() !== '' && document.activeElement.tagName === 'INPUT') {
                const ref = addTask.parentNode.parentNode.children[1];  //tasks-container class item of that board is selected
                const board = addTask.closest('.board').getAttribute('id').slice(-1) - 1;
                // console.log('Board: ' + board);
                const newTaskId = document.querySelectorAll('.task').length + 1;
                const newTask = createNewTask(value, ref, boardColor, newTaskId, board);
                addTask.value = '';
                createDraft(newTask);
            }
        })
    })
}

const createEmptyTask = (id) => {
    const t = createElement('div');
    t.setAttribute('class', 'task');
    t.setAttribute('id', 'task'+id);
    t.setAttribute('draggable', 'false');
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
    

const createNewDialogBox = (dialogBox, dialogBoxClass) => {
    const newDialogBox = createElement('dialog');
    newDialogBox.setAttribute('class', dialogBoxClass);
    newDialogBox.setAttribute('id', dialogBox);
    return newDialogBox;
}
    
const createdialogBoxHeading = (heading) => {
    const dialogBoxHeading = createElement('div');
    dialogBoxHeading.setAttribute('class', 'dialogBoxHeading');
    dialogBoxHeading.innerHTML = heading;
    return dialogBoxHeading;
}

const createWarningDialogBoxHeading = (heading) => {
    const dialogBoxHeading = createElement('div');
    dialogBoxHeading.setAttribute('class', 'warningDialogBoxHeading');
    dialogBoxHeading.innerHTML = heading;
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

const createNewBoardTitleInput = (val) => {
    const boardTitleInput = createElement('input');
    boardTitleInput.setAttribute('class', 'dialogBodyInput');
    boardTitleInput.setAttribute('id', 'dialogBodyInput');
    boardTitleInput.value = val;
    return boardTitleInput;
}


const createBoardDescription = () => {
    const boardDescription = createElement('div');
    boardDescription.setAttribute('class', 'dialogBody');
    boardDescription.innerHTML = 'Description';
    return boardDescription;
}

const createNewBoardDescriptionInput = (val) => {
    const boardDescriptionInput = createElement('textarea');
    boardDescriptionInput.setAttribute('class', 'dialogBodyInput');
    boardDescriptionInput.setAttribute('id', 'dialogBodyInput');
    boardDescriptionInput.value = val;
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

const setColorsInColorContainer = (boardColorsContainer, defaultSelection) => {
    for(let i=0; i < sampleData.colors.length; i++) {
        const colorDiv = createElement('div');
        colorDiv.setAttribute('type', 'text');
        colorDiv.setAttribute('id', i);
        colorDiv.classList.add('colors');
        colorDiv.style.border = `2px solid ${sampleData.colors[i]}`;
        colorDiv.style.backgroundColor = `${sampleData.bgColors[i]}`;
        colorDiv.addEventListener('click', (e) => fun(e));

        if(defaultSelection !== null && (defaultSelection === colorDiv.style.backgroundColor)) {
            colorDiv.innerHTML = "&nbsp;✓";
            newBoardColorId = colorDiv.getAttribute('id');
        }
        boardColorsContainer.append(colorDiv);
    }
}

const createButtonContainer = () => {
    const buttonContainer = createElement('div');
    buttonContainer.setAttribute('class', 'buttonContainer');
    return buttonContainer;
}

const createCancelButton = (newDialogBox) => {
    const cancelButton = createElement('div');
    cancelButton.setAttribute('class', 'dialogButton');
    cancelButton.setAttribute('id', 'cancelButton');
    cancelButton.innerHTML = 'Cancel';
    cancelButton.addEventListener('click', () => newDialogBox.remove());
    return cancelButton;
}

const createAndSetSubmitButtonToAddNewBoard = (boardTitleInput, boardDescriptionInput, newDialogBox) => {
    const submitButton = createSubmitButton();

    submitButton.addEventListener('click', () => {
        if(boardTitleInput.value.replace(/\s+/g,' ').trim() !== '') {
            if(boardDescriptionInput.value.replace(/\s+/g,' ').trim() !== '') {
                if(newBoardColorId !== null) {
                    createNewBoard(boardTitleInput.value, boardDescriptionInput.value, newBoardColorId);
                    newDialogBox.remove();
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

const createAndSetSubmitButtonToModifyBoardTitle = (boardTitleInput, boardDescriptionInput, newDialogBox, id, event) => {
    const submitButton = createSubmitButton();

    submitButton.addEventListener('click', () => {
        if(boardTitleInput.value.replace(/\s+/g,' ').trim() !== '') {
            if(boardDescriptionInput.value.replace(/\s+/g,' ').trim() !== '') {
                // if(newBoardColorId !== null) {
                    modifyBoardTitle(boardTitleInput.value, boardDescriptionInput.value, id, event);
                    // newDialogBox.close();
                    newDialogBox.remove();
                    const menu = document.querySelector('.menu');
                    //console.log('Menu: ' + menu);
                    if (menu) {
                        menu.remove();
                    }
                // } else {
                //     alert('Board color must be selected');
                // }
                
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

const modifyBoardTitle = (tit, desc, id, e) => {
    e.target.closest('#parentTitleContainer').children[0].children[1].innerHTML = tit;
    e.target.closest('.header').children[1].innerHTML = desc;
    //console.log('Id: ' + `${sampleData.bgColors[id]}`);
    e.target.closest('#parentTitleContainer').children[0].children[0].style.backgroundColor = `${sampleData.bgColors[id]}`;
    e.target.closest('#parentTitleContainer').children[0].children[0].style.border = `2px solid ${sampleData.colors[id]}`;

    let kanbanBoardData = JSON.parse(localStorage.getItem('kanban')); 
    const boardId = e.target.closest('.board').getAttribute('id').slice(-1) - 1;
    // console.log(kanbanBoardData.boards[boardId]);
    kanbanBoardData.boards[boardId].title = tit;
    kanbanBoardData.boards[boardId].description = desc;
    localStorage.setItem('kanban', JSON.stringify(kanbanBoardData));
}

const createSubmitButton = () => {
    const submitButton = createElement('div');
    submitButton.setAttribute('class', 'dialogButton');
    submitButton.setAttribute('id', 'submitButton');
    submitButton.innerHTML = 'Submit';
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

const threeDotsFun = () => {
    const threeDotsImgContainer = document.querySelectorAll('.threeDotsImagecontainer');
    // Ensure all 3 dots are removed beforehand
    removeExistingThreeDots();
    threeDotsImgContainer.forEach(container => createThreeDots(container));    
}

const removeExistingThreeDots = () => {
    const existingContainers = document.querySelectorAll('.threeDotsImg');
    existingContainers.forEach(cont => cont.remove());  
}

const createThreeDots = (container) => {
    const fullId = container.getAttribute('id');
    const id = fullId.charAt(fullId.length - 1);
    const threeDotsImg = createAndSetThreeDotsImg(id);
    container.append(threeDotsImg);
}

const setTasksColor = () => {
    const totalBoards = document.querySelectorAll('.board');
    totalBoards.forEach(board => {
        const boardColor = board.children[0].children[0].children[0].children[0].style.backgroundColor;

        const tasks = board.querySelectorAll('.task');
        tasks.forEach(task => {
            task.style.backgroundColor = boardColor;
        })

        taskColorChangeonDragover(board, boardColor);
    })
}

const taskColorChangeonDragover = (board, boardColor) => {
    board.addEventListener('dragover', () => {
        //console.log('Task dragging over board: ' + board.getAttribute('id'));
        const draggingTask = document.querySelector('.is-Dragging');
        draggingTask.style.backgroundColor = boardColor;
    })
}


const searchTasks = () => {
    const totalBoards = document.querySelectorAll('.board');
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keyup', (e) => {
        const val = e.target.value.trim().toLowerCase();
        totalBoards.forEach(board => {
            const tasks = board.querySelectorAll('.task');
            tasks.forEach(task => {
                task.style.display = 'block';
                const tsk = task.querySelector('.tsk');
                const origText = tsk.textContent;
                const taskText = tsk.textContent.toLowerCase();

                const index = taskText.indexOf(val);

                if(index !== -1) {
                    const highlightedText = origText.substring(0, index) + '<span class="highlight">' +
                                            origText.substring(index, index + val.length) + '</span>' +
                                            origText.substring(index + val.length);
                    tsk.innerHTML = highlightedText;
                } else {
                    // tsk.innerHTML = origText;
                    task.style.display = 'none';
                }
                
            })
        })
    })
}


// const setLocalStorageInitiallyFromData = () => {
//     localStorage.setItem('kanban', JSON.stringify(sampleData));
//     const kanbanBoard = JSON.parse(localStorage.getItem('kanban'));
//     // console.log(kanbanBoard.bgColors);
//     // for(let board of kanbanBoard.boards) {
//     //     console.log(board.boardId);
//     // }
// }

// setLocalStorageInitiallyFromData();
init();
countBoards();
threeDotsFun();
setTasksColor();
searchTasks();