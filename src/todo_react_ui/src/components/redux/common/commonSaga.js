import { call, put, takeLatest } from "redux-saga/effects";
import { handleAPIError } from "../../utils/GlobalFuns";
import { exportTodoListsAPI, fetchCurrentUserAPI, fetchHeaderLinksAPI, fetchMyAccountLinksAPI } from "../apis";
import { exportTodoListsFail, exportTodoListsSucc, fetchCurrentUserSucc, fetchHeaderLinksSucc, fetchMyAccountLinksSucc } from "./commonActions";
import { EXPORT_TODO_LISTS_START, FETCH_HEADER_LINKS_START, FETCH_LOGGED_IN_USER_DETAILS_START, FETCH_MY_ACCOUNT_LINKS_START } from "./commonActionTypes";
import { SUCCESS, TOKEN_EXPIRED } from "../todoActionTypes";
import { setIsAuthenticated } from "../login/loginActions";

export function* onFetchHeaderLinks(){
    yield takeLatest(FETCH_HEADER_LINKS_START, onFetchHeaderLinksAsync)
}

export function* onFetchHeaderLinksAsync(){
    try {
        const response = yield call(fetchHeaderLinksAPI);
        if(response.status === 200){
            const data = response.data;
            yield put(fetchHeaderLinksSucc(data.kvresponse));
        }
    } catch (error) {
        handleAPIError(error);
    }
}

export function* onFetchMyAccountLinks(){
    yield takeLatest(FETCH_MY_ACCOUNT_LINKS_START, onFetchMyAccountLinksAsync)
}

export function* onFetchMyAccountLinksAsync(){
    try {
        const response = yield call(fetchMyAccountLinksAPI);
        if(response.status === 200){
            const data = response.data;
            yield put(fetchMyAccountLinksSucc(data.kvresponse));
        }
    } catch (error) {
        handleAPIError(error);
    }
}

export function* onFetchCurrentUser(){
    yield takeLatest(FETCH_LOGGED_IN_USER_DETAILS_START, onFetchCurrentUserAsync);
}

export function* onFetchCurrentUserAsync (){
    try {
        const response = yield call(fetchCurrentUserAPI);
        if(response.status === 200){
            const data = response.data;
            yield put(fetchCurrentUserSucc(data));
        }
    } catch (error) {
        handleAPIError(error);
    }
}

export function* onExportTodoLists(){
    yield takeLatest(EXPORT_TODO_LISTS_START, onExportTodoListsAsync);
}

export function* onExportTodoListsAsync(){
    try {
        const response = yield call(exportTodoListsAPI);
        if(response.status === 200){
            const data = response.data;
            if(data.status === SUCCESS){
                yield put(exportTodoListsSucc(data));
            }
        }else{
            yield put(exportTodoListsFail(response));
        }
    } catch (error) {
        handleAPIError(error);
        yield put(exportTodoListsFail(error));
    }
}

export function* processAPIErrorGen(error){//This generator function required to dispatch reducer event
    const rError = handleAPIError(error);
    if(rError.ERROR_CODE===TOKEN_EXPIRED){
        document.cookie="jToken=;";
        yield put(setIsAuthenticated(false));//Reducer event
    }
    return rError;
}

export function processAPIError(error){
    //console.log(processAPIErrorGen(error).next().value)
    return processAPIErrorGen(error).next().value;
}