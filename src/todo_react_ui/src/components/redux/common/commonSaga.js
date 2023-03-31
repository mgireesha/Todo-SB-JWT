import { call, put, takeLatest } from "redux-saga/effects";
import { handleAPIError } from "../../utils/GlobalFuns";
import { fetchHeaderLinksAPI } from "../apis";
import { fetchHeaderLinksSucc } from "./commonActions";
import { FETCH_HEADER_LINKS_START } from "./commonActionTypes";

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