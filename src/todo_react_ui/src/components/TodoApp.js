import React from "react";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { getAuth } from './utils/GlobalFuns';
import { ReadExcelFile } from './importExport/ReadExcelFile';
import { MyAccount } from './user/MyAccount.js';
import { Header } from './Header.js';
import { TodoBody } from './TodoBody';
import { Login } from './login/Login.js';
import {ManageUsers} from './ManageUsers.js';
import { StatusMessage } from "./utils/StatusMessage.js";
import { CommonPopup } from "./common/CommnPopup.js";

export const TodoApp = () => {
    return(
        <>
			<Router>
                <Header/>
				<Routes>
					{['/login', '/logout'].map((path, index) => <Route path={path} element={<Login />} key={index} />)}
					<Route path='/todo/ManageUsers' element={<ManageUsers />} />
					{['/', '/todo'].map((path, index) => <Route path={path} 
						element={getAuth() !== '' ? <TodoBody /> : <Login lError="Session expired. Please login" />} key={index} />)
					}
					<Route path='/todo/ReadExcel' element={<ReadExcelFile/>} />
					<Route path='/todo/my-account' element={getAuth() !== '' ?<MyAccount/> : <Login lError="Session expired. Please login" />} />
				</Routes>
				<StatusMessage/>
				<CommonPopup />
			</Router>
        </>
    );
}