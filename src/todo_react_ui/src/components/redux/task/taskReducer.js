import { INIT, LOADING } from "../todoActionTypes"
import { addListToTaskList, addTaskToTaskList, getUpdatedTaskList, removeTask } from "./taskActions"
import { CREATE_TASK_START, CREATE_TASK_STEP_START, CREATE_TASK_STEP_SUCCESS, CREATE_TASK_SUCCESS, DELETE_TASK_START, DELETE_TASK_STEP_START, DELETE_TASK_STEP_SUCCESS, DELETE_TASK_SUCCESS, FETCH_TASK_LIST_START, FETCH_TASK_LIST_SUCCESS, FETCH_TASK_START, FETCH_TASK_SUCCESS, MOVE_TASK_START, MOVE_TASK_SUCCESS, SET_SHOW_TASKS, SET_SHOW_TASK_ADD, SET_TASK_DETAIL_SHOW, UPDATE_TASK_LIST_SUCCESS, UPDATE_TASK_START, UPDATE_TASK_STEP_START, UPDATE_TASK_STEP_SUCCESS, UPDATE_TASK_SUCCESS, UPDATE_TASK_TODO_LIST } from "./taskActionTypes"

export const initialState = {
    taskList:[],
    taskListKeys:[],
    taskDetail:{},
    taskDetailShow: false,
    showTaskAdd:false,
    showTasks:true,
    phase:INIT
}

export const taskReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_TASK_LIST_START:
            return{
                ...state,
                phase:LOADING
            }
        case FETCH_TASK_LIST_SUCCESS:
            return{
                ...state,
                taskList:action.taskList,
                taskListKeys:action.taskListKeys,
                phase:FETCH_TASK_LIST_SUCCESS
            }
        case UPDATE_TASK_LIST_SUCCESS:
            return{
                ...state,
                taskList: getUpdatedTaskList([...state.taskList],[...state.taskListKeys],action),
                phase:UPDATE_TASK_LIST_SUCCESS
            }
        case UPDATE_TASK_TODO_LIST:
            return{
                ...state,
                taskList: addListToTaskList([...state.taskList],[...state.taskListKeys],action.todoList)
            }
        case FETCH_TASK_START:
            return{
                ...state,
                phase:LOADING
            }
        case FETCH_TASK_SUCCESS:
            return{
                ...state,
                taskDetail:action.task,
                taskDetailShow:true,
                phase:FETCH_TASK_SUCCESS
            }
        case CREATE_TASK_START:
            return{
                ...state,
                phase:LOADING
            }
        case CREATE_TASK_SUCCESS:
            const addTaskRes = addTaskToTaskList([...state.taskList],[...state.taskListKeys],action.task);
            return{
                ...state,
                taskList:addTaskRes.taskList,
                taskListKeys:addTaskRes.taskListKeys,
                showTaskAdd:false,
                phase:CREATE_TASK_SUCCESS
            }
        case UPDATE_TASK_START:
            return{
                ...state,
                phase:LOADING
            }
        case UPDATE_TASK_SUCCESS:
            return{
                ...state,
                taskDetail:action.task,
                phase:UPDATE_TASK_SUCCESS
            }
        case DELETE_TASK_START:
            return{
                ...state,
                phase:LOADING
            }
        case DELETE_TASK_SUCCESS:
            return{
                ...state,
                taskList:removeTask([...state.taskList],[...state.taskListKeys],action.task),
                taskDetailShow:false,
                phase:DELETE_TASK_SUCCESS
            }
        case CREATE_TASK_STEP_START:
            return{
                ...state,
                phase:LOADING
            }
        case CREATE_TASK_STEP_SUCCESS:
            return{
                ...state,
                phase:CREATE_TASK_STEP_SUCCESS
            }
        case UPDATE_TASK_STEP_START:
            return{
                ...state,
                phase:LOADING
            }
        case UPDATE_TASK_STEP_SUCCESS:
        return{
            ...state,
            phase:UPDATE_TASK_STEP_SUCCESS
        }
        case DELETE_TASK_STEP_START:
            return{
                ...state,
                phase:LOADING
            }
        case DELETE_TASK_STEP_SUCCESS:
        return{
            ...state,
            phase:UPDATE_TASK_STEP_SUCCESS
        }
        case SET_TASK_DETAIL_SHOW:
            return{
                ...state,
                taskDetailShow:action.taskDetailShow,
                taskDetail:!action.taskDetailShow?null:state.taskDetail,
                showTaskAdd:false
            }
        case MOVE_TASK_START:
            return{
                ...state,
                phase:LOADING
            }
        case MOVE_TASK_SUCCESS:
            return{
                ...state,
                taskList:removeTask([...state.taskList],[...state.taskListKeys],action.task),
                taskDetailShow:false,
                phase:MOVE_TASK_SUCCESS
            }
        case SET_SHOW_TASK_ADD:
            return{
                ...state,
                showTaskAdd:action.showTaskAdd
            }
        case SET_SHOW_TASKS:
            return{
                ...state,
                showTasks:action.showTasks
            }
        default:
            return {
                ...state,
                phase:INIT
            }
    }
}