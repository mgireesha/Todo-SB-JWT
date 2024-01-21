import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCommonPopupObject } from "../redux/common/commonActions";
import { COMMON_POPUP_ERROR_MSG, COMMON_POPUP_PRIMARY_BTN, COMPONENT, INPUT, TEXT } from "../redux/todoActionTypes";

export const CommonPopup = () => {
    const dispatch = useDispatch();
    const commonPopupObject = useSelector(state => state.common.commonPopupObject);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(()=>{
        if(commonPopupObject){
            if(commonPopupObject.showPopup){
                setShowPopup(commonPopupObject.showPopup);
            }else{
                setShowPopup(false);
            }
            const errMsg = document.getElementById(COMMON_POPUP_ERROR_MSG);
            if(errMsg){
                errMsg.innerHTML = "";
            }
        }
    },[commonPopupObject]);

    const closePopup = () => {
        const tempPopupObj = {
            showPopup: false
        }
        dispatch(setCommonPopupObject(tempPopupObj));
    }


    useEffect(()=>{
            const handleKeyUp = (event) => {
                if(event.key === 'Enter'){
                    const primaryBtn = document.getElementById(COMMON_POPUP_PRIMARY_BTN);
                    if(primaryBtn)primaryBtn.click();
                }
            }
            document.addEventListener('keyup', handleKeyUp, true);
            return () => {
                document.removeEventListener('keyup', handleKeyUp);
            };
    },[]);

    return (
        <>
            <div className="common-popup" style={{ display: showPopup ? 'flex' : 'none' }}>
                <div className="popup-container">
                    <div className="popup-header">
                        <label className='label'>{commonPopupObject.title}</label>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={closePopup}>×</button>
                    </div>
                    <div className="popup-body">
                        {commonPopupObject.contentType === TEXT && 
                            commonPopupObject.content
                        }
                        {commonPopupObject.contentType === INPUT &&
                            <input type="text" className="input" defaultValue={commonPopupObject.content} id={commonPopupObject.elementId ? commonPopupObject.elementId:'COMMON_POPUP_INP_ID_1'} placeholder={commonPopupObject.placeHolder?commonPopupObject.placeHolder:''} />
                        }
                        {commonPopupObject.contentType === COMPONENT && 
                            <commonPopupObject.component />
                        }
                        <p id={COMMON_POPUP_ERROR_MSG} style={{color:'red',paddingTop:10}}></p>
                    </div>
                    <div className="popup-footer">
                        <div className='buttons'>
                            <button type="button" className="t-btn sm cancel" onClick={closePopup}>Cancel</button>
                            <button type="button" className={`t-btn sm ${commonPopupObject.primaryBtnClassName}`} 
                                onClick={commonPopupObject.dispatchPayload ? ()=>dispatch(commonPopupObject.primaryBtnFun(commonPopupObject.payload)) : commonPopupObject.primaryBtnFun}
                                id={COMMON_POPUP_PRIMARY_BTN}
                                >
                                    {commonPopupObject.primaryBtnLabel?commonPopupObject.primaryBtnLabel:"Go"}
                            </button>
                        </div>
                        <br />
                    </div>
                </div>
                <div className='disable-div' style={{ display: showPopup ? 'block' : 'none' }} onClick={closePopup}></div></div>
            
        </>
    );
}