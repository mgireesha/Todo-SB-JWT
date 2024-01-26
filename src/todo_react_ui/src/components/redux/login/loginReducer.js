import { INIT, LOADING, SUCCESS } from "../todoActionTypes";
import { AUTHENTICATION_USER_FAIL, AUTHENTICATION_USER_START, AUTHENTICATION_USER_SUCCESS, CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_START, CHANGE_PASSWORD_SUCCESS, SET_CURRENT_LOGIN_FORM, SET_IS_AUTHENTICATED, SET_LOGIN_ERROR } from "./loginActionTypes";

export const initialState = {
    phase: INIT,
    loginError : "",
    currentLoginForm: 'signin',
    status:"",
    message:"",
    isAuthenticated: false,
    apiError:{}
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATION_USER_START:
            return{
                ...state,
                phase: LOADING
            }
        case AUTHENTICATION_USER_SUCCESS:
            return{
                ...state,
                isAuthenticated: action.isAuthenticated,
                phase: AUTHENTICATION_USER_SUCCESS
            }
        case AUTHENTICATION_USER_FAIL:
            return{
                ...state,
                apiError:action.response,
                phase: AUTHENTICATION_USER_FAIL
            }
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
                apiError:{...action.response}
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