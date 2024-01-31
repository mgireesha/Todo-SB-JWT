import { call, put, takeLatest } from "redux-saga/effects";
import { AUTHENTICATION_USER_START, CHANGE_PASSWORD_START, CHECK_USERNAME_AVAILABILITY_START, REGISTER_USER_START } from "./loginActionTypes";
import { days, handleAPIError, months } from "../../utils/GlobalFuns";
import { authenticateUserAPI, changePasswordAPI, checkUNameAvaiabilityAPI, registerUserAPI } from "../apis";
import { MY_ACCOUNT, SUCCESS } from "../todoActionTypes";
import { authenticateUserFail, authenticateUserSucc, changePasswordFail, changePasswordSucc, checkUNameAvaiabilityFail, checkUNameAvaiabilitySucc, registerUserFail, registerUserSucc } from "./loginActions";
import { setStatusMessage } from "../common/commonActions";
import { setCookies } from "../../utils/utils";
import { processAPIError } from "../common/commonSaga";

export function* onRegisterUser(){
    yield takeLatest(REGISTER_USER_START, onRegisterUserAsync);
}

export function* onRegisterUserAsync(payload){
    try {
        const response  = yield call(registerUserAPI, payload.registerPayload);
        if(response.status===200 && response?.data?.status === SUCCESS){
            yield put(registerUserSucc(response.data));
        }else{
            yield put(registerUserFail(handleAPIError(response)));
        }
    } catch (error) {
        yield put(registerUserFail(handleAPIError(error)))
    }
}

export function* onCheckUserNameAvailability(){
    yield takeLatest(CHECK_USERNAME_AVAILABILITY_START, onCheckUserNameAvailabilityAsync);
}

export function* onCheckUserNameAvailabilityAsync(payload){
    try {
        const response  = yield call(checkUNameAvaiabilityAPI, payload.userName);
        if(response.status===200){
            yield put(checkUNameAvaiabilitySucc(response.data));
        }
    } catch (error) {
        yield put(checkUNameAvaiabilityFail(handleAPIError(error)))
    }
}

export function* onAuthenticateUser(){
    yield takeLatest(AUTHENTICATION_USER_START, onAuthenticateUserAsync)
}

export function* onAuthenticateUserAsync(payload){
    let isAuthenticated = false;
    try {
        const response = yield call(authenticateUserAPI, payload.authenticationRequest);
        if(response.status === 200){
            const data = response.data;
            if(data.status === SUCCESS){
                setCookies("jToken","Bearer "+data.jwt);
                isAuthenticated = true;
                yield put(authenticateUserSucc(isAuthenticated));
            }
        }
        //console.log(response)
        if(!isAuthenticated){
            yield put(authenticateUserFail(processAPIError(response)));
        }
    } catch (error) {
        yield put(authenticateUserFail(processAPIError(error)));
        
    }
}

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
                    yield put (changePasswordSucc({status: data.status, message:"Password changed. Please sign in to continue."}));
                }
            }else{
                yield put (changePasswordFail(processAPIError(data)));
            }
        }
    } catch (error) {
        yield put (changePasswordFail(processAPIError(error)));
    }
}

export function convertDateT(date) {
    var cDate = "";
    var d = new Date(date);
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    if (d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate()) {
        cDate = "Today";
    } else if (d.getFullYear() === tomorrow.getFullYear() && d.getMonth() === tomorrow.getMonth() && d.getDate() === tomorrow.getDate()) {
        cDate = "Tomorow";
    } else {
        cDate = days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear();
    }
    return cDate;
}

export function disableDiv() {
    // document.getElementById('disable-div').style.width
    //     = document.getElementById('app-main-div').offsetWidth + 'px';
    // document.getElementById('disable-div').style.height
    //     //= document.getElementById('app-main-div').offsetHeight+'px';
    //     = window.innerHeight + 30 + 'px';
    // document.getElementById('disable-div').style.top = '-30px';
    document.getElementById('disable-div').style.display = 'block';
}
export function enableDiv() {
    document.getElementById('disable-div').style.display = 'none';
}