import {React} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_IN, SUCCESS } from '../redux/todoActionTypes';
import { resetStatusAndMessage, setCurrentLoginForm } from '../redux/login/loginActions';

export const LSuccessDiv = () => {
	const dispatch = useDispatch();
	const message = useSelector(state => state.login.message);
	const status = useSelector(state => state.login.status);

	const onSetCurrentLoginForm = (lForm) => {
		dispatch(resetStatusAndMessage());
		dispatch(setCurrentLoginForm(SIGN_IN));
	} 

	return(
		<div className='slide-in-left signup-form flexbox-center' style={{width:'100%'}}>
			<h1 className="signup-header" style={{color:status===SUCCESS?"green":"red", textTransform:'capitalize'}}>{status}!</h1>
			<div className="row row-label">
				{status===SUCCESS &&<h4 id="message">{message}</h4>}
			</div>
			<div className="row row-btn">
				<button className="btn-signup" onClick={onSetCurrentLoginForm}>Sign In</button>
			</div>
		</div>
	);
}