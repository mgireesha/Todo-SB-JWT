import {React, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowListAdd } from '../redux/list/listActions.js';
import { setShowTaskAdd } from '../redux/task/taskActions.js';
import {AddListFiled} from './AddListField.js';
import {AddListLabel} from './AddListLabel.js';
import { CREATE_LIST_SUCCESS } from '../redux/list/listActionTypes.js';

export const AddList = ({onAddList}) => {
	
	const dispatch = useDispatch();
	const showListAdd = useSelector(state => state.list.showListAdd);
	const showTaskAdd = useSelector(state => state.task.showTaskAdd);
	const phase = useSelector(state => state.list.phase);
	const TogglAddListField = (showListAdd) => {
		if(showListAdd && showTaskAdd){
			dispatch(setShowTaskAdd(false));
		}
		dispatch(setShowListAdd(showListAdd));
	}
	useEffect(()=>{
		if(phase===CREATE_LIST_SUCCESS){
			dispatch(setShowListAdd(false));
		}
	},[phase,dispatch])
	return (
		<div className="list-item-add" id="list-item-add">
			{!showListAdd ? <AddListLabel onTogglAddListField={TogglAddListField} /> : null}
			{ showListAdd ? <AddListFiled onAddList={onAddList} /> : null}
		</div>
	);
}