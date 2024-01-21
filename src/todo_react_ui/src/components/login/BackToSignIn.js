import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentLoginForm } from "../redux/login/loginActions";

export const BackToSignIn = () => {
    const dispatch = useDispatch();
    return(
        <div className="row row-label" id="go-back-to-login">
            <label className="signup-label">Go back to <span className='link-look' onClick={()=>dispatch(setCurrentLoginForm("signin"))}>Login</span>
            </label>
        </div>
    );
}