import {React } from 'react';

export const HiddenBodyInputs = ({todoList}) => {
	
	return (
		<div id="hidBdyInp">
			<input type="hidden" name="listName" id="listName" value={todoList.listName}  />
			<input type="hidden" name="listId" id="listId" value={todoList.listId}  />
		
		</div>
		
	);
}