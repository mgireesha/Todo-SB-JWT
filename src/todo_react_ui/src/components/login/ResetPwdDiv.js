import { React } from 'react';
import {BsArrowLeftSquare} from 'react-icons/bs';

export const ResetPwdDiv = ({ loginError, onSetShowLForm, onSendOtp, prevShowLForm }) => {
	return (
		<div className="col-sm-5 middle-span">
		<div className="signup-form">
			<BsArrowLeftSquare onClick={()=>onSetShowLForm(prevShowLForm)} className='login-back-arrow' />
			<h1 className="signup-header">Reset Password</h1>
			<div className="reset-pwd-div" id="reset-pwd-div">
				<div className="row row-label">
					<label for="username" className="signup-label">User Name</label>
					<input className="form-control signup-input" type="text" name="username" id="username-resetP" placeholder="Your email" required />
				</div>
				<div className="row row-btn">
					<button type="button" className="btn-signup" onClick={onSendOtp}>Send OTP</button>
					<label style={{color: '#c9300d'}} className="signup-label" id="init-rpd-error">{loginError}</label>
				</div>
			</div>
			<div className="row row-label" id="go-back-to-login">
				<label className="signup-label col-sm-4">Go back to <span className='link-look' onClick={()=>onSetShowLForm("signin")}>Login</span>
				</label>
				<label className="signup-label col-sm-6">
					New user ? <span onClick={()=>onSetShowLForm("signup")} className='link-look'>sign up</span> here
				</label>
			</div>
		</div>
		</div>
	);
}