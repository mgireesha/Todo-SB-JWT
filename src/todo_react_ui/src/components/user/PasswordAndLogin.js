import React from "react";
import { ChangePwdDiv } from "../login/ChangePwdDiv";
import { MY_ACCOUNT } from "../redux/todoActionTypes";

export const PasswordAndLogin = () => {
    

    return(
        <div className="password-and-login">
            <h5>Change Password</h5>
            <ChangePwdDiv options={{fromPage:MY_ACCOUNT,hideBackArrow:true,hideHeader:true,hideBackToLoginBtn:true, className:'change-password'}}/>
        </div>
    );
}