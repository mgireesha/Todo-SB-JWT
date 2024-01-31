import { INIT, LOADING, SIGN_IN } from "../todoActionTypes";
import { AUTHENTICATION_USER_FAIL, AUTHENTICATION_USER_START, AUTHENTICATION_USER_SUCCESS, CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_START, CHANGE_PASSWORD_SUCCESS, CHECK_USERNAME_AVAILABILITY_FAIL, CHECK_USERNAME_AVAILABILITY_START, CHECK_USERNAME_AVAILABILITY_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_START, REGISTER_USER_SUCCESS, SET_CURRENT_LOGIN_FORM, SET_IS_AUTHENTICATED, SET_LOGIN_ERROR, SET_STATUS_AND_MESSAGE } from "./loginActionTypes";

export const initialState = {
    phase: INIT,
    loginError : "",
    currentLoginForm: SIGN_IN,
    prevLoginForm: 'signin',
    status:"",
    message:"",
    isAuthenticated: false,
    apiError:{},
    userNameAvailableObj:{}
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_START:
            return{
                ...state,
                phase:LOADING
            }
        case REGISTER_USER_SUCCESS:
            return{
                ...state,
                phase: REGISTER_USER_SUCCESS,
                status: action.response.status,
                message: action.response.response
            }
        case REGISTER_USER_FAIL:
            return{
                ...state,
                phase: REGISTER_USER_FAIL,
                apiError: action.error
            }
        // case CHECK_USERNAME_AVAILABILITY_START:
        //     return{
        //         ...state,
        //         phase:LOADING
        //     }
        case CHECK_USERNAME_AVAILABILITY_SUCCESS:
            return{
                ...state,
                phase: CHECK_USERNAME_AVAILABILITY_SUCCESS,
                userNameAvailableObj: action.response
            }
        case CHECK_USERNAME_AVAILABILITY_FAIL:
            return{
                ...state,
                phase: CHECK_USERNAME_AVAILABILITY_FAIL,
                apiError: action.error
            }
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
                message: action.response?.message,
                status:action.response?.status,
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
                prevLoginForm: {...state}.currentLoginForm,
                currentLoginForm: action.currentLoginForm
            }
        case SET_IS_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                loginError: action.loginError?action.loginError:""
            }
        case SET_STATUS_AND_MESSAGE:
            return{
                ...state,
                status: action.status,
                message: action.message,
                phase:INIT
            }
        default:
            return {
                ...state,
                phase:INIT
            }
    }
}