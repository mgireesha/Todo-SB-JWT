import { React } from 'react';

import {BsArrowLeftSquare} from 'react-icons/bs';
import { PasswordField } from './PasswordField';

export const SignUpDiv = ({ onRegister, onSetShowLForm, prevShowLForm, checkPwdStrength,checkUNameAvaiability}) => {
	return (
		<div className="col-sm-5 middle-span">
		<div className="signup-form">
			<BsArrowLeftSquare onClick={()=>onSetShowLForm(prevShowLForm)} className='login-back-arrow' />
			<h1 className="signup-header">Sign Up</h1>
			<div className="row row-label">
				<label className="signup-label">Name</label>
				<input className="form-control signup-input" name="name" id="name" placeholder="Your name" required />
			</div>
			<div className="row row-label">
				<label className="signup-label">Email</label>
				<input className="form-control signup-input" name="email" id="email" placeholder="Your email" required onKeyUp={(event)=>checkUNameAvaiability(event)} />
				<span id="email-availality" style={{display: 'inline-block',padding: 0.1+'em',color: 'darkgreen'}} className=""></span>
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
				<button className="btn-signup" onClick={onRegister}>Sign Up</button>
			</div>
			<div className="row row-label">
				<label className="signup-label">
					Already a user ? <span onClick={()=>onSetShowLForm("signin")} className='link-look'>sign in</span>
				</label>
			</div>
		</div>
		</div>
	);
}