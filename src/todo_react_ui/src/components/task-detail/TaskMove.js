import { React } from 'react';
import moveBlue from '../../images/move-blue_20x18.png';

export const TaskMove = ({ task, onSetShowMoveListSel, showMoveListSel }) => {
	return (
		<div className="row task-item-detail-move task-item-detail-elem" onClick={() => onSetShowMoveListSel()} >
			<div className="task-detail-dueDate-div" style={{ width: 10 + '%' }}>
				<img alt="due date" className="task-detail-move-img" id="task-detail-remind-img" src={moveBlue} />
			</div>
			<div className="col-sm-8 task-detail-font-size" style={{ padding: 10, width: 65 + '%' }}>
				<label><span id="task-detail-dueDate-span">Move Task</span></label>
			</div>
			{showMoveListSel && <div className="task-detail-font-size task-detail-sel-close" style={{ width: 25 + '%' }}>
				<label>close</label>
			</div>}
		</div>
	);
}