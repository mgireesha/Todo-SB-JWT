import { React } from 'react';

import alarmBlue from '../../images/Alarm-blue-bb-20x21.png';
import { convertDateT } from '../utils/GlobalFuns';

export const TaskRemindDate = ({task,onSetShowDateSel,onConvertDateT, onUpdateTask, showRemDateSel}) => {
	return (
		<div className="row task-item-detail-remindMe task-item-detail-elem" id="task-item-detail-remindMe" onClick={(event)=>onSetShowDateSel(event,'remindMeDate')}>
			<div className="task-detail-remind-div" style={{width:10+'%'}}>
				<img alt="remind" className="task-detail-remind-img" id="task-detail-remind-img" src={alarmBlue} />
			</div>
			<div className="task-detail-font-size" style={{width:75+'%'}}>
				<label className="task-detail-remind-lbl" id="task-detail-remind-lbl">{task.remindTime!==null ? "Remind Me at 9:0 AM" : "Set Remind Date"}</label><br/>
				<label className="" id="task-detail-remind-lbl">{task.remindTime!==null ? convertDateT(task.remindTime) : ""}</label><br />
			</div>
			{task.remindTime!==null && !showRemDateSel &&<div className="task-detail-remind-div task-detail-remind-del" style={{width:15+'%'}}>
				<label id="task-detail-remind-del-lbl" onClick={(event)=>onUpdateTask(event,'removeRemDate',task)}>X</label>
			</div>}
			{showRemDateSel && <div className="task-detail-font-size task-detail-sel-close" style={{ width:15+'%',paddingLeft:7}}>
				<label>close</label>
			</div>}
		</div>
	);
}