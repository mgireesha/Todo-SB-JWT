import React from 'react';
import { getAuth } from './utils/GlobalFuns';
export const Header = () => {
	return (
		<div className="row" id="todo-header">
			<h4 className="" style={{marginLeft: 0.4+'em',color:'beige',width:80+'%'}}><i>ToDo</i></h4>
			{getAuth()!=="" &&<a className="" style={{width:15+'%'}} href="/#/logout">Logout</a>}
		</div>
	);
}