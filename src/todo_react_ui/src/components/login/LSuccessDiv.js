import {React} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SUCCESS } from '../redux/todoActionTypes';
import { setCurrentLoginForm } from '../redux/login/loginActions';

export const LSuccessDiv = () => {
	const dispatch = useDispatch();
	const message = useSelector(state => state.login.message);
	const loginError = useSelector(state => state.login.loginError);
	return(
		<div className='slide-in-left signup-form'>
			<h1 className="signup-header" style={{color:loginError==="success"?"green":"red", textTransform:'capitalize'}}>{loginError}!</h1>
			<div className="row row-label">
				{loginError===SUCCESS &&<h4 id="message">{message}</h4>}
			</div>
			<div className="row row-btn">
				<button className="btn-signup" onClick={()=>dispatch(setCurrentLoginForm("signin"))}>Sign In</button>
			</div>
		</div>
	);
}