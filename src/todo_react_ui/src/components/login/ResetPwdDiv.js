/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from 'react';
import {BsArrowLeftSquare} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { RESET_PASSWORD_OTP, SIGN_IN, SIGN_UP } from '../redux/todoActionTypes';
import { passwordResetSendOTP, setCurrentLoginForm } from '../redux/login/loginActions';
import { cReportValidity, validateEmail, validateReqFld } from '../utils/utils';
import { PASSWORD_RESET_SEND_OTP_FAIL, PASSWORD_RESET_SEND_OTP_SUCESS } from '../redux/login/loginActionTypes';

export const ResetPwdDiv = () => {
	const dispatch = useDispatch();
	const prevLoginForm = useSelector(state => state.login.prevLoginForm);
	const loginPhase = useSelector(state => state.login.phase);
	const apiErrorObj = useSelector(state => state.login.apiError);
	const apiRespObj = useSelector(state => state.login.apiResponse);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(()=>{
		const handleKeyUp = (event) => {
			if(event.key=== "Enter"){
				sendOtp();
			}
		}
		window.addEventListener("keyup", handleKeyUp);
		return () => {window.removeEventListener("keyup", handleKeyUp)}

	},[]);

	useEffect(()=>{
		if(loginPhase===PASSWORD_RESET_SEND_OTP_FAIL){
			setErrorMessage("Email Service is down. Please contact adminstrator.");
		}
		if(loginPhase === PASSWORD_RESET_SEND_OTP_SUCESS){
			if(apiRespObj && apiRespObj.status==="MESSAGE_SENT"){
				dispatch(setCurrentLoginForm(RESET_PASSWORD_OTP));
			}else{
				if(apiErrorObj && apiErrorObj.ERROR_CODE){
					setErrorMessage("Email Service is down. Please contact adminstrator.");
				}
			}
		}
	},[loginPhase])

	const sendOtp = async() => {
		const userName = document.getElementById('username-resetP');
		if(!validateReqFld(userName)){
			return;
		}
		if(!validateEmail(userName)){
			cReportValidity(userName,"Please provide valid email address");
			return;
		}
		const sendOtpPayload = {
			userName : userName.value
		}
		dispatch(passwordResetSendOTP(sendOtpPayload));
	}
	return (
			<div className='slide-in-left signup-form'>
				<BsArrowLeftSquare onClick={()=>dispatch(setCurrentLoginForm(prevLoginForm))} className='login-back-arrow' />
				<h1 className="signup-header">Reset Password</h1>
				<div className="reset-pwd-div" id="reset-pwd-div">
					<div className="row row-label">
						<label htmlFor="username" className="signup-label">User Name</label>
						<input className="form-control signup-input" type="text" name="username" id="username-resetP" placeholder="Your email" required />
					</div>
					<div className="row row-btn">
						<button type="button" className="btn-signup" onClick={sendOtp}>Send OTP</button>
						{errorMessage && <label className="signup-label color-dark-red" id="init-rpd-error">{errorMessage}</label>}
					</div>
				</div>
				<div className="row row-label" id="go-back-to-login">
					<label className="signup-label col-sm-4">Go back to <span className='link-look' onClick={()=>dispatch(setCurrentLoginForm(SIGN_IN))}>Login</span>
					</label>
					<label className="signup-label col-sm-6">
						New user ? <span onClick={()=>dispatch(setCurrentLoginForm(SIGN_UP))} className='link-look'>sign up</span> here
					</label>
				</div>
			</div>
	);
}