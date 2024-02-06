import { ADD_LIST_ARCHIVE_START, CREATE_LIST_START, DELETE_LIST_START, FETCH_LISTS_START, FETCH_LIST_ORDER_START, UPDATE_LIST_ORDER_START, UPDATE_LIST_START } from "./listActionTypes";

import {takeLatest, call, put} from 'redux-saga/effects';
import { archiveListAPI, createListAPI, deleteListAPI, fetchListOrderAPI, getUserListsAPI, updateListAPI, updateListOrderAPI } from "../apis";
import { addListToArchiveSucc, createListSucc, deleteListSucc, fetchListOrderSucc, fethUserListsSucc, updateListOrder, updateListOrderSucc, updateListSucc } from "./listActions";
import { fetTaskList, updateTaskTodoList } from "../task/taskActions";
import { createFilteredListOrderFromArry, getChangedListOrder, handleAPIError } from "../../utils/GlobalFuns";
import { ACTION_ADD_ITEM, ACTION_REMOVE_ITEM, TOKEN_EXPIRED } from "../todoActionTypes";
import { setIsAuthenticated } from "../login/loginActions";

export function* onFetchUserLists(){
    yield takeLatest(FETCH_LISTS_START, onFetchUserListsAsnc);
}

export function* onFetchUserListsAsnc(payload){
    try {
        const response = yield call(getUserListsAPI);
        if(response.status===200){
            const data = response.data;
            if(data.status==="TOKEN_EXPIRED"){
                document.cookie="jToken=;";
                window.location.reload();
            }
            const userLists = Object.values(data);
            const userListsKeys = Object.keys(data);
            yield put(fethUserListsSucc(userLists,userListsKeys));
            if(!payload.isMobileDevice)
                yield put(fetTaskList(userLists[userListsKeys.findIndex(obj => obj==="default")][0].listId));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onCreateList(){
    yield takeLatest(CREATE_LIST_START,onCreateListAsync);
}

export function* onCreateListAsync(payload){
    try {
        const response = yield call(createListAPI,payload.list);
        if(response.status===200){
            const data = response.data;
            yield put(createListSucc(data.todoList));
        }
    } catch (error) {
        handleAPIError(error);
    }
}

export function* onUpdateList(){
    yield takeLatest(UPDATE_LIST_START, onUpdateListAsync);
}

export function* onUpdateListAsync(payload){
    try {
        const response = yield call(updateListAPI,payload);
        if(response.status===200){
            yield put(updateListSucc(payload.list));
            yield put(updateTaskTodoList(payload.list));
        }
    } catch (error) {
        console.log(error)
        handleAPIError(error);
    }
}

export function* onFetchListOrder(){
    yield takeLatest(FETCH_LIST_ORDER_START, onFetchListOrderAsync);
}

export function* onFetchListOrderAsync(){
    try {
        const response = yield call(fetchListOrderAPI);
        if(response.status===200){
            yield put(fetchListOrderSucc(response.data));
        }
    } catch (error) {
        console.log(error)
        handleAPIError(error);
    }
}

export function* onUpdateListOrder(){
    yield takeLatest(UPDATE_LIST_ORDER_START, onUpdateListOrderAsync);
}

export function* onUpdateListOrderAsync(payload){
    try {
        const response = yield call(updateListOrderAPI,payload);
        if(response.status===200){
            yield put(updateListOrderSucc(response));
        }
    } catch (error) {
        console.log(error)
        handleAPIError(error);
    }
}

export function* onDeleteList(){
    yield takeLatest(DELETE_LIST_START,onDeleteListAsync);
}

export function* onDeleteListAsync(payload){
    try {
        const response = yield call(deleteListAPI,payload);
        if(response.status===200){
            yield put(deleteListSucc(payload.list))
        }
    } catch (error) {
        console.log(error)
        handleAPIError(error);
    }
}

export function* onAddListToArchive(){
    yield takeLatest(ADD_LIST_ARCHIVE_START, onAddListToArchiveAsync);
}

export function* onAddListToArchiveAsync(payload){
    try {
        const response = yield call(archiveListAPI,payload);
        if (response.status === 200) {
            const todoList = response.data.todoList;
            yield put(addListToArchiveSucc(todoList));
            if (payload.listOrder !== undefined && payload.listOrder !== '') {
                let tempListOrderArr;
                if (todoList.groupName === "archived") {
                    tempListOrderArr = getChangedListOrder(todoList, payload.listOrder, ACTION_REMOVE_ITEM);
                } else {
                    tempListOrderArr = getChangedListOrder(todoList, payload.listOrder, ACTION_ADD_ITEM);
                }
                yield put(updateListOrder(createFilteredListOrderFromArry(tempListOrderArr)))
            }
        }
    } catch (error) {
        console.log(error)
        handleAPIError(error);
    }
}

export function* processAPIError(error){
    const rError = handleAPIError(error);
    if(rError.ERROR_CODE===TOKEN_EXPIRED){
        document.cookie="jToken=;";
        yield put(setIsAuthenticated(false));
    }
    return rError;
}