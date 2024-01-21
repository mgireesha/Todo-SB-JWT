import { CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_START, CHANGE_PASSWORD_SUCCESS, SET_CURRENT_LOGIN_FORM, SET_IS_AUTHENTICATED, SET_LOGIN_ERROR } from "./loginActionTypes";

export const changePassword = (payload) => ({
    type: CHANGE_PASSWORD_START,
    changePwdPayload: payload.changePwdPayload,
    fromPage : payload.fromPage
})

export const changePasswordSucc = (response) => ({
    type: CHANGE_PASSWORD_SUCCESS,
    response
})

export const changePasswordFail = (response) => ({
    type: CHANGE_PASSWORD_FAIL,
    response
})

export const setLoginError = (loginError) => ({
    type : SET_LOGIN_ERROR,
    loginError
})

export const setCurrentLoginForm = (currentLoginForm) => ({
    type : SET_CURRENT_LOGIN_FORM,
    currentLoginForm
})

export const setIsAuthenticated = (isAuthenticated) => ({
    type: SET_IS_AUTHENTICATED,
    isAuthenticated
})