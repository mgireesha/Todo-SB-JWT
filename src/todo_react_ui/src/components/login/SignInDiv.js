import { React } from 'react';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import { PasswordField } from './PasswordField';

export const SignInDiv = ({onAuthenticate, loginError, onSetShowLForm}) => {
	return (
		<div className="col-sm-5 middle-span">
		<div className="signup-form">
			<h1 className="signup-header">Sign In</h1>
			<div className="row row-label">
				<label className="signup-label">User Name</label>
				<input className="form-control signup-input" type="text" name="username" id="username" placeholder="Your email" required />
			</div>
			<div className="row row-label">
				<label  className="signup-label">Password</label>
				<PasswordField id='password' name='password' placeholder='Password'/>
				{loginError !== "" && <label style={{ color: '#e34e4e', padding: 0 }}>{loginError}</label>}
				<label className="signup-label" style={{width:50+'%'}}>
					<span className='link-look' onClick={()=>onSetShowLForm("reset")} style={{fontSize: 12,textDecoration:'none'}}>Forgot password ?</span>
				</label>
				<label className="signup-label" style={{width:50+'%'}}>
					<span className='link-look' style={{fontSize: 12,textDecoration:'none'}} onClick={()=>onSetShowLForm("change-pwd")}>Change password</span>
				</label>
			</div>
			<div className="row row-btn">
				<button className="btn-signup" onClick={onAuthenticate}>Sign In</button>
			</div>
			<div className="row row-label">
				<label className="signup-label">
					New user ? <span onClick={()=>onSetShowLForm("signup")} className='link-look'>sign up</span> here
				</label>
			</div>
		</div>
		</div>
	);
}