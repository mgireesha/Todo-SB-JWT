import { INIT, LOADING, SUCCESS } from "../todoActionTypes";
import { CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_START, CHANGE_PASSWORD_SUCCESS, SET_CURRENT_LOGIN_FORM, SET_IS_AUTHENTICATED, SET_LOGIN_ERROR } from "./loginActionTypes";

export const initialState = {
    phase: INIT,
    loginError : "",
    currentLoginForm: 'signin',
    status:"",
    message:"",
    isAuthenticated: false
    //error:{}
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PASSWORD_START:
            return{
                ...state,
                phase: LOADING
            }
        case CHANGE_PASSWORD_SUCCESS:
            return{
                ...state,
                phase:CHANGE_PASSWORD_SUCCESS,
                message: action.response?.status === SUCCESS ?"Password changed. Please sign in to continue.":"",
                loginError:action.response?.status,
                //status: action.response.status

            }
        case CHANGE_PASSWORD_FAIL:
            return{
                ...state,
                phase:CHANGE_PASSWORD_FAIL,
                loginError:action.response.error,
                status: action.response.status
            }
        case SET_LOGIN_ERROR:
            return {
                ...state,
                loginError: action.loginError,
            }
        case SET_CURRENT_LOGIN_FORM:
            return {
                ...state,
                currentLoginForm: action.currentLoginForm
            }
        case SET_IS_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated
            }
            default:
                return {
                    ...state,
                    phase:INIT
                }
    }
}