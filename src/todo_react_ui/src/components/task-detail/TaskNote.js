import { React } from 'react';
import { CgNotes } from 'react-icons/cg';
export const TaskNote = ({ task, onUpdateTask }) => {
	
	return (
		<div className="task-item-detail-elem task-item-detail-note">
			<label className="task-detail-font-size	task-detail-note-lbl">Note</label>
			<div className="task-detail-note-txt">
				<CgNotes key='note' className='task-detail-note-img' title={task.note} />
				<textarea rows="3" placeholder="Add Note"  id="task-detail-note-txt" key={task.taskId}
								onBlur={(event)=>onUpdateTask(event,"note", task)}></textarea>
			</div>
		</div>
	);
} 