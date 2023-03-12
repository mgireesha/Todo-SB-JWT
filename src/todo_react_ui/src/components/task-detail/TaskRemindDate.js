import { React } from 'react';

import { convertDateT } from '../utils/GlobalFuns';
import { IoMdAlarm } from 'react-icons/io';

export const TaskRemindDate = ({task,onSetShowDateSel,onConvertDateT, onUpdateTask, showRemDateSel}) => {
	return (
		<div className="task-item-detail-remindMe task-item-detail-elem" id="task-item-detail-remindMe" onClick={(event)=>onSetShowDateSel(event,'remindMeDate')}>
			<div className="task-detail-remind-div">
				<IoMdAlarm className="task-detail-remind-img" />
			</div>
			<div className="task-detail-font-size">
				<label className="task-detail-remind-lbl" id="task-detail-remind-lbl">{task.remindTime!==null ? "Remind Me at 9:0 AM" : "Set Remind Date"}</label>
				<label className="" id="task-detail-remind-lbl">{task.remindTime!==null ? convertDateT(task.remindTime) : ""}</label><br />
			</div>
			{task.remindTime!==null && !showRemDateSel &&<div className="task-detail-remind-div task-detail-remind-del">
				<label id="task-detail-remind-del-lbl" onClick={(event)=>onUpdateTask(event,'removeRemDate',task)}>X</label>
			</div>}
			{showRemDateSel && <div className="task-detail-font-size task-detail-sel-close">
				<label>close</label>
			</div>}
		</div>
	);
}