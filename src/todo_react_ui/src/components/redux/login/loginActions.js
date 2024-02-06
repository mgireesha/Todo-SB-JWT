import { AUTHENTICATION_USER_FAIL, AUTHENTICATION_USER_START, AUTHENTICATION_USER_SUCCESS, CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_START, CHANGE_PASSWORD_SUCCESS, CHECK_USERNAME_AVAILABILITY_FAIL, CHECK_USERNAME_AVAILABILITY_START, CHECK_USERNAME_AVAILABILITY_SUCCESS, PASSWORD_RESET_FAIL, PASSWORD_RESET_SEND_OTP_FAIL, PASSWORD_RESET_SEND_OTP_START, PASSWORD_RESET_SEND_OTP_SUCESS, PASSWORD_RESET_START, PASSWORD_RESET_SUCESS, REGISTER_USER_FAIL, REGISTER_USER_START, REGISTER_USER_SUCCESS, SET_CURRENT_LOGIN_FORM, SET_IS_AUTHENTICATED, SET_LOGIN_ERROR, SET_STATUS_AND_MESSAGE } from "./loginActionTypes";

export const registerUser = (registerPayload) => ({
    type: REGISTER_USER_START,
    registerPayload
})

export const registerUserSucc = (response) => ({
    type: REGISTER_USER_SUCCESS,
    response
})

export const registerUserFail = (error) => ({
    type: REGISTER_USER_FAIL,
    error
})

export const checkUNameAvaiability = (userName) => ({
    type: CHECK_USERNAME_AVAILABILITY_START,
    userName
})

export const checkUNameAvaiabilitySucc = (response) => ({
    type: CHECK_USERNAME_AVAILABILITY_SUCCESS,
    response
})

export const checkUNameAvaiabilityFail = (error) => ({
    type: CHECK_USERNAME_AVAILABILITY_FAIL,
    error
})

export const authenticateUser = (authenticationRequest) => ({
    type: AUTHENTICATION_USER_START,
    authenticationRequest
})

export const authenticateUserSucc = (isAuthenticated) => ({
    type: AUTHENTICATION_USER_SUCCESS,
    isAuthenticated
})

export const authenticateUserFail = (response) => ({
    type: AUTHENTICATION_USER_FAIL,
    response
})

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

export const passwordResetSendOTP = (payload) => ({
    type: PASSWORD_RESET_SEND_OTP_START,
    payload
})

export const passwordResetSendOTPSucc = (response) => ({
    type: PASSWORD_RESET_SEND_OTP_SUCESS,
    response
})

export const passwordResetSendOTPFail = (error) => ({
    type: PASSWORD_RESET_SEND_OTP_FAIL,
    error
})

export const passwordReset = (payload) => ({
    type: PASSWORD_RESET_START,
    payload
})

export const passwordResetSucc = (response) => ({
    type: PASSWORD_RESET_SUCESS,
    response
})

export const passwordResetFail = (error) => ({
    type: PASSWORD_RESET_FAIL,
    error
})

export const setLoginError = (loginError) => ({
    type : SET_LOGIN_ERROR,
    loginError
})

export const setCurrentLoginForm = (currentLoginForm) => ({
    type : SET_CURRENT_LOGIN_FORM,
    currentLoginForm
})

export const setIsAuthenticated = (isAuthenticated, loginError) => ({
    type: SET_IS_AUTHENTICATED,
    isAuthenticated,
    loginError
})

export const setStatusAndMessage = (status, message) => ({
    type: SET_STATUS_AND_MESSAGE,
    status,
    message
})

export const resetStatusAndMessage = () => ({
    type: SET_STATUS_AND_MESSAGE,
    status:"",
    message:""
})