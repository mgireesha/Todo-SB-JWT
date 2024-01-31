import { React } from 'react';
import {BsArrowLeftSquare} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_IN, SIGN_UP } from '../redux/todoActionTypes';
import { setCurrentLoginForm } from '../redux/login/loginActions';

export const ResetPwdDiv = ({ loginError, onSetShowLForm, onSendOtp }) => {
	const dispatch = useDispatch();
	const prevLoginForm = useSelector(state => state.login.prevLoginForm);
	return (
			<div className='slide-in-left signup-form'>
				<BsArrowLeftSquare onClick={()=>dispatch(setCurrentLoginForm(prevLoginForm))} className='login-back-arrow' />
				<h1 className="signup-header">Reset Password</h1>
				<div className="reset-pwd-div" id="reset-pwd-div">
					<div className="row row-label">
						<label htmlFor="username" className="signup-label">User Name</label>
						<input className="form-control signup-input" type="text" name="username" id="username-resetP" placeholder="Your email" required />
					</div>
					<div className="row row-btn">
						<button type="button" className="btn-signup" onClick={onSendOtp}>Send OTP</button>
						<label style={{color: '#c9300d'}} className="signup-label" id="init-rpd-error">{loginError}</label>
					</div>
				</div>
				<div className="row row-label" id="go-back-to-login">
					<label className="signup-label col-sm-4">Go back to <span className='link-look' onClick={()=>dispatch(setCurrentLoginForm(SIGN_IN))}>Login</span>
					</label>
					<label className="signup-label col-sm-6">
						New user ? <span onClick={()=>dispatch(setCurrentLoginForm(SIGN_UP))} className='link-look'>sign up</span> here
					</label>
				</div>
			</div>
	);
}