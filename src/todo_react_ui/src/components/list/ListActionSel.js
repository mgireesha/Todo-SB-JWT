import { React } from 'react';
import { useDispatch } from 'react-redux';
import { addListToArchive } from '../redux/list/listActions';
import { BsArrowUp } from 'react-icons/bs';
export const ListActionSel = ({ list ,onSetShowConfirmPopup}) => {
	const dispatch = useDispatch();
	return (
		<div className="row list-item-act-sel" id={"list-item-act-sel-"+list.listId}>
			<div className='list-move-up-down'>
				<span>Move</span>
				<span className='move-up'><BsArrowUp /></span>
				<span><BsArrowUp className='move-down'/></span>
			</div>
			<label className="list-add-arch-lab" onClick={()=>dispatch(addListToArchive(list))}>
				{list.groupName==="archived" ? "Unarchive" : "Archive"}
			</label>
			<label className="list-del-list-lab" onClick={(event)=>onSetShowConfirmPopup(event,true,list)}>
				Delete List
			</label>
		</div>
	);
}