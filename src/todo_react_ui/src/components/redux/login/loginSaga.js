import { call, put, takeLatest } from "redux-saga/effects";
import { CHANGE_PASSWORD_START } from "./loginActionTypes";
import { handleAPIError } from "../../utils/GlobalFuns";
import { changePasswordAPI } from "../apis";
import { MY_ACCOUNT, SUCCESS } from "../todoActionTypes";
import { changePasswordFail, changePasswordSucc } from "./loginActions";
import { setStatusMessage } from "../common/commonActions";

export function* onPasswordChange(){
    yield takeLatest(CHANGE_PASSWORD_START, onPasswordChangeAsync)
}

export function* onPasswordChangeAsync(payload){
    try {
        const response = yield call(changePasswordAPI, payload.changePwdPayload);
        if(response.status === 200){
            const data = response.data;
            if(data.status === SUCCESS){
                if(payload.fromPage === MY_ACCOUNT){
                    yield put (changePasswordSucc({}));
                    yield put (setStatusMessage("Password updated"))
                }else{
                    yield put (changePasswordSucc(data));
                }
            }else{
                yield put (changePasswordFail(data));
            }
        }
    } catch (error) {
        handleAPIError(error);
        yield put (changePasswordFail({error: error.message}));
    }
}