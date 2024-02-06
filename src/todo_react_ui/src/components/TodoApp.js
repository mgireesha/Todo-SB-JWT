/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { ReadExcelFile } from './importExport/ReadExcelFile';
import { MyAccount } from './user/MyAccount.js';
import { Header } from './Header.js';
import { TodoBody } from './TodoBody';
import { Login } from './login/Login.js';
import {ManageUsers} from './ManageUsers.js';
import { StatusMessage } from "./utils/StatusMessage.js";
import { CommonPopup } from "./common/CommnPopup.js";
import { useDispatch, useSelector } from "react-redux";
import { TOKEN_EXPIRED } from "./redux/todoActionTypes.js";
import { setIsAuthenticated } from "./redux/login/loginActions.js";
import { setApiErr } from "./redux/common/commonActions.js";

export const TodoApp = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(state => state.login.isAuthenticated);
	const taskApiErr = useSelector(state => state.task.apiError);

	useEffect(()=>{
		if(taskApiErr.ERROR_CODE===TOKEN_EXPIRED){
			dispatch(setIsAuthenticated(false, taskApiErr.ERROR_MESSAGE));
			dispatch(setApiErr({}));
		}
	},[taskApiErr])
    return(
        <>
			<Router>
                <Header/>
				<Routes>
					{['/login', '/logout'].map((path, index) => <Route path={path} element={<Login />} key={index} />)}
					<Route path='/todo/ManageUsers' element={<ManageUsers />} />
					{['/', '/todo'].map((path, index) => <Route path={path} 
						element={isAuthenticated ? <TodoBody /> : <Login lError="Session expired. Please login" />} key={index} />)
					}
					<Route path='/todo/ReadExcel' element={isAuthenticated ?<ReadExcelFile/> : <Login lError="Session expired. Please login" />} />
					<Route path='/todo/my-account' element={isAuthenticated ?<MyAccount/> : <Login lError="Session expired. Please login" />} />
				</Routes>
				<StatusMessage/>
				<CommonPopup />
			</Router>
        </>
    );
}