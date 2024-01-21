/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { exportTodoLists, setCommonPhase, setCommonPopupObject } from "../redux/common/commonActions";
import { EXPORT_LABEL, EXPORT_TODO_LISTS_LABEL, EXPORT_TODO_LISTS_QUESTION_LABEL, IMPORT_LABEL, INIT, NOT_YET_AVAIABLE_LABEL, TEXT } from "../redux/todoActionTypes";
import { EXPORT_TODO_LISTS_SUCESS } from "../redux/common/commonActionTypes";

export const ImportExport = () => {
    const dispatch = useDispatch();

    const exportTodoListsResponse = useSelector(state => state.common.exportTodoListsResponse);
    const commonPhase = useSelector(state => state.common.phase);
    const currentUser = useSelector(state => state.common.currentUser);

    const ImportExportBtnClick = () => {
        const popupObj = {
            showPopup : true,
            title: EXPORT_TODO_LISTS_LABEL,
            contentType: TEXT,
            content: EXPORT_TODO_LISTS_QUESTION_LABEL,
            primaryBtnClassName: 'success',
            primaryBtnLabel: EXPORT_LABEL,
            primaryBtnFun:initExportTodoList
        }

        dispatch(setCommonPopupObject(popupObj));
    }

    const initExportTodoList = () => {
        if(window.confirm("Export all todo lists ?")===true){
            dispatch(exportTodoLists());
        }
    }

    useEffect(()=>{
        if(commonPhase === EXPORT_TODO_LISTS_SUCESS && exportTodoListsResponse !== ""){
            initTodoListsDownload(exportTodoListsResponse);
        }
    },[exportTodoListsResponse, commonPhase]);

    const initTodoListsDownload = (resonseText) => {
        const exportFile = new Blob([resonseText],{type:'text/plain'});
        //file download - start
        const element = document.createElement("a");
        element.setAttribute("id", "download_todo_lists");
        element.href = URL.createObjectURL(exportFile);
        element.download = currentUser.userName+"_"+Date.now()+".csv";

        // simulate link click
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        document.body.removeChild(element);
        //file download - end
        dispatch(setCommonPopupObject({showPopup:false}));//cloe popup
        dispatch(setCommonPhase(INIT));
    }

    return(
        <div className="import-export">
            <h5>Export</h5>

            <div className="content">
                <button className="t-btn md info beige" onClick={()=>ImportExportBtnClick()}>{EXPORT_LABEL}</button>
                <button className="t-btn md cancel beige" disabled title={NOT_YET_AVAIABLE_LABEL}>{IMPORT_LABEL}</button>
            </div>
        </div>
    );
}