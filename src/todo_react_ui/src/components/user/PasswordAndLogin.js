import React from "react";
import { ChangePwdDiv } from "../login/ChangePwdDiv";
import { CHANGE_PASSWORD_LABEL, MY_ACCOUNT } from "../redux/todoActionTypes";

export const PasswordAndLogin = () => {
    

    return(
        <div className="password-and-login">
            <h5>{CHANGE_PASSWORD_LABEL}</h5>
            <ChangePwdDiv options={{fromPage:MY_ACCOUNT,hideBackArrow:true,hideHeader:true,hideBackToLoginBtn:true, className:'change-password'}}/>
        </div>
    );
}