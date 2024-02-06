/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from 'react';

import { PasswordField } from './PasswordField';
import {BsArrowLeftSquare} from 'react-icons/bs';
import { BackToSignIn } from './BackToSignIn';
import { useDispatch, useSelector } from 'react-redux';
import { passwordReset, setCurrentLoginForm, setStatusAndMessage } from '../redux/login/loginActions';
import { cReportValidity, checkPasswordStrength, validateReqFld } from '../utils/utils';
import { L_SUCCESS, MESSAGE_SENT, SUCCESS, _ERR_OTP_NOT_FOUND, _ERR_UNKNOWN_EXCEPTION } from '../redux/todoActionTypes';
import { PASSWORD_RESET_FAIL, PASSWORD_RESET_SEND_OTP_SUCESS, PASSWORD_RESET_SUCESS } from '../redux/login/loginActionTypes';

export const ResetPwdOtpDiv = () => {
	const dispatch = useDispatch();
	const prevLoginForm = useSelector(state => state.login.prevLoginForm);
	const apiRespObj = useSelector(state => state.login.apiResponse);
	const apiErrorObj = useSelector(state => state.login.apiError);
	const loginPhase = useSelector(state => state.login.phase);
	const [pwdStrengthErr, setPwdStrengthErr] = useState({});

	const [user, setUser] = useState({});
	const [errObjL, setErrObjL] = useState({});

	useEffect(()=>{
		const handleKeyUp = (event) => {
			if(event.key=== "Enter"){
				verifyOtpAndResetPwd();
			}
		}
		window.addEventListener("keyup", handleKeyUp);
		return () => {window.removeEventListener("keyup", handleKeyUp)}

	},[]);

	useEffect(()=>{
		if(loginPhase === PASSWORD_RESET_SEND_OTP_SUCESS){
			if(apiRespObj && apiRespObj.status === MESSAGE_SENT){
				setUser(apiRespObj.user);
			}
		}
		if(loginPhase===PASSWORD_RESET_FAIL){
			const apiError = apiErrorObj.ERROR;
			let errorKey = "unknownErr";
			let tempErrObjL = {};
			if(apiError === _ERR_OTP_NOT_FOUND){
				errorKey = "wrongOTP";
			}else if(apiError === _ERR_UNKNOWN_EXCEPTION){
				errorKey = "unknownErr";
			}
			tempErrObjL[errorKey] = apiErrorObj.ERROR_MESSAGE;
			setErrObjL(tempErrObjL);
		}
		if(loginPhase === PASSWORD_RESET_SUCESS){
			if(apiRespObj && apiRespObj.status=== SUCCESS){
				dispatch(setStatusAndMessage(SUCCESS,apiRespObj.response));
				dispatch(setCurrentLoginForm(L_SUCCESS));
			}
		}
	},[loginPhase, apiRespObj])

	const verifyOtpAndResetPwd = async() => {
		
		const otpResetP = document.getElementById('otp-resetP');
		const createPwd = document.getElementById('createPwd');
		const confirmPwd = document.getElementById('confirmPwd');
		
		if(!validateReqFld(otpResetP) || 
			!validateReqFld(createPwd) || !validateReqFld(confirmPwd)){
			return;
		}

		const passwordStrength = checkPasswordStrength(createPwd);

		if(passwordStrength.passwordStrength < 4){
			createPwd.setCustomValidity('Please provide a strong password');
			createPwd.reportValidity();
			return false;
		}

		if(createPwd.value!==confirmPwd.value){
			cReportValidity(createPwd,"Passwords doesn't match");
			return;
		}
		const resetPPayload = {
			otp : otpResetP.value,
			passWord : confirmPwd.value,
			userName : user.userName
		}
		
		dispatch(passwordReset(resetPPayload));
		//setMessage("Password reset successful. Please sign in to continue.");
	}

	return (
		<div className="slide-in-left signup-form">
			<BsArrowLeftSquare onClick={()=>dispatch(setCurrentLoginForm(prevLoginForm))} className='login-back-arrow' />
			<h1 className="signup-header">Reset Password</h1>
			<div className="row row-label">
				<label className="signup-label">OTP</label>
				<input className="form-control signup-input" type="text" name="otp-resetP" id="otp-resetP" placeholder="One time password" required />
				{errObjL.wrongOTP && <label className="signup-label color-dark-red" id="verify-otp-error">{errObjL.wrongOTP}</label>}
			</div>
			<div className="row row-label">
				<label className="signup-label">Create new password</label>
				<PasswordField id='createPwd' name='createPwd' placeholder='Create Password' onKeyUp={(event)=>setPwdStrengthErr(checkPasswordStrength(event))}/>
				<span id="pwdStrength" style={{display: 'inline-block',padding: 0.1+'em',color: pwdStrengthErr.error_obj?.color}} className="col-sm-7">{pwdStrengthErr.error_obj? pwdStrengthErr.error_obj.strength :"Password Strength"}</span>
			</div>
			<div className="row row-label">
				<label className="signup-label">Confirm password</label>
				<PasswordField id='confirmPwd' name='confirmPwd' placeholder='Confirm Password' />
			</div>
			<div className="row row-btn">
				<button type="button" className="btn-signup" onClick={verifyOtpAndResetPwd}>Verify</button>
				{errObjL.unknownErr && <label className="signup-label color-dark-red" id="verify-otp-error">{errObjL.unknownErr}</label>}
			</div>
			<BackToSignIn />
		</div>
	);
}