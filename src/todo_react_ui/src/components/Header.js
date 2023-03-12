import React, { useEffect } from 'react';
import { getAuth } from './utils/GlobalFuns';
import Select from 'react-select';
import { headerLinksSelectStyles } from './utils/utils';
import { useState } from 'react';
export const Header = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(()=>{
		setIsAuthenticated(getAuth()!==""?true:false);
	},[])
	const handleChange = (selectedOption) => {
		if(selectedOption.label === "Logout"){
			setIsAuthenticated(false);
		}
		window.location.replace(selectedOption.value);
	}
	const options = [
		{ value: '/#/logout', label: 'Logout' },
		{ value: '/#/todo/ManageUsers', label: 'Manage Users' },
		{ value: '/#/todo/ReadExcel', label: 'Import / Export' },
	  ];
	return (
		<div className="row" id="todo-header">
			<a href="/" style={{marginLeft: 0.4+'em',color:'beige',width:40+'%'}}><h4 className="todo-header-label"><i>ToDo</i></h4></a>
			{isAuthenticated && 
				<Select styles={headerLinksSelectStyles} 
					options={options}
					onChange={handleChange}
					classNamePrefix="header-links"
				/>
			}
		</div>
	);
}