/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from 'react';
import { PasswordField } from './PasswordField';
import { useDispatch, useSelector } from 'react-redux';
import { AUTHENTICATION_USER_FAIL } from '../redux/login/loginActionTypes';
import { CHANGE_PASSWORD, ERROR_MESSAGE, RESET_PASSWORD, SIGN_UP } from '../redux/todoActionTypes';
import { validateReqFld } from '../utils/utils';
import { authenticateUser, setCurrentLoginForm } from '../redux/login/loginActions';

export const SignInDiv = () => {
	const dispatch = useDispatch();
	const loginPhase = useSelector(state => state.login.phase);
	const loginErrObj = useSelector(state => state.login.apiError);
	const loginErrorS = useSelector(state => state.login.loginError);
	const [loginError, setLoginError] = useState("");

	useEffect(()=>{
		const handleKeyUp = (event) => {
			if(event.key=== "Enter"){
				authenticate();
			}
		}
		window.addEventListener("keyup", handleKeyUp);
		return () => {window.removeEventListener("keyup", handleKeyUp)}

	},[]);
	
	useEffect(()=>{
		if(loginPhase===AUTHENTICATION_USER_FAIL){
			setLoginError(loginErrObj[ERROR_MESSAGE]);
			dispatch({type:""});
		}
		if(loginErrorS!==""){
			setLoginError(loginErrorS);
		}
	},[loginPhase, loginErrObj, loginErrorS]);

	const authenticate = () => {
		const username= document.getElementById('username');
		const password = document.getElementById('password');
		if(!validateReqFld(username) || !validateReqFld(password)){
			return;
		}
		const  authPayLoad = {
			username:username.value,
			password:password.value
		}
		dispatch(authenticateUser(authPayLoad))
	}
	return (
		<div className='slide-in-left signup-form'>
			<h1 className="signup-header">Sign In</h1>
			<div className="row row-label">
				<label className="signup-label">User Name</label>
				<input className="form-control signup-input" type="text" name="username" id="username" placeholder="Your email" required />
			</div>
			<div className="row row-label">
				<label  className="signup-label">Password</label>
				<PasswordField id='password' name='password' placeholder='Password'/>
				{loginError !== "" && <label className='login-error'>{loginError}</label>}
				<label className="signup-label" style={{width:50+'%'}}>
					<span className='link-look' onClick={()=>dispatch(setCurrentLoginForm(RESET_PASSWORD))} style={{fontSize: 12,textDecoration:'none'}}>Forgot password ?</span>
				</label>
				<label className="signup-label" style={{width:50+'%'}}>
					<span className='link-look' style={{fontSize: 12,textDecoration:'none'}} onClick={()=>dispatch(setCurrentLoginForm(CHANGE_PASSWORD))}>Change password</span>
				</label>
			</div>
			<div className="row row-btn">
				<button className="btn-signup" onClick={authenticate}>Sign In</button>
			</div>
			<div className="row row-label">
				<label className="signup-label">
					New user ? <span onClick={()=>dispatch(setCurrentLoginForm(SIGN_UP))} className='link-look'>sign up</span> here
				</label>
			</div>
		</div>
	);
}