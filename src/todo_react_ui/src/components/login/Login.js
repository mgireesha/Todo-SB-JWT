/* eslint-disable react-hooks/exhaustive-deps */
import {React, useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import { SignInDiv } from './SignInDiv.js';
import { SignUpDiv } from './SignUpDiv.js';
import { LSuccessDiv } from './LSuccessDiv.js';
import { ResetPwdDiv } from './ResetPwdDiv.js';
import { ChangePwdDiv } from './ChangePwdDiv.js';
import { ResetPwdOtpDiv } from './ResetPwdOtpDiv.js';
import { disableDiv, enableDiv, getAuth, getServiceURI } from '../utils/GlobalFuns.js';
import { LoaderColored } from '../loader/loaderColored.js';
import { setCookies, validateLoginToken } from '../utils/utils.js';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser, setCurrentLoginForm, setIsAuthenticated, setLoginError, setStatusAndMessage } from '../redux/login/loginActions.js';
import { setHeaderLinks } from '../redux/common/commonActions.js';
import { CHANGE_PASSWORD, LOADING, L_SUCCESS, RESET_PASSWORD, RESET_PASSWORD_OTP, SIGN_IN, SIGN_UP, SUCCESS } from '../redux/todoActionTypes.js';

export const Login = ({lError}) => {
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const locationL = useLocation();

	const loginError = useSelector(state => state.login.loginError);
	const loginPhase = useSelector(state => state.login.phase);
	const currentLoginForm = useSelector(state => state.login.currentLoginForm);
	const isAuthenticated = useSelector(state => state.login.isAuthenticated);
	const prevLoginForm = useSelector(state => state.login.prevLoginForm);


	//const [loginError,setLoginError] = useState("");
	//const [currentLoginForm,setShowLForm] = useState("signin");
	//const [prevShowLForm,setPrevShowLForm] = useState("signin");
	const [message,setMessage] = useState("");
	const [emailS,setEmailS] = useState("");
	const [pwdstgth,setPwdstgth] = useState(0);

	const emailReg = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
	const environment =process.env.REACT_APP_TODO_ENV;

	if((lError!==null || lError!=="") && window.location.pathname==="/"){
		lError="";
	}
	useEffect(()=>{
		setLoginError(lError);
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
	
	const validateReqFld = (elem) => {
		elem.setCustomValidity('');
		if(!elem.checkValidity()){
			elem.reportValidity();
			return false;
		}else{
			return true;
		}
	}
	
	const onSetShowLForm = (value) => {
		dispatch(setLoginError(""));
		//setPrevShowLForm(currentLoginForm);
		dispatch(setCurrentLoginForm(value));
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
	
	document.addEventListener("keyup",function(event){
		if(event.key=== "Enter"){
			// if(currentLoginForm==="signin")
			// 	authenticate()
			// else
			 if(currentLoginForm===SIGN_UP)
				register()
			else if(currentLoginForm===RESET_PASSWORD)
				sendOtp()
			else if(currentLoginForm===RESET_PASSWORD_OTP)
				verifyOtpAndResetPwd()
			//else if(currentLoginForm==="change-pwd")
			//	changePwd()
		}
	});
	
	const register = async() => {
		const name = document.getElementById('name');
		const email = document.getElementById('email');
		const createPwd = document.getElementById('createPwd');
		const confirmPwd = document.getElementById('confirmPwd');
		const emailAvailality = document.getElementById('email-availality');
		if(!validateReqFld(name) || !validateReqFld(email) || 
			!validateReqFld(createPwd) || !validateReqFld(confirmPwd)){
			return;
		}
		if(!validateEmail(email)){
			cReportValidity(email,"Please provide valid email address")
			return;
		}
		if(!passwordStrength(createPwd)){
			return false;
		}
		if(createPwd.value!==confirmPwd.value){
			confirmPwd.setCustomValidity("Passwords doesn't match");
			confirmPwd.reportValidity();
			return;
		}
		disableDiv();
		setOpacity(0);
		const signUpPayoad = {
			name:name.value,
			userName:email.value,
			passWord:confirmPwd.value
		}
		const settings = {
			method : 'POST',
			headers : {
				'Authorization' : getAuth(),
				'Content-Type' : 'application/json; charset=UTF-8'
			},
			body:JSON.stringify(signUpPayoad)
		}
		const response = await fetch(`${getServiceURI()}/todo/signup`,settings);
		const data = await response.json();
		enableDiv();setOpacity(1);
		if(data.status){
			if(data.status==="success"){
				//setMessage("You have registered successfully. Please sign in to continue.");
				dispatch(setStatusAndMessage(SUCCESS,"You have registered successfully. Please sign in to continue."))
			}else if(data.status==='USER_EXISTS'){
				emailAvailality.innerHTML = 'User name already exists';
				emailAvailality.style.color = '#c9300d';
				email.classList.add('email-unavilabe');
				email.focus();
				return;
			}else{
				setMessage(data.error);
			}
			setLoginError(data.status);
			//setPrevShowLForm(currentLoginForm);
			dispatch(setCurrentLoginForm(L_SUCCESS));
		}
	}
	
	const checkUNameAvaiability = async(event) => {
		const uName = event.target;
		const emailAvailality = document.getElementById('email-availality');
		if(uName.value===''){
			emailAvailality.innerHTML='';
			uName.classList.remove('email-avilabe');
			uName.classList.remove('email-unavilabe');
			return;
		}
		if(!validateEmail(uName)){
			emailAvailality.innerHTML='Please provide valid email address';
			emailAvailality.style.color = '#c9300d';
			return;
		}
		const settings = {
			method:'GET',
		}
		const response = await fetch(`${getServiceURI()}/todo/user/checkUsername/${uName.value}`,settings);
		const data = await response.json();
		if(data.status==='USER_EXISTS'){
			emailAvailality.innerHTML = 'User name already exists';
			emailAvailality.style.color = '#c9300d';
			uName.classList.remove('email-avilabe');
			uName.classList.add('email-unavilabe');
			uName.focus();
		}else{
			emailAvailality.innerHTML = 'User name available';
			emailAvailality.style.color = 'green';
			uName.classList.add('email-avilabe');
			uName.classList.remove('email-unavilabe');
		}
	}

	const sendOtp = async() => {
		dispatch(setLoginError(""));
		const userName = document.getElementById('username-resetP');
		if(!validateReqFld(userName)){
			return;
		}
		if(!validateEmail(userName)){
			cReportValidity(userName,"Please provide valid email address");
			return;
		}
		disableDiv();
		setOpacity(0);
		const sendOtpPayload = {
			userName : userName.value
		}
		setEmailS(userName.value);
		const settings = {
			method : 'POST',
			headers : {
				'Authorization' : getAuth(),
				'Content-Type' : 'application/json; charset=UTF-8'
			},
			body : JSON.stringify(sendOtpPayload)
		}
		const response = await fetch(`${getServiceURI()}/todo/init-reset-pwd`,settings);
		const data = await response.json();
		enableDiv();setOpacity(1);
		if(data.status==="MESSAGE_SENT"){
			onSetShowLForm(RESET_PASSWORD_OTP);
		}else{
			if(data.error.indexOf("TOKEN_EXPIRED")!==-1){
				dispatch(setLoginError("Email service is down. Please contact system adminstrator"));
			}else{
				dispatch(setLoginError(data.error));
			}
		}
	}
	
	const verifyOtpAndResetPwd = async() => {
		dispatch(setLoginError(""));
		const otpResetP = document.getElementById('otp-resetP');
		const createPwd = document.getElementById('createPwd');
		const confirmPwd = document.getElementById('confirmPwd');
		if(!validateReqFld(otpResetP) || 
			!validateReqFld(createPwd) || !validateReqFld(confirmPwd)){
			return;
		}
		if(!passwordStrength(createPwd)){
			return false;
		}
		if(createPwd.value!==confirmPwd.value){
			cReportValidity(createPwd,"Passwords doesn't match");
			return;
		}
		disableDiv();
		setOpacity(0);
		const resetPPayload = {
			otp : otpResetP.value,
			passWord : confirmPwd.value,
			userName : emailS
		}
		const settings = {
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json; charset=UTF-8'
			},
			body : JSON.stringify(resetPPayload)
		}
		const response = await fetch(`${getServiceURI()}/todo/reset-pwd`,settings);
		const data = await response.json();
		enableDiv();setOpacity(1);
		if(data.status){
			if(data.status==="success"){
				setLoginError(data.status);
				setMessage("Password reset successful. Please sign in to continue.");
				//setPrevShowLForm(currentLoginForm);
				dispatch(setCurrentLoginForm(L_SUCCESS));
			}else{
				setLoginError(data.error);
			}
		}
	}
	
	
	
	const validateEmail = (email) => {
		return emailReg.test(email.value);
	}

	const cReportValidity = (elem,error) => {
		if(error!==null && error!==""){
			elem.setCustomValidity(error);
		}
		elem.reportValidity();
	}

	const passwordStrength = (elem) => {
		elem.setCustomValidity('');
		if(pwdstgth<4){
			//alert("Provided password is weak. Please provide a strong password");
			elem.setCustomValidity('Please provide a strong password');
			elem.reportValidity();
			return false;
		}else{
			return true;
		}
	}

	const checkPwdStrength = (event) => {
		event.target.setCustomValidity('');
		setPwdstgth(0);
		const createPwd = event.target.value;
		const pwdStrength = document.getElementById('pwdStrength');
		if(createPwd===''){
			pwdStrength.innerHTML='Password Strength';
			return;
		}
		var passed = 0;
		var regex = [];
		regex.push("[A-Z]"); //For Uppercase Alphabet
		regex.push("[a-z]"); //For Lowercase Alphabet
		regex.push("[0-9]"); //For Numeric Digits
		regex.push("[$@$!%*#?&]"); //For Special Characters

		regex.forEach(element => {
			if(new RegExp(element).test(createPwd)){
				passed++;
			}
		});

		if(passed>2 && createPwd.length>8){
			passed++;
		}
		setPwdstgth(passed);
		var color = "";
		var passwordStrength = "";
		switch(passed){
			case 0:
				break;
			case 1:
				passwordStrength = "Password is Weak.";
				color = "Red";
				break;
			case 2:
				passwordStrength = "Password is Good.";
				color = "darkorange";
				break;
			case 3:
				passwordStrength = "Password is Good.";
				color = "darkorange";
				break;
			case 4:
				passwordStrength = "Password is Strong.";
				color = "darkgreen";
				break;
			case 5:
				passwordStrength = "Password is Very Strong.";
				color = "Green";
				break;
			default:
				break;

		}
		pwdStrength.innerHTML = passwordStrength;
		pwdStrength.style.color = color;

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
				return <ResetPwdDiv loginError={loginError} onSendOtp={sendOtp} key={currentLoginForm} />
			case RESET_PASSWORD_OTP:
				return <ResetPwdOtpDiv loginError={loginError} onVerifyOtpAndResetPwd={verifyOtpAndResetPwd}  checkPwdStrength={checkPwdStrength} key={currentLoginForm} />
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