/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { ReadExcelFile } from './importExport/ReadExcelFile';
import { MyAccount } from './user/MyAccount.js';
import { Header } from './Header.js';
import { TodoBody } from './TodoBody';
import { Login } from './login/Login.js';
import {ManageUsers} from './ManageUsers.js';
import { StatusMessage } from "./utils/StatusMessage.js";
import { CommonPopup } from "./common/CommnPopup.js";
import { useSelector } from "react-redux";

export const TodoApp = () => {
	const isAuthenticated = useSelector(state => state.login.isAuthenticated);
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