import { CREATE_TASK_START, CREATE_TASK_SUCCESS,CREATE_TASK_STEP_START,CREATE_TASK_STEP_SUCCESS,
            FETCH_TASK_LIST_START, FETCH_TASK_LIST_SUCCESS, FETCH_TASK_START, FETCH_TASK_SUCCESS,
            UPDATE_TASK_LIST_SUCCESS, UPDATE_TASK_START, UPDATE_TASK_SUCCESS, UPDATE_TASK_TODO_LIST,
            DELETE_TASK_START, DELETE_TASK_SUCCESS, 
            MOVE_TASK_START, MOVE_TASK_SUCCESS, SET_SHOW_TASKS, SET_SHOW_TASK_ADD, SET_TASK_DETAIL_SHOW, UPDATE_TASK_STEP_START, UPDATE_TASK_STEP_SUCCESS, DELETE_TASK_STEP_START, DELETE_TASK_STEP_SUCCESS, 
        } from "./taskActionTypes";

export const fetTaskList = (listId) => ({
    type:FETCH_TASK_LIST_START,
    listId
})

export const fetTaskListSucc = (taskList,taskListKeys) => ({
    type:FETCH_TASK_LIST_SUCCESS,
    taskList,
    taskListKeys
})

export const fetchTask = (taskId) => ({
    type:FETCH_TASK_START,
    taskId
})

export const fetchTaskSucc = (task) => ({
    type:FETCH_TASK_SUCCESS,
    task
})

export const createTask = (task,todoList) => ({
    type: CREATE_TASK_START,
    task,
    todoList
})

export const createTaskSucc = (task) => ({
    type:CREATE_TASK_SUCCESS,
    task
})

export const updateTaskListSucc = (task,action,todoList,isTaskStep) =>({
    type:UPDATE_TASK_LIST_SUCCESS,
    task,
    action,
    todoList,
    isTaskStep
})

export const updateTask =(payload) => ({
    type:UPDATE_TASK_START,
    payload
})

export const updateTaskSucc = (task) => ({
    type: UPDATE_TASK_SUCCESS,
    task
})

export const deleteTask = (task,list) => ({
    type:DELETE_TASK_START,
    task,
    list
})

export const deleteTaskSucc = (task) => ({
    type:DELETE_TASK_SUCCESS,
    task
})

export const addNextStep = (task,addNxtStepPayload,todoList) => ({
    type:CREATE_TASK_STEP_START,
    task,
    addNxtStepPayload,
    todoList
})

export const addNextStepSucc = () => ({
    type:CREATE_TASK_STEP_SUCCESS
})

export const updatetaskStep = (payload,action) => ({
    type:UPDATE_TASK_STEP_START,
    payload,
    action
})

export const updatetaskStepSucc = () => ({
    type:UPDATE_TASK_STEP_SUCCESS
})

export const deleteTaskStep = (stepId) => ({
    type:DELETE_TASK_STEP_START,
    stepId
})

export const deleteTaskStepSucc = () => ({
    type:DELETE_TASK_STEP_SUCCESS
})

export const setTaskDetailShow = (TaskDetailShow) => ({
    type:SET_TASK_DETAIL_SHOW,
    TaskDetailShow
})

export const setShowTaskAdd = (showTaskAdd) => ({
    type:SET_SHOW_TASK_ADD,
    showTaskAdd
})

export const setShowTasks = (showTasks) => ({
    type:SET_SHOW_TASKS,
    showTasks
})

export const updateTaskTodoList = (todoList) => ({
    type:UPDATE_TASK_TODO_LIST,
    todoList
})


export const moveTask = (task,targetList,currentList) => ({
    type:MOVE_TASK_START,
    task,
    targetList,
    currentList
})

export const moveTaskSucc = (task) => ({
    type:MOVE_TASK_SUCCESS,
    task
})

export const addTaskToTaskList = (taskList, taskListKeys, task) => {
    let taskIndexT = taskListKeys.findIndex(obj => obj==="taskListT");
    let taskListT;
    if(taskIndexT===-1){
        taskIndexT = taskList.length;
        taskListT = [];
        taskListKeys[taskIndexT] = "taskListT";
    }else{
        taskListT = taskList[taskIndexT];
    }
    taskListT.push(task);
    taskList[taskIndexT] = taskListT;
    return {taskList,taskListKeys};
}

export const addListToTaskList = (taskList, taskListKeys, list) => {
    let listIndex = taskListKeys.findIndex(obj => obj==="todoList");
    taskList[listIndex]=[list];
    return taskList;
}

export const getUpdatedTaskList = (taskList, taskListKeys, action) => {
    const task = action.task;
    let taskIndexT = taskListKeys.findIndex(obj => obj==="taskListT");
	let taskIndexC = taskListKeys.findIndex(obj => obj==="taskListC");
    let taskListC = taskList[taskIndexC];
    let taskListT = taskList[taskIndexT];
    if(action.action==='complete' && !action.isTaskStep){
        if(task.completed){
            taskListT = taskListT.filter((elem) => {return elem.taskId!==task.taskId});
            taskListC.push(task);
        }else{
            taskListC = taskListC.filter((elem) => {return elem.taskId!==task.taskId});
            taskListT.push(task);
        }
    }else if(action.action==='important' && !task.important && action.todoList.listName==='Important'){
        if(task.completed){
            taskListC = taskListC.filter((elem) => {return elem.taskId!==task.taskId});
        }else{
            taskListT = taskListT.filter((elem) => {return elem.taskId!==task.taskId});
        }
    }else{
        if(task.completed){
            taskListC.forEach((elem,index) => {
                if(elem.taskId===task.taskId){
                    taskListC[index]=task;
                }
            });
        }else{
            taskListT.forEach((elem,index) => {
                if(elem.taskId===task.taskId){
                    taskListT[index]=task;
                }
            });
        }
    }
    taskList[taskIndexC] = taskListC;
    taskList[taskIndexT] = taskListT;
    return taskList;
}

export const removeTask = (taskList,taskListKeys,task) => {
    let taskIndexT = taskListKeys.findIndex(obj => obj==="taskListT");
	let taskIndexC = taskListKeys.findIndex(obj => obj==="taskListC");
    let taskListC = taskList[taskIndexC];
    let taskListT = taskList[taskIndexT];
    if(task.completed){
        taskListC = taskListC.filter((elem) => {return elem.taskId!==task.taskId});
        taskList[taskIndexC] = taskListC;
    }else{
        taskListT = taskListT.filter((elem) => {return elem.taskId!==task.taskId});
        taskList[taskIndexT] = taskListT;
    }
    return taskList;
}