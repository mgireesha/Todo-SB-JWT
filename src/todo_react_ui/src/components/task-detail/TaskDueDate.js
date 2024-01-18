import { React } from 'react';

import { IoCalendarOutline } from 'react-icons/io5';
import { convertDateT, dueDateColor } from '../utils/GlobalFuns';
//dfsd
export const TaskDueDate = ({task,onSetShowDateSel, onUpdateTask, showDueDateSel}) => {
	return (
		<div onClick={(event)=>onSetShowDateSel(event,'dueDate')} className="task-item-detail-dueDate task-item-detail-elem"
			id="task-item-detail-dueDate" >
			<div className="task-detail-dueDate-div">
				<IoCalendarOutline className="task-detail-remind-img" />
			</div>
			<div className="task-detail-font-size" style={{ color:task.completed?'':dueDateColor(task.dueDate)}}>
				<label><span id="task-detail-dueDate-span">{task.dueDate!==null ? 'Due '+convertDateT(task.dueDate) : "Select a due date"}</span></label>
			</div>
			{task.dueDate!==null && !showDueDateSel && <div className="task-detail-remind-div task-detail-dueDate-del" id="task-detail-dueDate-del">
				<label onClick={(event)=>onUpdateTask(event,'removeDueDate',task)}>X</label>
			</div>}
			{showDueDateSel && <div className="task-detail-font-size task-detail-sel-close">
				<label>close</label>
			</div>}
		</div>
	);
}