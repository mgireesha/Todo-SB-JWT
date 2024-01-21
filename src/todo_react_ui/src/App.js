import { React } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './components/main.scss';
import './components/login/SignIn.css';
import 'react-datepicker/dist/react-datepicker.css';

import { Provider } from 'react-redux';
import store from './components/redux/store';
import { TodoApp } from './components/TodoApp.js';
function App() { 

	return (
		<div className="container-fluid margin-zero" id="app-main-div">
		<div id="disable-div" className="disable-div" style={{display:'none'}}></div>
			<Provider store={store}>
				<TodoApp />
			</Provider>
			
		</div>
	);
}

export default App;
