import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import { SignInDiv } from './SignInDiv.js';
import { SignUpDiv } from './SignUpDiv.js';
import { LSuccessDiv } from './LSuccessDiv.js';
import { ResetPwdDiv } from './ResetPwdDiv.js';
import { ChangePwdDiv } from './ChangePwdDiv.js';
import { ResetPwdOtpDiv } from './ResetPwdOtpDiv.js';
import { disableDiv, enableDiv, getAuth, getServiceURI } from '../utils/GlobalFuns.js';
import { LoaderColored } from '../loader/loaderColored.js';
import { setCookies } from '../utils/utils.js';
import { useDispatch } from 'react-redux';

export const Login = ({lError}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loginError,setLoginError] = useState("");
	const [showLForm,setShowLForm] = useState("signin");
	const [prevShowLForm,setPrevShowLForm] = useState("signin");
	const [message,setMessage] = useState("");
	const [emailS,setEmailS] = useState("");
	const [pwdstgth,setPwdstgth] = useState(0);

	const emailReg = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

	if((lError!==null || lError!=="") && window.location.pathname==="/"){
		lError="";
	}
	useEffect(()=>{
		setLoginError(lError);
	},[lError]);
	
	useEffect(()=>{
		if(document.getElementById('body-signin')!==undefined){
			document.getElementById('body-signin').style.height=window.innerHeight+'px';
		}
		
	},[]);
	
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
		setLoginError("");
		setPrevShowLForm(showLForm);
		setShowLForm(value);
	}
	const authenticate = async() => {
		setLoginError("");
		document.cookie="jToken=;";
		const username= document.getElementById('username');
		const password = document.getElementById('password');
		if(!validateReqFld(username) || !validateReqFld(password)){
			return;
		}
		disableDiv();
		setOpacity(0,'Signing In..');
		const  authPayLoad = {
			username:username.value,
			password:password.value
		}
		const settings = {
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json; charset=UTF-8'
			},
			body:JSON.stringify(authPayLoad)
		}
		const response = await fetch(`${getServiceURI()}/todo/authenticate`,settings);
		const data = await response.json();
		if(data.jwt){
				setCookies("jToken","Bearer "+data.jwt);
				window.location.replace("/#/todo");
				// setTimeout(function(){
				// 	dispatch(fetchHeaderLinks());
				// 	navigate("/todo/");
				// },3000);
		}else{
			setLoginError(data.error); 
			setOpacity(1);
		}
		enableDiv();
		//setOpacity(1);
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
			if(showLForm==="signin")
				authenticate()
			else if(showLForm==="signup")
				register()
			else if(showLForm==="reset")
				sendOtp()
			else if(showLForm==="verify-otp")
				verifyOtpAndResetPwd()
			else if(showLForm==="change-pwd")
				changePwd()
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
				setMessage("You have registered successfully. Please sign in to continue.");
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
			setPrevShowLForm(showLForm);
			setShowLForm("lsuccess");
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
		setLoginError("");
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
			onSetShowLForm("verify-otp");
		}else{
			if(data.error.indexOf("TOKEN_EXPIRED")!==-1){
				setLoginError("Email service is down. Please contact system adminstrator");
			}else{
				setLoginError(data.error);
			}
		}
	}
	
	const verifyOtpAndResetPwd = async() => {
		setLoginError("");
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
				setPrevShowLForm(showLForm);
				setShowLForm("lsuccess");
			}else{
				setLoginError(data.error);
			}
		}
	}
	
	const changePwd = async() => {
		setLoginError("");
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
		const changePPayload = {
			currentPassword : currentPwd.value,
			passWord : confirmPwd.value,
			userName : username.value
		}
		const settings = {
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json; charset=UTF-8'
			},
			body : JSON.stringify(changePPayload)
		}
		const response = await fetch(`${getServiceURI()}/todo/change-pwd`,settings);
		const data = await response.json();
		enableDiv();setOpacity(1);
		if(data.status){
			if(data.status==="success"){
				setLoginError(data.status);
				setMessage("Password changed. Please sign in to continue.");
				setPrevShowLForm(showLForm);
				setShowLForm("lsuccess");
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

	return (
		<div className="body-signin" id="body-signin">
			<div className="container ">
				<div className="row row-main">
					<div className="col-sm-3"></div>
					{/*<div className="col-sm-5 middle-span">*/}
						{(showLForm==="signin" || showLForm==="") && <SignInDiv loginError={loginError} onSetShowLForm={onSetShowLForm} onAuthenticate={authenticate} />}
						{showLForm==="signup" && <SignUpDiv onSetShowLForm={onSetShowLForm} onRegister={register} prevShowLForm={prevShowLForm} checkPwdStrength={checkPwdStrength} checkUNameAvaiability={checkUNameAvaiability} />}
						{showLForm==="lsuccess" && <LSuccessDiv loginError={loginError} onSetShowLForm={onSetShowLForm} onSetLoginError={setLoginError} message={message} />}
						{showLForm==="reset" && <ResetPwdDiv loginError={loginError} onSetShowLForm={onSetShowLForm} onSendOtp={sendOtp} prevShowLForm={prevShowLForm} />}
						{showLForm==="verify-otp" && <ResetPwdOtpDiv loginError={loginError} onSetShowLForm={onSetShowLForm} onVerifyOtpAndResetPwd={verifyOtpAndResetPwd} prevShowLForm={prevShowLForm} checkPwdStrength={checkPwdStrength} />}
						{showLForm==="change-pwd" && <ChangePwdDiv loginError={loginError} onSetShowLForm={onSetShowLForm} onChangePwd={changePwd} prevShowLForm={prevShowLForm} checkPwdStrength={checkPwdStrength} />}
					{/*</div>*/}
					<LoaderColored />
					<div className="col-sm-3"></div>
				</div>
			</div>
		</div>
	);
}