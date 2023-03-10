import { React } from 'react';

import whiteLeftArrow from '../../images/white-left-arrow.png';
import {BsArrowLeftSquare} from 'react-icons/bs';
import { PasswordField } from './PasswordField';

export const ChangePwdDiv = ({ loginError, onChangePwd, onSetShowLForm, prevShowLForm,checkPwdStrength, showPwd, setShowPwd }) => {
	return (
		<div className="col-sm-5 middle-span">
		<div className="signup-form">
			<BsArrowLeftSquare onClick={()=>onSetShowLForm(prevShowLForm)} className='login-back-arrow' />
			<h1 className="signup-header">Change Password</h1>
			<div className="row row-label">
				<label className="signup-label">User Name</label>
				<input className="form-control signup-input" type="text" name="username" id="username" placeholder="Your email" required />
			</div>
			<div className="row row-label">
				<label className="signup-label">Current Passeword</label>
				<PasswordField id='current-pwd' name='current-pwd' placeholder='Current Password' />
				<label style={{color: '#c9300d'}} className="signup-label" id="verify-otp-error">{loginError}</label>
			</div>
			<div className="row row-label">
				<label className="signup-label">Create new password</label>
				<PasswordField id='createPwd' name='createPwd' placeholder='Create password' onKeyUp={checkPwdStrength} />
				<span id="pwdStrength" style={{display: 'inline-block',padding: 0.1+'em',color: 'darkgreen'}} className="col-sm-7">Password Strength</span>
			</div>
			<div className="row row-label">
				<label className="signup-label">Confirm password</label>
				<PasswordField id='confirmPwd' name='confirmPwd' placeholder='Confirm password' />
			</div>
			<div className="row row-btn">
				<button type="button" className="btn-signup" onClick={onChangePwd}>Change Pawssword</button>
			</div>
			<div className="row row-label" id="go-back-to-login">
				<label className="signup-label">Go back to <span className='link-look' onClick={()=>onSetShowLForm("signin")}>Login</span>
				</label>
			</div>
		</div>
		</div>
	);
}