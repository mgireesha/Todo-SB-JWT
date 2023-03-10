import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';

import calBlue from '../../images/calender-blue.png';
import dotBlue from '../../images/dot-blue.png';
import bellBlue from '../../images/bell-blue.png';
import noteBlueS1 from '../../images/note-blue-s1.png';
import deleteGrey2026 from '../../images/delete-grey-20x26.png';

import Nbsp from '../Nbsp.js';
import { convertDateT, dueDateColor } from '../utils/GlobalFuns';
import { fetchTask, setTaskDetailShow, updateTask } from '../redux/task/taskActions';
import { setListDivWidth } from '../redux/list/listActions';

export const TaskItem = ({ taskObj, todoList, onSetShowConfirmPopup, revLst }) => {

	const dispatch = useDispatch();
	const taskDetail = useSelector(state => state.task.taskDetail);
	const showTaskDetls = useSelector(state => state.task.taskDetailShow);
	const isMobileDevice = useSelector(state => state.list.isMobileDevice);
	const [comptdSteps, setComptdSteps] = useState([]);


	useEffect(() => {
		if (taskObj !== null && taskObj.taskSteps !== null) {
			const tempComptdSteps = taskObj.taskSteps.filter(function (step) { return step.completed });
			setComptdSteps(tempComptdSteps);
		}
	}, [taskObj]);

	const ToggleShowtaskDetls = (event, taskId) => {
		if (event.target.id === "task-chkbx-" + taskId || event.target.id === "task-item-delete-img-" + taskId) {
			return false;
		}
		let curListDivWidth = document.getElementById('main-body-div').offsetWidth;
		let reducedListDivWidth;
		let currentTskDetId = taskDetail !== null ? taskDetail.taskId : '';
		if (showTaskDetls && currentTskDetId === taskId) {
			dispatch(setTaskDetailShow(false));
			if (!isMobileDevice) {
				reducedListDivWidth = ((25 / 100) * curListDivWidth);
				dispatch(setListDivWidth(reducedListDivWidth + 'px'));
			}
			return;
		} else {
			if (!isMobileDevice) {
				reducedListDivWidth = (22 / 100) * curListDivWidth;
				dispatch(setListDivWidth(reducedListDivWidth + 'px'));
			}
		}
		dispatch(fetchTask(taskId));
	}
	const completeTask = (event, action, task) => {
		if (event.target === event.currentTarget) {
			event.stopPropagation();
		}
		task.completed = event.target.checked;
		const payload = {
			task,
			action
		}
		dispatch(updateTask(payload));
	}

	var timer;
	const draggableItms = document.querySelectorAll('[draggable]');
	//console.log('draggableItms',draggableItms)
	draggableItms.forEach(drg=>{
		drg.addEventListener('dragend',(event)=>{
			clearTimeout(timer)
			let tgtId = event.target.firstChild.id;
			
			//let target = event.target;
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();
			//event.cancelBubble()
			//event.target.style.opacity = 1;
			//console.log('dragend',event.x,event.y);
			let el = document.elementFromPoint(event.x,event.y);
			//console.log(el.classList);
			let count = 0;
			while(el!==null && (!el.classList.contains('task-item') && count<10)){
				el = el.parentElement;count++;
			}
			//if(el)console.log('el.id',el.id);console.log('event.target',tgtId)
			//timer = setTimeout(() => {
				if(el)revLst(tgtId,el.id)
			//}, 600);
			
			
		})
	})


	return (
		<div className="row" style={{ margin: 10 }} key={"task-item" + taskObj.taskId} draggable={!taskObj.completed}>
			<div className={taskDetail !== null && taskDetail.taskId === taskObj.taskId ? "task-item selected-task" : "task-item"} id={taskObj.taskId}
				key={"task-item-" + taskObj.taskId} onClick={(event) => ToggleShowtaskDetls(event, taskObj.taskId)}>
				<div className="col-sm-11" style={{ padding: 10, paddingLeft: 0, width: 92 + '%' }}>
					<input type="checkbox" id={"task-chkbx-" + taskObj.taskId} className={"task-item-chkbx task-chkbx-" + taskObj.taskId}
						onChange={(event) => completeTask(event, 'complete', taskObj)} checked={taskObj.completed} />
					<label className={taskObj.completed ? "task-item-label strike-line" : "task-item-label"} >{taskObj.taskName}</label>
					<div className="row">
						<div className="col-sm-11" style={{ marginLeft: 1.6 + 'em' }}>
							{taskObj !== null && taskObj.taskSteps !== null && taskObj.taskSteps.length > 0 &&
								<div className='tc-row'>
									<Nbsp /><label style={{ fontSize: 10 }}>
										{comptdSteps.length + '/' + taskObj.taskSteps.length}
									</label>
									<img alt="." src={dotBlue} style={{ height: 0.2 + 'em', margin: 5 }} />
								</div>
							}
							{todoList.listName === "Important" && <div className="tc-row tc-tn-row">
								<label style={{ fontSize: 12 }}><Nbsp />{taskObj.listName}<Nbsp /></label>
								<img alt="." src={dotBlue} style={{ height: 0.2 + 'em', margin: 5 }} />
							</div>}
							<div className="tc-row tc-dd-row" style={{ display: taskObj.dueDate !== null ? 'inline' : 'none' }}>
								<img key='due date' alt="due date" src={calBlue} style={{ height: 0.8 + 'em' }} />
								<label style={{ fontSize: 12, color: taskObj.completed ? '' : dueDateColor(taskObj.dueDate) }}><Nbsp />{taskObj.dueDate !== null && convertDateT(taskObj.dueDate)}</label>
								<img alt="." src={dotBlue} style={{ height: 0.2 + 'em', margin: 5 }} />
							</div>
							<div className="tc-row tc-rem-row" style={{ display: taskObj.remindTime !== null ? 'inline' : 'none' }}>
								<img key='remind time' alt="remind time" src={bellBlue} style={{ height: 0.8 + 'em' }} />
								<label style={{ fontSize: 12 }}><Nbsp />{taskObj.remindTime !== null && convertDateT(taskObj.remindTime)}</label>
								<img alt="." src={dotBlue} style={{ height: 0.2 + 'em', margin: 5 }} />
							</div>
							<div className="tc-row tc-note-row" style={{ display: taskObj.note !== null && taskObj.note !== "" ? 'inline' : 'none' }}>
								<img key='note' alt="note" src={noteBlueS1} style={{ height: 0.8 + 'em' }} title={taskObj.note} />
							</div>
						</div>
					</div>
				</div>
				<div className="col-sm-1 task-item-delete" id={"task-item-delete-" + taskObj.taskId} onClick={(event) => onSetShowConfirmPopup(event, true, taskObj)} title="Delete Task">
					<img alt="delete task" id={"task-item-delete-img-" + taskObj.taskId} src={deleteGrey2026} style={{ height: 1.8 + 'em' }} />
				</div>
			</div>
		</div>
	);

}