import { React } from 'react';

import { PasswordField } from './PasswordField';
import {BsArrowLeftSquare} from 'react-icons/bs';
import { BackToSignIn } from './BackToSignIn';

export const ResetPwdOtpDiv = ({ loginError, onSetShowLForm, onVerifyOtpAndResetPwd, prevShowLForm, checkPwdStrength }) => {
	return (
		<div className="slide-in-left signup-form">
			<BsArrowLeftSquare onClick={()=>onSetShowLForm(prevShowLForm)} className='login-back-arrow' />
			<h1 className="signup-header">Reset Password</h1>
			<div className="row row-label">
				<label className="signup-label">OTP</label>
				<input className="form-control signup-input" type="text" name="otp-resetP" id="otp-resetP" placeholder="One time password" required />
				<label style={{color: '#c9300d'}} className="signup-label" id="verify-otp-error">{loginError}</label>
			</div>
			<div className="row row-label">
				<label className="signup-label">Create new password</label>
				<PasswordField id='createPwd' name='createPwd' placeholder='Create Password' onKeyUp={checkPwdStrength} />
				<span id="pwdStrength" style={{display: 'inline-block',padding: 0.1+'em',color: 'darkgreen'}} className="col-sm-7">Password Strength</span>
			</div>
			<div className="row row-label">
				<label className="signup-label">Confirm password</label>
				<PasswordField id='confirmPwd' name='confirmPwd' placeholder='Confirm Password' />
			</div>
			<div className="row row-btn">
				<button type="button" className="btn-signup" onClick={onVerifyOtpAndResetPwd}>Verify</button>
			</div>
			<BackToSignIn />
		</div>
	);
}