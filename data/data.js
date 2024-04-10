export default { 
    colors : ['#008000', '#235AAD', '#E4A72C', '#E4542C'],
    bgColors : ['#DBFCDB', '#C9E0FD', '#FEE3B1', '#FEC8BC'],
    boards : [
        {
            boardId : 1,
            color : '#008000',
            bgColor : '#DBFCDB',
            title : 'Tasks List',
            description : "This item hasn't been started",
            tasks : [
                {
                    taskId : 1,
                    name : 'Task 1',
                    order : 1,
                },
                {
                    taskId : 2,
                    name : 'Task 2',
                    order : 2,
                },
                {
                    taskId : 3,
                    name : 'Task 3',
                    order : 3,
                },
                {
                    taskId : 4,
                    name : 'Task 4',
                    order : 4,
                },
                {
                    taskId : 5,
                    name : 'Task 5',
                    order : 5,
                },
                {
                    taskId : 6,
                    name : 'Task 6',
                    order : 6,
                },
                {
                    taskId : 7,
                    name : 'Task 7',
                    order : 7,
                },
            ]
        },
        {
            boardId : 2,
            color : '#235AAD',
            bgColor : '#C9E0FD',
            title : 'Ready',
            description : 'This is ready to be picked up',
            tasks : [
                {
                    taskId : 8,
                    name : 'Task 8',
                    order : 1,
                },
                {
                    taskId : 9,
                    name : 'Task 9',
                    order : 2,
                },
            ]
        },
        {
            boardId : 3,
            color : '#E4A72C',
            bgColor : '#FEE3B1',
            title : 'In Progress',
            description : 'This is actively being worked on',
            tasks : [
                {
                    taskId : 10,
                    name : 'Task 10',
                    order : 1,
                },
            ]
        },
        {
            boardId : 4,
            color : '#E4542C',
            bgColor : '#FEC8BC',
            title : 'Done',
            description : 'This has been completed',
            tasks : [
                
            ]
        }
    ]
 };