import {React,useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateList } from '../redux/list/listActions';
import { UPDATE_LIST_SUCCESS } from '../redux/list/listActionTypes';

export const TaskListName = ({todoList}) => {
	const dispatch = useDispatch();
	const phase = useSelector(state => state.list.phase);
	const [showListNameField, setShowListNameField] = useState(false);
	useEffect(()=>{
		if(showListNameField && document.getElementById('task-list-name-text')!==null && todoList.listName!==undefined){
			document.getElementById('task-list-name-text').focus();
			document.getElementById('task-list-name-text').value = todoList.listName;
		}
	},[showListNameField,todoList]);
	
	const updateListName = (event) => {
		const tempTodoList = {...todoList};
		const updatedListName = event.target.value;
		if(updatedListName===todoList.listName){
			setShowListNameField(false);
			return false;
		}
		tempTodoList.listName = updatedListName;
		dispatch(updateList(tempTodoList));
	}

	useEffect(()=>{
		if(phase===UPDATE_LIST_SUCCESS){
			setShowListNameField(false);
		}
	},[phase])
	
	return (
		<div className="row task-list-name" style={{minHeight: 3.125+'em'}}>
			{!showListNameField && 
				<h2 className="task-list-name-header" onClick={todoList.groupName!=="default" ? ()=>setShowListNameField(true) : null} 
							id="task-list-name-header-271">{todoList.listName}</h2>
			}
			{showListNameField && <input type="text" id="task-list-name-text" className="task-list-name-text form-control" style={{backgroundColor: '#403A3A'}} onBlur={(event)=>updateListName(event)} />}
		</div>
	);
}