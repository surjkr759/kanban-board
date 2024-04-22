// const countBoards = () => {
//     const add = document.querySelectorAll('.addItem');

//     add.forEach((addTask) => {
//         addTask.addEventListener('keydown', (e) => {
//             const boardColor = e.target.closest('.board').children[0].children[0].children[0].children[0].style.backgroundColor;
//             // console.log(color);
//             const key = e.key;
//             const value = addTask.value;
//             if(key === 'Enter' && value.trim() !== '' && document.activeElement.tagName === 'INPUT') {
//                 const ref = addTask.parentNode.parentNode.children[1];
//                 const newTask = createNewTask(value, ref, boardColor);
//                 addTask.value = '';
//                 createDraft(newTask);
//             }
//         })
//     })
// }

// countBoards();
// const tasksContainer = document.querySelectorAll('.tasks-container');



// const createNewTask = (value, ref, boardColor) => {
//     const taskDiv = createEmptyTask();
//     taskDiv.style.backgroundColor = boardColor;

//     const taskSubContainer1 = document.createElement('div');
//     taskSubContainer1.classList.add('taskSubCont1');

//     const taskSubContainer2 = document.createElement('div');
//     taskSubContainer2.classList.add('taskSubCont2');

//     const childTaskDiv = document.createElement('div');
//     childTaskDiv.classList.add('tsk');
//     childTaskDiv.innerHTML = value;

//     taskSubContainer2.appendChild(childTaskDiv);
//     taskSubContainer1.appendChild(taskSubContainer2);
//     taskDiv.appendChild(taskSubContainer1);
//     ref.appendChild(taskDiv);

//     dragEventListener(taskDiv);

//     countTasks();

//     return taskSubContainer2;
// }
