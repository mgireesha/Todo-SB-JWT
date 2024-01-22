/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from 'react';

import {BsArrowLeftSquare} from 'react-icons/bs';
import { PasswordField } from './PasswordField';
import { cReportValidity, checkPasswordStrength, clearFieldsById, validateEmail, validateReqFld } from '../utils/utils';
import { BackToSignIn } from './BackToSignIn';
import { disableDiv, enableDiv } from '../utils/GlobalFuns';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, setCurrentLoginForm, setLoginError } from '../redux/login/loginActions';
import { CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_SUCCESS } from '../redux/login/loginActionTypes';
import { MY_ACCOUNT } from '../redux/todoActionTypes';

export const ChangePwdDiv = ({ onSetShowLForm, prevShowLForm, options }) => {
	const dispatch = useDispatch();

	const loginError = useSelector(state => state.login.loginError);
	const currentUser = useSelector(state => state.common.currentUser);
	const loginPhase = useSelector(state => state.login.phase);

	const [pwdStrengthErr, setPwdStrengthErr] = useState({});

	useEffect(() => {
        if(loginPhase === CHANGE_PASSWORD_SUCCESS || loginPhase === CHANGE_PASSWORD_FAIL){
            enableDiv();
        }

		if(loginPhase === CHANGE_PASSWORD_SUCCESS){
			if(options?.fromPage === MY_ACCOUNT){
				clearFieldsById(['current-pwd','createPwd','confirmPwd']);
			}else{
				dispatch(setCurrentLoginForm("lsuccess"));
			}
        }
    }, [loginPhase]);

	const initChangePassword = () => {
		dispatch(setLoginError(""));
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
			{!options?.hideBackArrow && <BsArrowLeftSquare onClick={()=>onSetShowLForm(prevShowLForm)} className='login-back-arrow' />}
			{!options?.hideHeader && <h1 className="signup-header">Change Password</h1>}
			<div className="row row-label" style={{display:options.fromPage===MY_ACCOUNT?'none':'block'}}>
				<label className="signup-label">User Name</label>
				<input className="form-control signup-input" type="text" name="username" id="username" placeholder="Your email" required defaultValue={currentUser?.userName} />
			</div>
			<div className="row row-label">
				<label className="signup-label">Current Passeword</label>
				<PasswordField id='current-pwd' name='current-pwd' placeholder='Current Password' />
				<label style={{color: '#c9300d'}} className="signup-label" id="verify-otp-error">{loginError}</label>
			</div>
			<div className="row row-label">
				<label className="signup-label">Create new password</label>
				<PasswordField id='createPwd' name='createPwd' placeholder='Create password' onKeyUp={(event)=>setPwdStrengthErr(checkPasswordStrength(event))}  />
				<span id="pwdStrength" style={{display: 'inline-block',padding: 0.1+'em',color: pwdStrengthErr.error_obj?.color}} className="col-sm-7">{pwdStrengthErr.error_obj? pwdStrengthErr.error_obj.strength :"Password Strength"}</span>
			</div>
			<div className="row row-label">
				<label className="signup-label">Confirm password</label>
				<PasswordField id='confirmPwd' name='confirmPwd' placeholder='Confirm password' />
			</div>
			<div className="row row-btn">
				<button type="button" className="btn-signup" onClick={initChangePassword}>Change Pawssword</button>
			</div>
			{!options?.hideBackToLoginBtn && <BackToSignIn />}
		</div>
	);
}