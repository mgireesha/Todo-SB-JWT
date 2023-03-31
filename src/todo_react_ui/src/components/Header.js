import React, { useEffect } from 'react';
import { getAuth } from './utils/GlobalFuns';
import Select from 'react-select';
import { headerLinksSelectStyles } from './utils/utils';
import { useState } from 'react';
import { useSelector} from 'react-redux';
import { headerLinksLabels } from './redux/todoActionTypes';
export const Header = () => {
	const userListsKeys = useSelector(state => state.list.userListsKeys);
	const headerLinks = useSelector(state => state.common.headerLinks);
	
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	
	useEffect(()=>{
		setIsAuthenticated(getAuth()!==""?true:false);
	},[userListsKeys])
	const handleChange = (selectedOption) => {
		if(selectedOption.label === "Logout"){
			document.cookie="jToken=;";
			setIsAuthenticated(false);
		}
		window.location.replace(selectedOption.value);
	}
	/*const options = [
		{ value: '/#/logout', label: 'Logout' },
		{ value: '/#/todo/ManageUsers', label: 'Manage Users' },
		{ value: '/#/todo/ReadExcel', label: 'Import / Export' },
	  ];*/

	  const headerLinksOptions = Object.keys(headerLinks).map(key => {
		return {label:headerLinksLabels[key], value:headerLinks[key]}
	  })
	  
	return (
		<div className="row" id="todo-header">
			<a href="/" style={{marginLeft: 0.4+'em',color:'beige',width:40+'%'}}><h4 className="todo-header-label"><i>ToDo</i></h4></a>
			{isAuthenticated && 
				<Select styles={headerLinksSelectStyles} 
					options={headerLinksOptions}
					defaultValue = {{ value: '/#/logout', label: 'Logout' }}
					onChange={handleChange}
					classNamePrefix="header-links"
				/>
			}
		</div>
	);
}