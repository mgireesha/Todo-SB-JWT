import { React } from 'react';

export const TaskMoveListSelector = ({task, moveLists, onMoveTask}) => {
	return (
		<div className="row task-item-detail-elem task-item-detail-move-sel" id="task-item-detail-move-sel">
			{moveLists!==null && moveLists.map(list=>
				list.listId!==task.listId && list.listName!=="Important" &&  <div className="row sel-move-row" key={list.listId} onClick={()=>onMoveTask(task,list)}>
					<label>{list.listName}</label>
				</div>
			)}
			
		</div>
	);
}