import { React } from 'react';
import { ImLink } from 'react-icons/im';

export const TaskUriRef = ({ task, onUpdateTask, showTaskUriRefTxt, setShowTaskUriRefTxt}) => {
	return (
		<div className="task-item-detail-uri task-item-detail-elem">
			<label className="task-detail-font-size	task-detail-note-lbl">Ref Uri</label>
			<div className="task-detail-note-txt">
				<ImLink key='uriRef' className='task-detail-note-img' />
				{!showTaskUriRefTxt &&
					<a target="_blank" rel="noreferrer" href={task.uriRef} onClick={task.uriRef!==null ? null : ()=>setShowTaskUriRefTxt(true)}>
						{task.uriRef !== null ? task.uriRef : "+Add URL reference"}
					</a>
				}
				{showTaskUriRefTxt && <textarea rows="3" cols="33" placeholder="Add reference uri" id="task-detail-uri-txt" key={"td-uri" + task.taskId}
					onBlur={(event) => onUpdateTask(event, "uri-ref", task)}></textarea>}
				
				{!showTaskUriRefTxt && task.uriRef!==null && <div className="task-detail-remind-div task-detail-remind-del" 
					onClick={(event)=>onUpdateTask(event,'removeUriRef',task)}>
					<label id="task-detail-remind-del-lbl" style={{cursor:'pointer'}} >X</label>
				</div>}
			</div>
			
		</div>
	);
}