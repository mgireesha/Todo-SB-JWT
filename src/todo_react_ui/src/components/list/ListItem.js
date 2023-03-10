import {React} from 'react';

import {ListActionSel} from './ListActionSel.js';
import gearBlack200 from '../../images/gear-grey-200.png';
import {MdSettings} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { fetTaskList, setTaskDetailShow } from '../redux/task/taskActions.js';

export const ListItem =({list,onSetShowConfirmPopup}) => {
	const dispatch = useDispatch();
	
	const onshowTask = (event,listId) => {
		if(event!==null && (event.target.id==='list-act-'+listId || event.target.id==='list-act-img-'+listId)){
			return false;
		}
		dispatch(setTaskDetailShow(false));
		dispatch(fetTaskList(listId));

	}
	const onShowListActionSel = (event,listId) => {
		if(event.target===event.currentTarget){
			event.stopPropagation();
		}
		let currentACTSel = document.getElementById('currentACTSel').value;
		if(currentACTSel!=="" && (document.getElementById('list-item-act-sel-'+currentACTSel) !== null && (document.getElementById('list-item-act-sel-'+currentACTSel).style.height==='3em' || currentACTSel===listId.toString()))){
			document.getElementById('list-item-act-sel-'+currentACTSel).style.height=0;
			document.getElementById('currentACTSel').value="";
		}
		if(currentACTSel!==listId.toString()){
			document.getElementById('currentACTSel').value=listId;
			document.getElementById('list-item-act-sel-'+listId).style.height='3em';
			document.getElementById('list-item-act-sel-'+listId).style.right= 0;
					//	= window.innerWidth - document.getElementById('list-item-'+listId).getBoundingClientRect().right-2+'px';
		}
	}
	
	return(
		<div style={{position:'relative'}}>
			<div className="list-item" id={"list-item-"+list.listId} >
				<label style={{padding:5,width:list.groupName!=="default" ? 87+'%' : 100+'%'}} onClick={(event) =>onshowTask(event,list.listId)}>{list.listName}</label>
				<label className={list.taskCount>0 ? "list-task-count list-task-countBG" : "list-task-count"}>{list.taskCount>0 ? list.taskCount : ''}</label>
				{list.groupName!=="default" && <label id={"list-act-"+list.listId} style={{marginLeft:2, paddingTop:2}}>
					<span onClick={(event)=>onShowListActionSel(event,list.listId)} style={{padding:'10px 6px 10px 0'}}>
						<MdSettings style={{fontSize:23,color:'#4c4b4b'}} id={"list-act-img-"+list.listId}  />
					</span>
				</label>}
				{list.listName==="Important" && <input type="hidden" id="hdn-inp-Important" value={list.listId} />}
			</div>
			<input type="hidden" id="currentACTSel" />
			{list.groupName!=="default" && <ListActionSel list={list}  onSetShowConfirmPopup={onSetShowConfirmPopup} />}
			
	</div>
	);
}