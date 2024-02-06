/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from 'react';

import {BsArrowLeftSquare} from 'react-icons/bs';
import { PasswordField } from './PasswordField';
import { cReportValidity, checkPasswordStrength, clearFieldsById, validateEmail, validateReqFld } from '../utils/utils';
import { BackToSignIn } from './BackToSignIn';
import { disableDiv, enableDiv } from '../utils/GlobalFuns';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, setCurrentLoginForm } from '../redux/login/loginActions';
import { CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_SUCCESS } from '../redux/login/loginActionTypes';
import { L_SUCCESS, MY_ACCOUNT, _ERR_SAME_CURRENT_AND_NEW_PASSWORDS, _ERR_UNKNOWN_EXCEPTION, _ERR_USER_NOT_FOUND, _ERR_WRONG_CURRENT_PASSWORD } from '../redux/todoActionTypes';

export const ChangePwdDiv = ({ options }) => {
	const dispatch = useDispatch();

	//const loginError = useSelector(state => state.login.loginError);
	const prevLoginForm = useSelector(state => state.login.prevLoginForm);
	const currentUser = useSelector(state => state.common.currentUser);
	const loginPhase = useSelector(state => state.login.phase);
	const apiErrorObj = useSelector(state => state.login.apiError);

	const [pwdStrengthErr, setPwdStrengthErr] = useState({});
	const [errObjL, setErrObjL] = useState({});

	useEffect(() => {
        if(loginPhase === CHANGE_PASSWORD_SUCCESS || loginPhase === CHANGE_PASSWORD_FAIL){
            enableDiv();
        }

		if(loginPhase === CHANGE_PASSWORD_SUCCESS){
			if(options?.fromPage === MY_ACCOUNT){
				clearFieldsById(['current-pwd','createPwd','confirmPwd']);
			}else{
				dispatch(setCurrentLoginForm(L_SUCCESS));
			}
        }

		if(loginPhase===CHANGE_PASSWORD_FAIL){
			const apiError = apiErrorObj.ERROR;
			let errorKey = "unknownErr";
			let tempErrObjL = {};
			if(apiError === _ERR_SAME_CURRENT_AND_NEW_PASSWORDS || apiError === _ERR_WRONG_CURRENT_PASSWORD){
				errorKey = "currentPwdErr";
			}else if(apiError === _ERR_USER_NOT_FOUND){
				errorKey = "userNotFoundError";
			}else if(apiError === _ERR_UNKNOWN_EXCEPTION){
				errorKey = "unknownErr";
			}
			tempErrObjL[errorKey] = apiErrorObj.ERROR_MESSAGE;
			console.log("tempErrObjL: ",tempErrObjL)
			setErrObjL(tempErrObjL);
			//setLoginError(apiErrorObj[ERROR_MESSAGE]);
		}
    }, [loginPhase]);

	useEffect(()=>{
		setErrObjL({});
	},[])

	const initChangePassword = () => {
		//setLoginError("")
		const currentPwd = document.getElementById('current-pwd');
		const createPwd = document.getElementById('createPwd');
		const confirmPwd = document.getElementById('confirmPwd');
		const username = document.getElementById('username');
		if(!validateReqFld(currentPwd) || !validateReqFld(username) ||
			!validateReqFld(createPwd) || !validateReqFld(confirmPwd)){
			return;
		}
		if(!validateEmail(username)){
			cReportValidity(username,"Please provide valid email address")
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
		disableDiv();
		//setOpacity(0);
		const changePPayload = {
			currentPassword : currentPwd.value,
			passWord : confirmPwd.value,
			userName : username.value
		}

		const payload = {
			fromPage : options?.fromPage,
			changePwdPayload: changePPayload
		}

		dispatch(changePassword(payload));
	}

	return (
		<div className={options?.className?options?.className:'change-password slide-in-left signup-form'} style={options?.styles}>
			{!options?.hideBackArrow && <BsArrowLeftSquare onClick={()=>dispatch(setCurrentLoginForm(prevLoginForm))} className='login-back-arrow' />}
			{!options?.hideHeader && <h1 className="signup-header">Change Password</h1>}
			<div className="row row-label" style={{display:options?.fromPage===MY_ACCOUNT?'none':'block'}}>
				<label className="signup-label">User Name</label>
				<input className="form-control signup-input" type="text" name="username" id="username" placeholder="Your email" required defaultValue={currentUser?.userName} />
				{errObjL.userNotFoundError && <label className="signup-label color-dark-red" id="verify-otp-error">{errObjL.userNotFoundError}</label>}
			</div>
			<div className="row row-label">
				<label className="signup-label">Current Passeword</label>
				<PasswordField id='current-pwd' name='current-pwd' placeholder='Current Password' />
				{errObjL.currentPwdErr && <label className="signup-label color-dark-red" id="verify-otp-error">{errObjL.currentPwdErr}</label>}
			</div>
			<div className="row row-label">
				<label className="signup-label">Create new password</label>
				<PasswordField id='createPwd' name='createPwd' placeholder='Create password' onKeyUp={(event)=>setPwdStrengthErr(checkPasswordStrength(event))}  />
				<span id="pwdStrength" style={{display: 'inline-block',padding: 0.1+'em',color: pwdStrengthErr.error_obj?.color}} className="col-sm-7">{pwdStrengthErr.error_obj? pwdStrengthErr.error_obj.strength :"Password Strength"}</span>
				{errObjL.createPwdErr && <label className="signup-label color-dark-red" id="verify-otp-error">{errObjL.createPwdErr}</label>}
			</div>
			<div className="row row-label">
				<label className="signup-label">Confirm password</label>
				<PasswordField id='confirmPwd' name='confirmPwd' placeholder='Confirm password' />
			</div>
			<div className="row row-btn">
				<button type="button" className="btn-signup" onClick={initChangePassword}>Change Pawssword</button>
				{errObjL.unknownErr && <label className="signup-labe color-dark-red" id="verify-otp-error">{errObjL.unknownErr}</label>}
			</div>
			{!options?.hideBackToLoginBtn && <BackToSignIn />}
		</div>
	);
}