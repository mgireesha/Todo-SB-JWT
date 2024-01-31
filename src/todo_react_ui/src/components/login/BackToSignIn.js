import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentLoginForm } from "../redux/login/loginActions";
import { SIGN_IN } from "../redux/todoActionTypes";

export const BackToSignIn = () => {
    const dispatch = useDispatch();
    return(
        <div className="row row-label" id="go-back-to-login">
            <label className="signup-label">Go back to <span className='link-look' onClick={()=>dispatch(setCurrentLoginForm(SIGN_IN))}>Login</span>
            </label>
        </div>
    );
}