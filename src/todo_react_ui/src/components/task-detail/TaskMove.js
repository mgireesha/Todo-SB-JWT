import { React } from 'react';
import { MdMoveUp } from 'react-icons/md';
export const TaskMove = ({ task, onSetShowMoveListSel, showMoveListSel }) => {
	return (
		<div className="task-item-detail-move task-item-detail-elem" onClick={() => onSetShowMoveListSel()} >
			<div className="task-detail-dueDate-div">
				<MdMoveUp className="task-detail-move-img" />
			</div>
			<div className="task-detail-font-size">
				<label><span id="task-detail-dueDate-span">Move Task</span></label>
			</div>
			{showMoveListSel && <div className="task-detail-font-size task-detail-sel-close">
				<label>close</label>
			</div>}
		</div>
	);
}