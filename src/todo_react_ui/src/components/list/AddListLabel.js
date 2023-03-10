import {React} from 'react';
import {MdOutlineAddCircleOutline} from 'react-icons/md';
import Nbsp from '../Nbsp';

export const AddListLabel =({onTogglAddListField}) => {
	
	return(
		<div className="list-item-add-div" id="list-item-add-div" onClick={() => onTogglAddListField(true)}>
			<label className="list-add-new-lbl"><MdOutlineAddCircleOutline style={{marginTop:-1,fontSize:20}}/><Nbsp/><span>Add New List</span></label>
		</div>
	);
}