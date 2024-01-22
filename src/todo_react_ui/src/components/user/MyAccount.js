import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, fetchMyAccountLinks } from "../redux/common/commonActions";
import { IMPORT_OR_EXPORT, MANAGE_USERS, PASSWORD_AND_LOGIN, myAccountLinksLabels, orderedMyAccountLinks } from "../redux/todoActionTypes";
import { PasswordAndLogin } from "./PasswordAndLogin";
import { ImportExport } from "./ImportExport";
import { ManageUsers } from "../ManageUsers";

export const MyAccount = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.common.currentUser);
    const myAccountLinks = useSelector(state => state.common.myAccountLinks);

    const [selectedOptn, setSelectedOptn] = useState(PASSWORD_AND_LOGIN);

    useEffect(()=>{
        dispatch(fetchCurrentUser());
        dispatch(fetchMyAccountLinks());
    },[dispatch]);

    return(
        <div className="my-account">
            <div className="my-account-header">
                <h3>My Account&nbsp;&nbsp;〉</h3>
                <h6>Hi {currentUser.name},</h6>
            </div>
            <div className="my-account-page">
                <div className="options">
                    {myAccountLinks && orderedMyAccountLinks.map((linkKey,i)=>
                        <>
                            {myAccountLinks[linkKey] && 
                                <div key={i} className={selectedOptn === linkKey ? "option selected" : "option"} onClick={()=>setSelectedOptn(linkKey)}>
                                    <label>{myAccountLinksLabels[linkKey]}</label>
                                </div>
                            }
                        </>
                    )}
                </div>
                <div className="content">
                    {selectedOptn === PASSWORD_AND_LOGIN && <PasswordAndLogin />}
                    {selectedOptn === IMPORT_OR_EXPORT && <ImportExport />}
                    {selectedOptn === MANAGE_USERS && <ManageUsers />}
                </div>
            </div>
        </div>
    );
}