import { CREATE_TASK_START, CREATE_TASK_STEP_START, DELETE_TASK_START, DELETE_TASK_STEP_START, FETCH_TASK_LIST_START, FETCH_TASK_START, MOVE_TASK_START, UPDATE_TASK_START, UPDATE_TASK_STEP_START } from "./taskActionTypes";

import {takeLatest, call, put} from 'redux-saga/effects';
import { createTaskAPI, createTaskStepAPI, deleteTaskAPI, deleteTaskStepAPI, getTaskByTaskIdAPI, getTaskListAPI, moveTaskAPI, updateTaskAPI, updateTaskStepAPI } from "../apis";
import { addNextStepSucc, createTaskSucc, deleteTaskSucc, fetchTaskSucc, fetTaskList, fetTaskListSucc, moveTaskSucc, setShowTasks, setTaskDetailShow, updateTaskListSucc, updatetaskStepSucc, updateTaskSucc } from "./taskActions";
import { handleAPIError, isMobile } from "../../utils/GlobalFuns";
import { setListCounter, updateList } from "../list/listActions";

export function* onFetchTaskList() {
    yield takeLatest(FETCH_TASK_LIST_START,onFetchTaskListAsync)
}

export function* onFetchTaskListAsync(payload){
    try {
        const response = yield call(getTaskListAPI,payload.listId);
        if(response.status===200){
            const data = response.data;
            const taskList = Object.values(data);
            const taskListKeys = Object.keys(data);
            yield put(fetTaskListSucc(taskList,taskListKeys));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onFetchTask(){
    yield takeLatest(FETCH_TASK_START, onFetchTaskAsync)
}

export function* onFetchTaskAsync(payload){
    try {
        const response = yield call(getTaskByTaskIdAPI,payload.taskId);
        if(response.status===200){
            yield put(fetchTaskSucc(response.data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onCreateTask(){
    yield takeLatest(CREATE_TASK_START,onCreateTaskAsync);
}

export function* onCreateTaskAsync(payload){
    try {
        const response = yield call(createTaskAPI,payload.task);
        if(response.status===200){
            const data =response.data;
            const task = data.todoTask;
            yield put(createTaskSucc(task));
            yield put(setListCounter(payload.todoList,'add'))
            if(payload.todoList.listName==='Important'){
                const tempList = {
                    listId:task.listId,
                    listName:task.listName,
                    groupName:'default'
                }
                yield put(setListCounter(tempList,'add'));
            }
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onUpdateTask(){
    yield takeLatest(UPDATE_TASK_START,onUpdateTaskAsync);
}

export function* onUpdateTaskAsync(payload){
    try {
        const task = payload.payload.task;
        const action = payload.payload.action;
        const impList = payload.payload.impList;
        const todoList = payload.payload.todoList;
        const response = yield call(updateTaskAPI,task,action);
        if(response.status===200){
            yield put(updateTaskListSucc(task,action,todoList,false));
            yield put(updateTaskSucc(task));
            if(action==='important'){
                    if(task.important){
                        yield put(setListCounter(impList,'add'))
                    }else{
                        yield put(setListCounter(impList,'reduce'))
                        if(todoList.listName==='Important'){
                            yield put(setTaskDetailShow(false));
                            if(isMobile()){
                                yield put(fetTaskList(todoList.listId));
                                yield put(setShowTasks(true));
                            }
                        }
                    }              
            }
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onDeleteTask(){
    yield takeLatest(DELETE_TASK_START,onDeleteTaskAsync)
}

export function* onDeleteTaskAsync(payload){
    try {
        const response = yield call(deleteTaskAPI,payload);
        if(response.status===200){
            if(response.data.status==='success'){
                if(payload.list.sortedtasks!==null){
                    payload.list.sortedtasks = payload.list.sortedtasks.split(",").map(t=>Number(t)).filter(t=>{return payload.task.taskId!==t}).toString();
                    yield put(updateList(payload.list));
                }
                yield put (setListCounter(payload.list,'reduce'));
                yield put(deleteTaskSucc(payload.task));
                if(isMobile()){
                    yield put(fetTaskList(payload.list.listId));
                    yield put(setShowTasks(true));
                }
            }
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onMoveTask(){
    yield takeLatest(MOVE_TASK_START,onMoveTaskAsync)
}

export function* onMoveTaskAsync(payload){
    try {
        const response = yield call(moveTaskAPI,payload);
        if(response.status===200){
            if(response.data.status==='success'){
                yield put(setListCounter(payload.targetList,'add'));
                yield put(setListCounter(payload.currentList,'reduce'));
                yield put(moveTaskSucc(payload.task));
            }
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onCreateTaskStep(){
    yield takeLatest(CREATE_TASK_STEP_START,onCreateTaskStepAsync)
}

export function* onCreateTaskStepAsync(payload){
    try {
        const response = yield call(createTaskStepAPI,payload);
        if(response.status===200){
            const data = response.data;
            yield put(updateTaskSucc(data.todoTask));
            yield put(updateTaskListSucc(data.todoTask,payload.action,payload.todoList,true));
            yield put(addNextStepSucc())
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onUpdateTaskStep(){
    yield takeLatest(UPDATE_TASK_STEP_START,onUpdateTaskStepAsync)
}

export function* onUpdateTaskStepAsync(payload){
    try {
        const response = yield call(updateTaskStepAPI,payload);
        if(response.status===200){
            const data = response.data;
            yield put(updateTaskSucc(data.todoTask));
            yield put(updateTaskListSucc(data.todoTask,payload.action,payload.todoList,true));
            yield put(updatetaskStepSucc())
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onDeleteTaskStep(){
    yield takeLatest(DELETE_TASK_STEP_START,onDeleteTaskStepAsync)
}

export function* onDeleteTaskStepAsync(payload){
    try {
        const response = yield call(deleteTaskStepAPI,payload);
        if(response.status===200){
            const data = response.data;
            yield put(updateTaskSucc(data.todoTask));
            yield put(updateTaskListSucc(data.todoTask,payload.action,payload.todoList,true));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}