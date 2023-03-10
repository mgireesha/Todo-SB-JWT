import {React} from 'react';

export const LSuccessDiv = ({loginError, onSetShowLForm, message}) => {
	return(
		<div className="col-sm-5 middle-span">
		<div className="signup-form">
			<h1 className="signup-header" style={{color:loginError==="success"?"green":"red", textTransform:'capitalize'}}>{loginError}!</h1>
			<div className="row row-label">
				{loginError==="success" &&<h4 id="message">{message}</h4>}
			</div>
			<div className="row row-btn">
				<button className="btn-signup" onClick={()=>onSetShowLForm("signin")}>Sign In</button>
			</div>
		</div>
		</div>
	);
}