import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';

import deleteRed2027 from '../../images/delete-red-20x27.png';

import {TaskDueDate} from './TaskDueDate.js';
import {TaskRemindDate} from './TaskRemindDate.js';
import {TaskDateSelector } from './TaskDateSelector.js';
import {TaskNote} from './TaskNote.js';
import {TaskMove} from './TaskMove';
import {TaskMoveListSelector} from './TaskMoveListSelector.js';
import {TaskUriRef} from './TaskUriRef.js';
import {ConfirmPopup} from '../ConfirmPopup.js';
import {TaskSteps} from './TaskSteps.js';

import { days, dueDateColor, monthsI } from '../utils/GlobalFuns';

import whiteLeftArrow from '../../images/white-left-arrow.png';
import { convertDateT } from '../utils/GlobalFuns';
import { deleteTask, fetTaskList, moveTask, setShowTasks, setTaskDetailShow, updateTask } from '../redux/task/taskActions';
import { UPDATE_TASK_SUCCESS } from '../redux/task/taskActionTypes';
import { BsArrowLeftSquare } from 'react-icons/bs';

export const TaskDetails = () => {

	const dispatch = useDispatch();
	const task = useSelector(state => state.task.taskDetail);
	const taskList = useSelector(state => state.task.taskList);
	const taskListKeys = useSelector(state => state.task.taskListKeys);
	const todoIndex = taskListKeys.findIndex(obj => obj==="todoList");
	const userLists = useSelector(state => state.list.userLists);
	const todoList = taskList[todoIndex]!==undefined?taskList[todoIndex][0]:{};
	const currListName = todoList.listName;
	const [impList,setImpList] = useState();
	const [showTaskNameField, setShowTaskNameField] = useState(false);
	const [showDueDateSel, setShowDueDateSel] = useState(false);
	const [showRemDateSel, setShowRemDateSel] = useState(false);
	const [moveLists,setMoveLists] = useState([]);
	const [showMoveListSel, setShowMoveListSel] = useState(false);
	const [showTaskUriRefTxt, setShowTaskUriRefTxt] = useState(false);
	const [showConfirmPopup,setShowConfirmPopup] = useState(false);
	const isMobileDevice = useSelector(state => state.list.isMobileDevice);
	const phase = useSelector(state => state.task.phase);
	
	const onMobileGoback = (listId) => {
		dispatch(fetTaskList(listId));
		dispatch(setShowTasks(true));
		dispatch(setTaskDetailShow(false));
	}

	function getLTH() {
		var today = new Date();
		var lth = today.getHours() + 4;
		if (lth >= 24) {
			lth = lth - 24;
		}
		return lth;
	}
	
	useEffect(()=>{
		if(phase===UPDATE_TASK_SUCCESS){
			setShowDueDateSel(false);
			setShowRemDateSel(false);
			if(task.uriRef!==null){
				setShowTaskUriRefTxt(false);
			}
			setShowTaskNameField(false);
		}
	},[phase,task])

	useEffect(()=>{
		if(showTaskNameField && document.getElementById('task-detail-label-text')!==null && task.taskName!==undefined){
			document.getElementById('task-detail-label-text').focus();
			document.getElementById('task-detail-label-text').value = task.taskName;
		}
	},[showTaskNameField,task]);
	
	useEffect(()=>{
		setShowMoveListSel(false);
		setShowDueDateSel(false);
		setShowRemDateSel(false);
		setShowTaskUriRefTxt(false);
	},[task]);
	
	useEffect(() => {
		if(document.getElementById('task-detail-note-txt')!==null){
			document.getElementById('task-detail-note-txt').innerHTML=task.note;
		}
	},[task]);
	
	const onSetShowConfirmPopup = (event,showCnfrmPp) => {
		if(event.target===event.currentTarget && showCnfrmPp){
			event.stopPropagation();
		}
		setShowConfirmPopup(showCnfrmPp);
	}
	
	const initDeleteTask=()=>{
		dispatch(deleteTask(task,todoList));
		setShowConfirmPopup(false);
	}
	
	const onSetShowMoveListSel = () => {
		if (document.getElementById('task-item-detail-move-sel') !== null) {
			setShowMoveListSel(false);
		}else{
			setShowMoveListSel(true);
		}
		
	}
	
	useEffect(() => {
		if (document.getElementById('task-item-detail-move-sel') !== null && showMoveListSel && moveLists!==null) {
			const hgtArr = ['0em','0em','0em','2.5em','5em','7em','9em']
			let hgt = hgtArr[moveLists.length];
			document.getElementById('task-item-detail-move-sel').style.height = hgt!==undefined?hgt:'10em';
			document.getElementById('task-item-detail-move-sel').style.width
				= document.getElementById('task-item-detail-dueDate').offsetWidth + 'px';
		}
	}, [showMoveListSel,moveLists]);

	useEffect(()=>{
		if(userLists!=null && userLists!==undefined && userLists.length>0){
			let tempMoveList = [];
			userLists.forEach(elem => {
				elem.forEach(elem1=>{
					tempMoveList.push(elem1);
					if(elem1.listName==='Important'){
						setImpList(elem1);
					}
				})
			});
			setMoveLists(tempMoveList);
		}
	},[userLists])
	
	const onSetShowDateSel = (event,tdElem) => {
		
		let divId='selRem';
		if(tdElem==='dueDate'){
			divId='selDue';
		}
		if (document.getElementById(divId) !== null) {
			document.getElementById(divId).style.height = "0px";
			setShowRemDateSel(false);
			setShowDueDateSel(false);
		} else {
			if(tdElem==='dueDate'){
				setShowRemDateSel(false);
				setShowMoveListSel(false);
				setShowDueDateSel(true);
			}else{
				setShowRemDateSel(true);
				setShowMoveListSel(false);
				setShowDueDateSel(false);
			}
		}
	}
	
	useEffect(() => {
		if (document.getElementById('selDue') !== null) {
			document.getElementById('selDue').style.height = "13em";
			document.getElementById('selDue').style.width
				= document.getElementById('task-item-detail-dueDate').offsetWidth + 'px';
		}
	}, [showDueDateSel]);
	
	useEffect(() => {
		if (document.getElementById('selRem') !== null) {
			document.getElementById('selRem').style.height = "13em";
			document.getElementById('selRem').style.width
				= document.getElementById('task-item-detail-dueDate').offsetWidth + 'px';
		}
	}, [showRemDateSel]);

	const updateTDDate = async (event, task, when, tdElem) => {
		let remindTime;
		if(when==="pick"){
			if(tdElem==="remindMeDate"){
				remindTime = document.getElementById('pick-td-rem-date').value;
			}else{
				remindTime = document.getElementById('pick-td-dd-date').value;
			}
		}else{
			remindTime = getDateTime(when);
		}
		if(tdElem==="remindMeDate"){
			task.remindTime = remindTime;
			task.remindMe = true;
		}else{
			task.dueDate = remindTime;
		}
		const payload ={
			task,
			action:tdElem
		}
		dispatch(updateTask(payload));
	}
	function getDateTime(when) {
		var tDate = new Date();
		var lth = "09";
		if (when === "lth") {
			lth = getLTH();
			if (lth < 4) {
				tDate.setDate(tDate.getDate() + 1);
			}
			if (lth < 10) {
				lth = "0" + lth;
			}
		} else if (when === "tmr") {
			tDate.setDate(tDate.getDate() + 1);
		} else if (when === "nwd") {
			tDate.setDate(tDate.getDate() + 7);
		}
		let day = tDate.getDate();
		if (day < 10) {
			day = "0" + day;
		}
		return  tDate.getFullYear() + "-" + monthsI[tDate.getMonth()] + "-" + day + "T" + lth + ":00";
	}

	const initUpdateTask = (event,action,task) => {
		if(event.target===event.currentTarget){
			event.stopPropagation();
		}
		if(action==='important'){
			task[action] = event.target.checked;
		}else if(action==='complete'){
			task['completed'] = event.target.checked;
		}else if(action==="removeDueDate"){
			action='dueDate';
			task.dueDate=null;
		}else if(action==="removeRemDate"){
			action = "remindMe";
			task.remindMe = false;
			task.remindTime = null;
		}else if(action==="uri-ref"){
			task.uriRef = event.target.value;
		}else if(action==="removeUriRef"){
			action = "uri-ref";
			task.uriRef = null;
		}else{
			task[action] = event.target.value;
		}
		const payload ={
			task,
			action,
			impList,
			todoList
		}
		dispatch(updateTask(payload));
	}

	const onMoveTask = (task,targetList) => {
		dispatch(moveTask(task,targetList,todoList));
		if(isMobileDevice){
			onMobileGoback(task.listId)
		}
	}

	return (
		<div className="col-sm-3 task-detail-div" id="task-detail-div">
		{/* <img alt="back" src={whiteLeftArrow} style={{width:1.5+'em'}} onClick={()=>onMobileGoback(task.listId)} /> */}
		{isMobileDevice &&
			<BsArrowLeftSquare onClick={onMobileGoback} className='login-back-arrow' style={{marginLeft:10}} />
		}
			<div className="task-detail-main" id="task-detail-main">
				<div className="row task-item-detail-name" id="task-item-detail-name">
					<input type="checkbox"  onChange={(event) => initUpdateTask(event,'complete',task)}
						className="task-item-chkbx-detail task-item-chkbx " checked={task.completed} />
					{!showTaskNameField && <label id="task-detail-label" className={task.completed ? "task-item-label strike-line" : "task-item-label"}
						onClick={()=>setShowTaskNameField(true)}>{task.taskName}
					</label>}
					{showTaskNameField && <input type="text" id="task-detail-label-text" className="task-detail-label-text form-control" 
							style={{ backgroundColor: '#403a3a'}} onBlur={(event)=>initUpdateTask(event,'taskName',task)} />}
					<input className="task-detail-star" type="checkbox" title="Important" 
									onChange={(event)=>initUpdateTask(event,'important', task)}  checked={task.important} />
				<TaskSteps todoList={todoList} />
				</div>
				
				<div style={{position:'relative'}}>
					<TaskDueDate task={task} onConvertDateT={convertDateT} dueDateColor={dueDateColor} onSetShowDateSel={onSetShowDateSel} showDueDateSel={showDueDateSel} onUpdateTask={initUpdateTask} />
					{showDueDateSel && <TaskDateSelector task={task} onUpdateTDDate={updateTDDate} onSetShowDateSel={onSetShowDateSel}
														days={days} getLTH={getLTH} tdElem="dueDate" />}
				</div>
				<div style={{position:'relative'}}>
					<TaskRemindDate task={task} onConvertDateT={convertDateT} onSetShowDateSel={onSetShowDateSel} onUpdateTask={initUpdateTask} showRemDateSel={showRemDateSel} />
					{showRemDateSel && <TaskDateSelector task={task} onUpdateTDDate={updateTDDate} onSetShowDateSel={onSetShowDateSel}
													days={days} getLTH={getLTH} tdElem="remindMeDate"
													/>}
				</div>
				<TaskNote task={task} onUpdateTask={initUpdateTask} />
				<div style={{position:'relative'}}>
					{currListName!=="Important"	&&	<TaskMove task={task} showMoveListSel={showMoveListSel} onSetShowMoveListSel={onSetShowMoveListSel} />}
					{showMoveListSel && <TaskMoveListSelector 	moveLists={moveLists!==null && moveLists}
															onMoveTask={onMoveTask}
															task={task}
														/>}
				</div>
				<TaskUriRef task={task} showTaskUriRefTxt={showTaskUriRefTxt} setShowTaskUriRefTxt={setShowTaskUriRefTxt} onUpdateTask={initUpdateTask} />
			</div>
			<div className="row task-detail-delete" id="task-detail-delete">
				<div style={{ textAlign: 'center', marginTop: 0.7 + 'em', width:80+'%' }}>
					<label className="task-detail-crtd-lbl">Created on {convertDateT(task.dateCreated)}</label>
				</div>
				<div style={{ marginTop: 0.7 + 'em' , width:20+'%'}}>
					<img alt="delete" className="task-detail-delete-label" id="task-delete-label" src={deleteRed2027}
														onClick={(event)=>onSetShowConfirmPopup(event,true)} />
				</div>
			</div>
			<ConfirmPopup showConfirmPopup={showConfirmPopup} onSetShowConfirmPopup={onSetShowConfirmPopup}
							onDelete={initDeleteTask}
							selctdItem={task.taskId}
							headerTxt="Delete Task"
							bodyTxt="Are you sure to delete this task ?"
							/>
		</div>
	);
}