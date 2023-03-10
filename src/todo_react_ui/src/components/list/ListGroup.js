import {React} from 'react';
import {ListItem} from './ListItem.js';

export const ListGroup =({lists, groupName,onDeleteList,onAddListToArchive,onSetShowConfirmPopup}) => {
	return(
		<div className={groupName+" group-bg"}>
			<label style={{display:groupName==="default" || groupName==="common" ? 'none' : 'block'}} className="group-bg-label">
				{groupName}
			</label>
			{lists.map(uIList=>
				<ListItem key={uIList.listId} list={uIList} onDeleteList={onDeleteList} onAddListToArchive={onAddListToArchive} onSetShowConfirmPopup={onSetShowConfirmPopup} />
			)}
		</div>
	);
}