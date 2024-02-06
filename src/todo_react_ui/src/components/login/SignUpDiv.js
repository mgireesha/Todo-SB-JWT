/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from 'react';

import {BsArrowLeftSquare} from 'react-icons/bs';
import { PasswordField } from './PasswordField';
import { useDispatch, useSelector } from 'react-redux';
import { L_SUCCESS, SIGN_IN, SIGN_IN_LABEL, SIGN_UP_LABEL, USERNAME_AVAILABLE, USERNAME_NOT_AVAILABLE, _ERR_UNKNOWN_EXCEPTION, _ERR_USER_EXISTS } from '../redux/todoActionTypes';
import { checkUNameAvaiability, registerUser, setCurrentLoginForm } from '../redux/login/loginActions';
import { cReportValidity, checkPasswordStrength, validateEmail, validateReqFld } from '../utils/utils';
import { CHECK_USERNAME_AVAILABILITY_FAIL, CHECK_USERNAME_AVAILABILITY_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_SUCCESS } from '../redux/login/loginActionTypes';

export const SignUpDiv = () => {
	const dispatch = useDispatch();
	const prevLoginForm = useSelector(state => state.login.prevLoginForm);
	const loginPhase = useSelector(state => state.login.phase);
	const apiErrorObj = useSelector(state => state.login.apiError);
	const userNameAvailableObj = useSelector(state => state.login.userNameAvailableObj);

	const [errObjL, setErrObjL] = useState({});
	const [pwdStrengthErr, setPwdStrengthErr] = useState({});

	useEffect(()=>{
		const handleKeyUp = (event) => {
			if(event.key=== "Enter"){
				initRegisterUser();
			}
		}
		window.addEventListener("keyup", handleKeyUp);
		return () => {window.removeEventListener("keyup", handleKeyUp)}

	},[]);

	useEffect(()=>{
		if(loginPhase === REGISTER_USER_SUCCESS){
			dispatch(setCurrentLoginForm(L_SUCCESS));
		}
		let tempErrObjL = {};
		let errorKey = "unknownErr";
		if(loginPhase===REGISTER_USER_FAIL || loginPhase===CHECK_USERNAME_AVAILABILITY_FAIL){
			
			const apiError = apiErrorObj.ERROR;
			if(apiError === _ERR_USER_EXISTS || apiError === USERNAME_NOT_AVAILABLE){
				errorKey = "emailErr";
			}else if(apiError === _ERR_UNKNOWN_EXCEPTION){
				errorKey = "unknownErr";
			}
			tempErrObjL[errorKey] = apiErrorObj.ERROR_MESSAGE;
			setErrObjL(tempErrObjL);
		}

		if(loginPhase===CHECK_USERNAME_AVAILABILITY_SUCCESS){
			const status = userNameAvailableObj.status
			if(status === USERNAME_AVAILABLE){
				errorKey = "emailMessage";
				tempErrObjL[errorKey] = userNameAvailableObj.response;
			}else if(userNameAvailableObj.error === _ERR_USER_EXISTS){
				errorKey = "emailErr";
				tempErrObjL[errorKey] = userNameAvailableObj.errorMessage;
			}else if(userNameAvailableObj.error === _ERR_UNKNOWN_EXCEPTION){
				errorKey = "unknownErr";
				tempErrObjL[errorKey] = userNameAvailableObj.errorMessage;
			}
			
			setErrObjL(tempErrObjL);
		}
		
		
	},[loginPhase])

	const initRegisterUser = () => {
		const name = document.getElementById('name');
		const email = document.getElementById('email');
		const createPwd = document.getElementById('createPwd');
		const confirmPwd = document.getElementById('confirmPwd');
		if(!validateReqFld(name) || !validateReqFld(email) || 
			!validateReqFld(createPwd) || !validateReqFld(confirmPwd)){
			return;
		}
		if(!validateEmail(email)){
			cReportValidity(email,"Please provide valid email address")
			return;
		}

		const passwordStrength = checkPasswordStrength(createPwd);
		if(passwordStrength.passwordStrength < 4){
			createPwd.setCustomValidity('Please provide a strong password');
			createPwd.reportValidity();
			return false;
		}

		if(createPwd.value!==confirmPwd.value){
			confirmPwd.setCustomValidity("Passwords doesn't match");
			confirmPwd.reportValidity();
			return;
		}
		const signUpPayoad = {
			name:name.value,
			userName:email.value,
			passWord:confirmPwd.value
		}

		dispatch(registerUser(signUpPayoad));
	}

	const initCheckUNameAvaiability = (event) => {
		const uName = event.target;
		if(uName.value===''){
			return;
		}
		if(!validateEmail(uName)){
			setErrObjL({emailErr:'Please provide valid email address'})
			return;
		}
		dispatch(checkUNameAvaiability(uName.value));
	}
	return (
		<div className='slide-in-left signup-form'>
			<BsArrowLeftSquare onClick={()=>dispatch(setCurrentLoginForm(prevLoginForm))} className='login-back-arrow' />
			<h1 className="signup-header">Sign Up</h1>
			<div className="row row-label">
				<label className="signup-label">Name</label>
				<input className="form-control signup-input" name="name" id="name" placeholder="Your name" required />
			</div>
			<div className="row row-label">
				<label className="signup-label">Email</label>
				<input className="form-control signup-input" name="email" id="email" placeholder="Your email" required onChange={(event)=>initCheckUNameAvaiability(event)} />
				{errObjL.emailErr && <span id="email-availality" className="color-dark-red p-0">{errObjL.emailErr}</span>}
				{errObjL.emailMessage && <span id="email-availality" className="p-0" style={{color:'green'}}>{errObjL.emailMessage}</span>}
			</div>
			<div className="row row-label">
				<label className="signup-label">Create new password</label>
				<PasswordField id='createPwd' name='createPwd' placeholder='Create Password' onKeyUp={(event)=>setPwdStrengthErr(checkPasswordStrength(event))} />
				<span id="pwdStrength" style={{display: 'inline-block',padding: 0.1+'em',color: pwdStrengthErr.error_obj?.color}} className="col-sm-7">{pwdStrengthErr.error_obj? pwdStrengthErr.error_obj.strength :"Password Strength"}</span>
			</div>
			<div className="row row-label">
				<label className="signup-label">Confirm password</label>
				<PasswordField id='confirmPwd' name='confirmPwd' placeholder='Confirm Password' />
			</div>
			{errObjL.unknownErr && <span id="email-availality" className="color-dark-red p-0">{errObjL.unknownErr}</span>}
			<div className="row row-btn">
				<button className="btn-signup" onClick={initRegisterUser}>{SIGN_UP_LABEL}</button>
			</div>
			<div className="row row-label">
				<label className="signup-label">
					Already a user ? <span onClick={()=>dispatch(setCurrentLoginForm(SIGN_IN))} className='link-look'>{SIGN_IN_LABEL}</span>
				</label>
			</div>
		</div>
	);
}