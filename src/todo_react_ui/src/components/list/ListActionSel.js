import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addListToArchive } from '../redux/list/listActions';
import { BsArrowUp } from 'react-icons/bs';
import { ACTION_MOVE_DOWN, ACTION_MOVE_UP } from '../redux/todoActionTypes';
export const ListActionSel = ({ list ,onSetShowConfirmPopup, changeListOrder}) => {
	const dispatch = useDispatch();
	const listOrder = useSelector(state => state.list.listOrder);
	return (
		<div className="row list-item-act-sel" id={"list-item-act-sel-"+list.listId}>
			{list.groupName !== 'archived' &&
				<div className='list-move-up-down'>
					<span>Move</span>
					<span className='move-up'><BsArrowUp onClick={()=>changeListOrder(list, ACTION_MOVE_UP)} /></span>
					<span><BsArrowUp className='move-down' onClick={()=>changeListOrder(list, ACTION_MOVE_DOWN)} /></span>
				</div>
			}
			<label className="list-add-arch-lab" onClick={()=>dispatch(addListToArchive(list, listOrder))}>
				{list.groupName==="archived" ? "Unarchive" : "Archive"}
			</label>
			<label className="list-del-list-lab" onClick={(event)=>onSetShowConfirmPopup(event,true,list)}>
				Delete List
			</label>
		</div>
	);
}