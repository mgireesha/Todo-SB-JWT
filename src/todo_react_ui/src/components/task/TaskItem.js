import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';

import deleteGrey2026 from '../../images/delete-grey-20x26.png';
import { IoCalendarOutline } from 'react-icons/io5';
import { TbBellFilled } from 'react-icons/tb';
import { CgNotes } from 'react-icons/cg';
import { RxDotFilled } from 'react-icons/rx';
import { ImLink } from 'react-icons/im';

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
	draggableItms.forEach(drg=>{
		drg.addEventListener('dragend',(event)=>{
			clearTimeout(timer)
			let tgtId = event.target.firstChild.id;
			
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();
			let el = document.elementFromPoint(event.x,event.y);
			let count = 0;
			while(el!==null && (!el.classList.contains('task-item') && count<10)){
				el = el.parentElement;count++;
			}
				if(el)revLst(tgtId,el.id)
		})
	})

	return (
		<div className="row task-item-row" key={"task-item" + taskObj.taskId} draggable={!taskObj.completed}>
			<div className={taskDetail !== null && taskDetail.taskId === taskObj.taskId ? "task-item selected-task" : "task-item"} id={taskObj.taskId}
				key={"task-item-" + taskObj.taskId} onClick={(event) => ToggleShowtaskDetls(event, taskObj.taskId)}>
				<div className="task-item-task-label" style={{ padding: 10, paddingLeft: 0}}>
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
									<RxDotFilled key='rem date dot' className='task-item-dot-img'  />
								</div>
							}
							{todoList.listName === "Important" && <div className="tc-row tc-tn-row">
								<label style={{ fontSize: 12 }}><Nbsp />{taskObj.listName}<Nbsp /></label>
								<RxDotFilled key='rem date dot' className='task-item-dot-img'  />
							</div>}
							<div className="tc-row tc-dd-row" style={{ display: taskObj.dueDate !== null ? 'inline' : 'none' }}>
								<IoCalendarOutline key='due date' className='task-item-task-img' />
								<label style={{ fontSize: 12, color: taskObj.completed ? '' : dueDateColor(taskObj.dueDate) }}><Nbsp />{taskObj.dueDate !== null && convertDateT(taskObj.dueDate)}</label>
								<RxDotFilled key='due date dot' className='task-item-dot-img'  />
							</div>
							<div className="tc-row tc-rem-row" style={{ display: taskObj.remindTime !== null ? 'inline' : 'none' }}>
								<TbBellFilled key='rem date' className='task-item-task-img'/>
								<label style={{ fontSize: 12 }}><Nbsp />{taskObj.remindTime !== null && convertDateT(taskObj.remindTime)}</label>
								<RxDotFilled key='rem date dot' className='task-item-dot-img'  />
							</div>
							<div className="tc-row tc-note-row" style={{ display: taskObj.note !== null && taskObj.note !== "" ? 'inline' : 'none' }}>
								<CgNotes key='note' className='task-item-task-img' title={taskObj.note} />
								<RxDotFilled key='rem date dot' className='task-item-dot-img'  />
							</div>
							<div className="tc-row tc-note-row" style={{ display: taskObj.uriRef !== null && taskObj.uriRef !== "" ? 'inline' : 'none' }}>
								<ImLink key='uriRef' className='task-item-task-img' />
							</div>
						</div>
					</div>
				</div>
				<div className="task-item-delete" id={"task-item-delete-" + taskObj.taskId} onClick={(event) => onSetShowConfirmPopup(event, true, taskObj)} title="Delete Task">
					<img alt="delete task" id={"task-item-delete-img-" + taskObj.taskId} src={deleteGrey2026} style={{ height: 1.8 + 'em' }} />
				</div>
			</div>
		</div>
	);

}