/* eslint-disable react-hooks/exhaustive-deps */
import {React, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import { SignInDiv } from './SignInDiv.js';
import { SignUpDiv } from './SignUpDiv.js';
import { LSuccessDiv } from './LSuccessDiv.js';
import { ResetPwdDiv } from './ResetPwdDiv.js';
import { ChangePwdDiv } from './ChangePwdDiv.js';
import { ResetPwdOtpDiv } from './ResetPwdOtpDiv.js';
import { disableDiv, enableDiv, getAuth } from '../utils/GlobalFuns.js';
import { LoaderColored } from '../loader/loaderColored.js';
import { setCookies, validateLoginToken } from '../utils/utils.js';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated, setLoginError } from '../redux/login/loginActions.js';
import { setHeaderLinks } from '../redux/common/commonActions.js';
import { CHANGE_PASSWORD, LOADING, L_SUCCESS, RESET_PASSWORD, RESET_PASSWORD_OTP, SIGN_IN, SIGN_UP } from '../redux/todoActionTypes.js';

export const Login = ({lError}) => {
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const locationL = useLocation();
	const loginPhase = useSelector(state => state.login.phase);
	const currentLoginForm = useSelector(state => state.login.currentLoginForm);
	const isAuthenticated = useSelector(state => state.login.isAuthenticated);


	if((lError!==null || lError!=="") && window.location.pathname==="/"){
		lError="";
	}
	useEffect(()=>{
		dispatch(setLoginError(lError))
	},[lError]);

	useEffect(()=>{
		if(isAuthenticated){
			navigate("/todo");
		}else{
			let tempIsAuthenticated = validateLoginToken(getAuth());
			if(tempIsAuthenticated){
				dispatch(setIsAuthenticated(tempIsAuthenticated));
			}else{
				processLogout();
			}
		}
	},[isAuthenticated])

	useEffect(()=>{
		const uri = locationL.pathname;
		const isLogout = uri.startsWith("/logout");
		if(isLogout)processLogout();
	},[locationL])

	useEffect(()=>{
		if(loginPhase === LOADING){
			disableDiv();
			setOpacity(0);
		}else{
			enableDiv();
			setOpacity(1);
		}
	},[loginPhase])
	
	useEffect(()=>{
		if(document.getElementById('body-signin')!==undefined){
			document.getElementById('body-signin').style.height=(window.innerHeight-document.getElementById("todo-header").clientHeight-15)+'px';
		}
	},[]);

	const processLogout = () => {
		setCookies("jToken","");
		dispatch(setHeaderLinks(null));
		dispatch(setIsAuthenticated(false));
	}
	
	const setOpacity = (op,txt) => {
		document.querySelectorAll('.signup-form').forEach(form=>{
			form.style.opacity = op;
		});
		if(op===0){
			document.querySelector('.spinner').style.display = 'flex';
			if(txt!==undefined)document.querySelector('.spinner-txt').innerHTML=txt;
			else document.querySelector('.spinner-txt').innerHTML='Loading';
		}else{
			document.querySelector('.spinner').style.display = 'none';
		} 
			
	}

	const getLoginForm = (currentLoginForm) => {
		switch (currentLoginForm) {
			case SIGN_IN:
				return <SignInDiv key={currentLoginForm} />
			case SIGN_UP:
				return <SignUpDiv key={currentLoginForm} />
			case L_SUCCESS:
				return <LSuccessDiv key={currentLoginForm} />
			case RESET_PASSWORD:
				return <ResetPwdDiv key={currentLoginForm} />
			case RESET_PASSWORD_OTP:
				return <ResetPwdOtpDiv key={currentLoginForm} />
			case CHANGE_PASSWORD:
				return <ChangePwdDiv key={currentLoginForm} />
			default:
				return <SignInDiv key={currentLoginForm} />
		}
	}

	return (
		<div className="body-signin" id="body-signin">
			<div className="container ">
				<div className="row row-main">
					<div className="col-sm-3"></div>
					<div className="col-sm-5 middle-span">{getLoginForm(currentLoginForm)}</div>
					<LoaderColored />
					<div className="col-sm-3"></div>
				</div>
			</div>
		</div>
	);
}