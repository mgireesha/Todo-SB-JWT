import { React } from 'react';
import './App.css';
import { Header } from './components/Header.js';
import { TodoBody } from './components/TodoBody';
import { Login } from './components/login/Login.js';
import {ManageUsers} from './components/ManageUsers.js';
import 'bootstrap/dist/css/bootstrap.css';
import './components/main.scss';
import './components/login/SignIn.css';
import 'react-datepicker/dist/react-datepicker.css';

import { Provider } from 'react-redux';
import store from './components/redux/store';

import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { getAuth } from './components/utils/GlobalFuns';
import { ReadExcelFile } from './components/importExport/ReadExcelFile';
function App() { 
	function getAuth() {
		let cookies = document.cookie;
		let cookiesArr = cookies.split(';');
		let cookieArr = [];
		let jToken = '';
		cookiesArr.forEach(cookie => {
			cookieArr = cookie.split('=');
			if (cookieArr[0].trim() === "jToken") {
				jToken = cookieArr[1];
			}
		});
		return jToken;
	}

	function disableDiv() {
		document.getElementById('disable-div').style.width
			= document.getElementById('app-main-div').offsetWidth + 'px';
		document.getElementById('disable-div').style.height
			//= document.getElementById('app-main-div').offsetHeight+'px';
			= window.innerHeight + 30 + 'px';
		document.getElementById('disable-div').style.top = '-30px';
		document.getElementById('disable-div').style.display = 'block';
	}
	function enableDiv() {
		document.getElementById('disable-div').style.display = 'none';
	}

	return (
		<div className="container-fluid margin-zero" id="app-main-div">
		<div id="disable-div" className="disable-div" style={{display:'none'}}></div>
			<Provider store={store}>
			<Header/>
			<Router>
				<Routes>
					{['/login', '/logout'].map((path, index) => <Route path={path} element={<Login />} key={index} />)}
					<Route path='/todo/ManageUsers' element={<ManageUsers />} />
					{['/', '/todo'].map((path, index) => <Route path={path} 
						element={getAuth() !== '' ? <TodoBody /> : <Login lError="Session exired. Please login" />} key={index} />)
					}
					<Route path='/todo/ReadExcel' element={<ReadExcelFile/>} />
				</Routes>
			</Router>
			</Provider>
			
		</div>
	);
}

export default App;
