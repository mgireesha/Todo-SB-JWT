import { React, useState } from 'react';
import { TodoDatePicker } from '../TodoDatePicker';

import {days}  from '../utils/GlobalFuns';

export const TaskDateSelector = ({onUpdateTDDate,tdElem,task,getLTH}) => {
	const [remindDate,setRemindDate] = useState(null);
	let merd = "AM";
	let lth = getLTH();
	if (lth > 12) {
		lth = lth - 12;
		merd = "PM";
	}
	if (lth === 0) {
		lth = 12;
	}
	let nwd = new Date();
	nwd.setDate(nwd.getDate() + 7);
	let nwDay = days[nwd.getDay()];
	let divId = "selRem";
	let dateTId = "pick-td-rem-date";
	if (tdElem === "dueDate") {
		divId = "selDue";
		dateTId = "pick-td-dd-date";
	}

	return (
		<div className="row task-item-detail-elem task-detail-remind-sel" id={divId} style={{ zIndex: 1000 }}>
			<div className="row sel-remind-row" onClick={(event)=>onUpdateTDDate(event,task,'lth',tdElem)}>
				<label>Later Today at {lth} {merd}</label>
			</div>
			<div className="row sel-remind-row" onClick={(event)=>onUpdateTDDate(event,task,'tmr',tdElem)}>
				<label>Tomorrow,&nbsp;&nbsp;9 AM</label>
			</div>
			<div className="row sel-remind-row" onClick={(event)=>onUpdateTDDate(event,task,'nwd',tdElem)}>
				<label>Next Week {nwDay},&nbsp;&nbsp;9 AM</label>
			</div>
			<div className="row sel-remind-row">
				<label className="col-sm-5">Pick Date</label>
				{/*<input className="col-sm-7 pick-td-rem-date" type="datetime-local" id={dateTId}
					 onBlur={(event)=>onUpdateTDDate(event,task,'pick',tdElem)}
				/>*/}
				<div className="col-sm-7">
					<TodoDatePicker setDate={setRemindDate} date={remindDate} placeholderText="Select due date" 
						withPortal={true} popperClassName='date-picker-popper1'
					
						/>
				</div>
			</div>
			{/* <div className="task-detail-rd-sel-close" onClick={(event)=>onSetShowDateSel(event,tdElem)}>
				<label>Close</label>
			</div> */}
		</div>
	);
}