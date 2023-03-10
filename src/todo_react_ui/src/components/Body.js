import {React, useState, useEffect} from 'react';
import {TodoList} from './list/TodoList.js';
import {TodoTask} from './task/TodoTask.js';
import {TaskDetails} from './task-detail/TaskDetails.js';
import {HiddenBodyInputs} from './HiddenBodyInputs.js';

export const Body = ({getAuth, disableDiv, enableDiv, getServiceURI}) => {
	const TOKEN_EXPIRED="TOKEN_EXPIRED";
	let currListName;
	if(document.getElementById('listName')!==null){
		currListName = document.getElementById('listName').value;
	}
	
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
 	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
 	const monthsI = ['01','02','03','04','05','06','07','08','09','10','11','12'];
	
	const [isMobileDevice, setMobileDevice] = useState(false);
	
	const [taskList, setTaskList] = useState([]);
	const [taskListKeys, setTaskListKeys] = useState([]);
	const [userLists, setUserLists] = useState([]);
	const [userListsKeys, setUserListsKeys] = useState([]);
	const [arcListIndex, setArcListIndex] = useState(-1);
	const [task, setTask] = useState([]);
	
	const [showListAddB, setShowListAddB] = useState(false);
	const [showTaskAdd, setShowTaskAdd] = useState(false);
	const [showTaskDetls, setShowtaskDetls] = useState(false);
	const [showLists, setShowLists] = useState(true);
	const [showTasks, setShowTasks] = useState(true);
	const [lisDivWidth, setListDivWidth] = useState('');

	const [impListId,setImpListId] = useState(0); 

	
	let todoIndex = taskListKeys.findIndex(obj => obj==="todoList");
	let taskIndexT = taskListKeys.findIndex(obj => obj==="taskListT");
	let taskIndexC = taskListKeys.findIndex(obj => obj==="taskListC");
	
	let archivedListsIndex = userListsKeys.findIndex(obj => obj==="archived");
	let commonListsIndex = userListsKeys.findIndex(obj => obj==="common");
	
	useEffect(()=>{
		setArcListIndex(userListsKeys.findIndex(obj => obj==="archived"));
	},[userListsKeys]);
	
	function convertDateT(date) {
		var cDate = "";
		var d = new Date(date);
		var today = new Date();
		var tomorrow = new Date();
		tomorrow.setDate(today.getDate() + 1);
		if (d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate()) {
			cDate = "Today";
		} else if (d.getFullYear() === tomorrow.getFullYear() && d.getMonth() === tomorrow.getMonth() && d.getDate() === tomorrow.getDate()) {
			cDate = "Tomorow";
		} else {
			cDate = days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear();
		}
		return cDate;
	}

	const isDatePassed = (date) => {
		var iDate = new Date(date);
		var today = new Date();
		if(iDate.getFullYear()<=today.getFullYear()){
			if(iDate.getFullYear()<today.getFullYear()){
				return true;
			}else{
				if(iDate.getMonth()<=today.getMonth()){
					if(iDate.getMonth()<today.getMonth()){
						return true;
					}else{
						if(iDate.getDate()<=today.getDate()){
							return true;
						}else{
							return false;
						}
					}
				}else{
					return false;
				}
			}
		}else{
			return false;
		}
	}

	const dueDateColor = (date) => {
		if(date===null){
			return '';
		}
		var iDate = new Date(date);
		var today = new Date();
		if(iDate.getFullYear()<=today.getFullYear()){
			if(iDate.getFullYear()<today.getFullYear()){
				return '#b50c0c';
			}else{
				if(iDate.getMonth()<=today.getMonth()){
					if(iDate.getMonth()<today.getMonth()){
						return '#b50c0c';
					}else{
						if(iDate.getDate()<=today.getDate()){
							if(iDate.getDate()===today.getDate()){
								return '#577db5';
							}else if(iDate.getDate()<today.getDate()){
								return '#b50c0c';
							}
						}else{
							return '';
						}
					}
				}else{
					return '';
				}
			}
		}else{
			return '';
		}
	} 
	
	const  isMobile = () => {
		console.log("Hi")
    		return ( ( window.innerWidth <= 760 ) 
    					//&& ( window.innerHeight <= 600 ) 
    			);
  		}
  	
		  const fetchAllListsByUser = async () => {
			disableDiv();
			const settings = {
				method: 'GET',
				headers: {
					'Authorization': getAuth()
				}
			};
			const response = await fetch(`${getServiceURI()}/todo/list/listAllByUser/`, settings)
			const data = await response.json();
			if(data.status===TOKEN_EXPIRED){
				document.cookie="jToken=;";
				window.location.reload();
			}
			let respLists = Object.values(data);
			setUserLists(respLists);
			let respListKeys = Object.keys(data);
			if(typeof data === 'object' 
				&& data != null 
				&& Object.keys(data).length !== 0){
				data.default.forEach(list=>{
					if(list.listName==='Important'){
						setImpListId(list.listId);
					}
				})
			}
			setUserListsKeys(respListKeys);
			enableDiv();
			if(!isMobile()){
				fetchTasks(null,respLists[respListKeys.findIndex(obj => obj==="default")][0].listId);
			}
		};
	useEffect(() => {
		setMobileDevice(isMobile());
		if(isMobile()){
			setShowTasks(false);
		}
		fetchAllListsByUser();
		document.getElementById('main-body-div').style.height 
			= (window.innerHeight - 40)+"px";
		document.getElementById('list-item-main-comb').style.minHeight
			= (window.innerHeight - 60 - document.getElementById('list-item-add').offsetHeight)+"px";
		document.getElementById('list-item-main-comb').style.maxHeight
			= (window.innerHeight - 60 - document.getElementById('list-item-add').offsetHeight)+"px";
		if(document.getElementById('task-item-main')!==null){
			document.getElementById('task-item-main').style.minHeight
				= (window.innerHeight - 135 - document.getElementById('list-item-add').offsetHeight)+"px";
			document.getElementById('task-item-main').style.maxHeight
				= (window.innerHeight - 135 - document.getElementById('list-item-add').offsetHeight)+"px";
		}
	},[]);
	
	useEffect(()=>{
		if(showTaskDetls && document.getElementById('task-detail-main')!==null){
			document.getElementById('task-detail-main').style.minHeight
			= (window.innerHeight - 30 - document.getElementById('task-detail-delete').offsetHeight)+"px";
			document.getElementById('task-detail-main').style.maxHeight
			= (window.innerHeight - 30 - document.getElementById('task-detail-delete').offsetHeight)+"px";
		}
	},[showTaskDetls])
	
	useEffect(()=>{
		if(showTasks && document.getElementById('task-item-main')!==null){
			document.getElementById('task-item-main').style.minHeight
				= (window.innerHeight - 175)+"px";
			document.getElementById('task-item-main').style.maxHeight
				= (window.innerHeight - 175)+"px";
		}
	},[showTasks])
	const onSetShowTasks = (value) => {
		setShowTasks(value);
		setShowLists(true);
	}
	
	const onSetShowtaskDetls = (value) => {
		setShowtaskDetls(value);
		setShowTasks(true);
	}
	
	const onSetTodoListToTaskLIst = (todoList) => {
		let tempTaskList = [...taskList];
		tempTaskList[todoIndex][0] = todoList;
		setTaskList(tempTaskList);
		
		let tempUserLists = [...userLists];
		tempUserLists.forEach(listG => {
			listG = listG.forEach((list,index) => {
				if(list.listId===todoList.listId){
					listG[index] = todoList;
				}
			});
		});
		setUserLists(tempUserLists);
	}
	
	
	
	const onSetUserListsKeys = (index,group) => {
		let tempUserListKeys = [...userListsKeys];
		tempUserListKeys[index] = group;
		setUserListsKeys(tempUserListKeys);
	}
	const onSetTodoListToArchived = (todoList) => {
		let tempUserLists = [...userLists];
		let filterIndex = commonListsIndex;
		let addIndex = archivedListsIndex;
		let addUserLists;
		if (todoList.groupName === "common") {
			filterIndex = archivedListsIndex;
			addIndex = commonListsIndex;
		}
		let filterUserLists = tempUserLists[filterIndex];
		tempUserLists[filterIndex] = filterUserLists.filter(function(list) {
			return list.listId !== todoList.listId;
		});
		if (addIndex !== -1) {
			addUserLists = tempUserLists[addIndex];
			tempUserLists[addIndex] = [...addUserLists, todoList];
		} else {
			addIndex = tempUserLists.length;
			tempUserLists[addIndex] = [todoList];
			let tempuserListsKeys = [...userListsKeys];
			if (todoList.groupName === "common") {
				tempuserListsKeys[addIndex] = "common";
			} else {
				tempuserListsKeys[addIndex] = "archived";
			}
			setUserListsKeys(tempuserListsKeys);
		}
		setUserLists(tempUserLists);
		document.getElementById('currentACTSel').value = '';
	}
	const fetchTasks = async (event,listId) => {
		if(event!==null && (event.target.id==='list-act-'+listId || event.target.id==='list-act-img-'+listId)){
			return false;
		}
		/*if(isMobileDevice){
			setShowLists(false);
			setShowTasks(true);
		}*/
		setShowTaskAdd(false);
		disableDiv();
		const settings = {
			method: 'GET',
			headers: {
				'Authorization': getAuth()
			}
		};
		const response = await fetch(`${getServiceURI()}/todo/task/getTasksByListId/${listId}`, settings);
		const data = await response.json();
		if(data.status===TOKEN_EXPIRED){
			document.cookie="jToken=;";
			window.location.reload();
		}
		let tempLists = Object.values(data);
		let tempListKeys = Object.keys(data);
		setTaskList(tempLists);
		setTaskListKeys(tempListKeys);
		if(isMobileDevice){
			setShowLists(false);
			setShowTasks(true);
		}
		setShowListAddB(false);
		setShowtaskDetls(false);
		setTask(null);
		enableDiv();
	}
	
	const updateCount = (action, listId) => {
		let tempLists = [...userLists];
		tempLists.forEach(listG => {
			listG = listG.map(list => {
				if (list.listId === listId) {
					if (action === "remove") {
						list.taskCount = list.taskCount - 1
					} else {
						list.taskCount = list.taskCount + 1
					}
				}
				return list
			});
		});
		setUserLists(tempLists);
	}
	
	const ToggleShowtaskDetls = (event, taskId) => {
		if (event.target.id === "task-chkbx-" + taskId || event.target.id === "task-item-delete-img-" + taskId) {
			return false;
		}
		let curListDivWidth = document.getElementById('main-body-div').offsetWidth;
		let reducedListDivWidth;
		let currentTskDetId = document.getElementById('currentTskDetId').value;
		if (showTaskDetls && currentTskDetId === taskId.toString()) {
			setTask(null);
			if(!isMobileDevice){
				reducedListDivWidth = ((25 / 100) * curListDivWidth);
				setListDivWidth(reducedListDivWidth + 'px');
			}
			setShowtaskDetls(false);
			return;
		} else {
			disableDiv();
			if(!isMobileDevice){
				reducedListDivWidth = (22 / 100) * curListDivWidth;
				setListDivWidth(reducedListDivWidth + 'px');
			}
		}
		fetchTaskDetails(taskId);
	}
	
	const fetchTaskDetails = async (taskId) => {
		const settigs = {
			method: 'GET',
			headers: {
				'Authorization': getAuth()
			}
		}
		const response = await fetch(`${getServiceURI()}/todo/task/${taskId}/`, settigs);
		const data = await response.json();
		if(data.status==="TOKEN_EXPIRED"){
			document.cookie="jToken=;";
			window.location.reload();
		}
		setTask(data);
		setShowtaskDetls(true);
		if(isMobileDevice){
			setShowtaskDetls(true);
			setShowTasks(false);
		}
		enableDiv();
	}
	
	const onSetTask = (task) => {
		let tempList = [...taskList];
		tempList.forEach(taskG => {
			taskG.forEach((taskT, index) => {
				if (taskT.taskId === task.taskId) {
					taskG[index] = task;
				}
			});
		});
		setTaskList(tempList);
		setTask(task);
	};
	
	const onSetBodyTask = (taskI) =>{
		if(taskI.taskId===task.taskId){
			setTask(taskI);
		}
	}
	
	const moveTask = async (targetTaskId,targetListId) => {
		disableDiv();
		let tempTaskList = [...taskList];
		let currentListId = tempTaskList[0][0].listId;
		const settings = {
			method:'PUT',
			headers:{
				'Authorization':getAuth(),
				'Content-Type': 'application/json; charset=utf-8'
			}
		}
		const response = await fetch(`${getServiceURI()}/todo/task/moveTask/${targetTaskId}/${targetListId}`,settings);
		const data = await response.json();
		if(data.status==="success"){
			let task = data.todoTask;
			let tasks;
			if(task.td){
				tasks = tempTaskList[taskIndexC];
				tasks = tasks.filter(function(taskF){return taskF.taskId!==task.taskId});
				tempTaskList[taskIndexC] = tasks;
			}else{
				tasks = tempTaskList[taskIndexT];
				tasks = tasks.filter(function(taskF){return taskF.taskId!==task.taskId});
				tempTaskList[taskIndexT] = tasks;
			}
			setTaskList(tempTaskList);
			updateCount("remove",currentListId);
			updateCount("add",targetListId);
			setShowtaskDetls(false);
			if(isMobileDevice){
				setShowTasks(true);
			}
			//setTask(null);
		}
		enableDiv();
	}
	
	const completeTask = async (event,taskId) => {
		if(event.target===event.currentTarget){
			event.stopPropagation();
		}
		disableDiv();
		const compt = event.target.checked;
		const compTskpld = {
			completed: compt, 
			taskId: 360
		}
		const settings = {
			method: 'PUT',
			headers: {
				'Authorization': getAuth(),
				'Content-Type': 'application/json; charset=UTF-8'
			},
			body:JSON.stringify(compTskpld)
		};
		const response = await fetch(`${getServiceURI()}/todo/task/${taskId}/complete`, settings);
		const data = await response.json();
		if(await data.status==="success"){
			let tempTaskList = [...taskList];
			if(compt){
				let tempC =[data.todoTask, ...tempTaskList[taskIndexC]];
				tempTaskList[taskIndexC] = tempC;
				let tempT = [...tempTaskList[taskIndexT]];
				tempT = tempT.filter(function(task) { return task.taskId !== taskId });
				tempTaskList[taskIndexT] = tempT;
			}else{
				let tempT =[data.todoTask, ...tempTaskList[taskIndexT]];
				tempTaskList[taskIndexT] = tempT;
				let tempC = [...tempTaskList[taskIndexC]];
				tempC = tempC.filter(function(task) { return task.taskId !== taskId });
				tempTaskList[taskIndexC] = tempC;
			}
			setTaskList(tempTaskList);
			if(task!==null && task!==undefined){
				onSetBodyTask(data.todoTask);
			}
			enableDiv();
		}
	}
	
	const deleteTask = async (taskId) => {
		disableDiv();
		let compt;
		if(document.getElementById("task-chkbx-"+taskId)!==null){
			compt = document.getElementById("task-chkbx-"+taskId).checked;
		}else if(document.getElementById("task-detail-chkbx-"+taskId)!==null){
			compt = document.getElementById("task-detail-chkbx-"+taskId).checked;
		}
		const settings = {
			method: 'DELETE',
			headers: {
				'Authorization': getAuth(),
				'Content-Type': 'application/json; charset=UTF-8'
			}
		};
		const response = await fetch(`${getServiceURI()}/todo/task/${taskId}/`,settings);
		const data = await response.json();
		if(data.status==="success"){
			let tempTaskList = [...taskList];
			if(!compt){
				let tempT = [...tempTaskList[taskIndexT]];
				tempT = tempT.filter(function(task) { return task.taskId !== taskId })
				tempTaskList[taskIndexT] = tempT;
			}else{
				let tempC = [...tempTaskList[taskIndexC]];
				tempC = tempC.filter(function(task) { return task.taskId !== taskId })
				tempTaskList[taskIndexC] = tempC;
			}
			setTaskList(tempTaskList);
			updateCount("remove",data.todoTask.listId);
			if(data.todoTask.important){
				updateCount("remove",impListId);
			}
			setShowtaskDetls(false);
			if(isMobileDevice){
				setShowTasks(true);
			}
			setTask(null);
			enableDiv();
			return true;
		}
		
	}
	
	const updateTask = async (event, action, taskId) => {
		if(event.target===event.currentTarget){
			event.stopPropagation();
		}
		let updateTaskPayload = {
			taskId : taskId
		}
		let isImportant;
		let taskAction;
		if(action==="important"){
			taskAction = action;
			isImportant = event.target.checked;
			updateTaskPayload.important = isImportant;
		}else if(action==="note"){
			if(event.target.value===task.note){
				return;
			}
			taskAction = action;
			updateTaskPayload.note = event.target.value;
		}else if (action==="removeDueDate"){
			taskAction = "dueDate";
			updateTaskPayload.dueDate = null;
		}else if(action==="removeRemDate"){
			taskAction = "remindMe";
			updateTaskPayload.remindMe = false;
			updateTaskPayload.remindTime = null;
		}else if(action==="uri-ref"){
			taskAction = action;
			updateTaskPayload.uriRef = event.target.value;
		}else if(action==="removeUriRef"){
			taskAction = "uri-ref";
			updateTaskPayload.uriRef = null;
		}else{
			return false;
		}
		disableDiv();
		const settings = {
			method: 'PUT',
			headers : {
				'Authorization': getAuth(),
				'Content-Type':"application/json; charset=utf-8"
			},
			body:JSON.stringify(updateTaskPayload)
		}
		const response = await fetch(`${getServiceURI()}/todo/task/${taskId}/${taskAction}`,settings);
		const data = await response.json();
		if(data.status==="success"){
			if(action==="important"){
				let ImpListId = impListId;
				if(isImportant){
					updateCount("add", ImpListId);
				}else{
					updateCount("remove", ImpListId);
				}
				setTask(data.todoTask);
				if(currListName==="Important"){
					let tempTaskList=[...taskList];
					let tListG;
					let tListIndex;
					if(data.todoTask.completed){
						tListIndex=2;
					}else{
						tListIndex=1;
					}
					tListG=tempTaskList[tListIndex];
					tListG = tListG.filter(function(task){return task.taskId!==taskId});
					tempTaskList[tListIndex]=tListG;
					setTaskList(tempTaskList);
					//setTask(null);
					setShowtaskDetls(false);
					if(isMobileDevice){
						setShowTasks(true);
					}
				}
			}else{
				onSetTask(data.todoTask);
			}
		}
		enableDiv();
	}
	
	return (
		<div className="row" id="main-body-div">
			{showLists &&<TodoList  	userLists={userLists} 
					onshowTask={fetchTasks} 
					onSetUserLists={setUserLists}
					onGetAuth={getAuth}
					showListAddB={showListAddB}
					setShowListAddB={setShowListAddB}
					setShowTaskAdd={setShowTaskAdd}
					lisDivWidth={lisDivWidth}
					onSetTodoListToArchived={onSetTodoListToArchived}
					onSetUserListsKeys={onSetUserListsKeys}
					archivedListsIndex={arcListIndex}
					commonListsIndex={commonListsIndex}
					disableDiv={disableDiv}
					enableDiv={enableDiv}
					getServiceURI={getServiceURI}
				/>
			}
			{showTasks &&<TodoTask  todoList={taskList[todoIndex]!==undefined && taskList[todoIndex]} 
					taskListT={taskList[taskIndexT]} 
					taskListC={taskList[taskIndexC]}
					taskList={taskList}
					setTaskList={setTaskList}
					taskDetail={task}
					taskListKeys={taskListKeys} 
					onUpdateCount = {updateCount}
					onGetAuth={getAuth}
					onConvertDateT={convertDateT}
					dueDateColor={dueDateColor}
					setShowListAddB={setShowListAddB}
					setShowTaskAdd={setShowTaskAdd}
					showTaskAdd={showTaskAdd}
					showTaskDetls={showTaskDetls}
					onToggleShowtaskDetls={ToggleShowtaskDetls}
					onSetBodyTask={onSetBodyTask}
					setShowtaskDetls={setShowtaskDetls}
					onCompleteTask={completeTask}
					onSetTodoListToTaskLIst={onSetTodoListToTaskLIst}
					onDeleteTask={deleteTask}
					onSetShowTasks={onSetShowTasks}
					isMobileDevice={isMobileDevice}
					disableDiv={disableDiv}
					enableDiv={enableDiv}
					getServiceURI={getServiceURI}
			 	/>
			 }
			{showTaskDetls && <TaskDetails 	task={task!==null && task} 
										onConvertDateT={convertDateT}
										dueDateColor={dueDateColor}
										setTask={setTask}
										taskList={taskList}
										setTaskList={setTaskList}
										onSetTask={onSetTask}
										onSetShowtaskDetls={onSetShowtaskDetls}
										showTaskDetls={showTaskDetls}
										onMoveTask={moveTask}
										onCompleteTask={completeTask}
										onDeleteTask={deleteTask}
										isMobileDevice={isMobileDevice}
										onUpdateCount = {updateCount}
										onUpdateTask={updateTask}
										days={days}
										monthsI={monthsI}
										getAuth={getAuth}
										disableDiv={disableDiv}
										enableDiv={enableDiv}
										getServiceURI={getServiceURI}
										impListId={impListId}
									/>}
			<HiddenBodyInputs todoList={taskList[todoIndex]!==undefined && taskList[todoIndex][0]} />
			<input type="hidden" id="currentTskDetId" value={task!==null && task.taskId} />
		</div>
	);
}
