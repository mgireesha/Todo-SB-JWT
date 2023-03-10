import { React } from 'react';

export const TaskNote = ({ task, onUpdateTask }) => {
	
	return (
		<div className="row task-item-detail-elem">
			<label className="task-detail-font-size	task-detail-note-lbl">Note</label>
			<textarea rows="3" cols="2" placeholder="Add Note"  className="task-detail-note-txt" id="task-detail-note-txt" key={task.taskId}
								onBlur={(event)=>onUpdateTask(event,"note", task)}></textarea>
		</div>
	);
} 