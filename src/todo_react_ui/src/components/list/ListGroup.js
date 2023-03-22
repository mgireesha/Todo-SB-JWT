import { React, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateListOrder } from '../redux/list/listActions.js';
import { UPDATE_LIST_SUCCESS } from '../redux/list/listActionTypes.js';
import { createFilteredListOrderFromArry, createListOrderFromList, getChangedListOrder, syncListOrderArr } from '../utils/GlobalFuns.js';
import { ListItem} from './ListItem.js';

export const ListGroup =({lists, groupName,onDeleteList,onAddListToArchive,onSetShowConfirmPopup, userListsKeys}) => {
	const dispatch = useDispatch();
	const listOrder = useSelector(state => state.list.listOrder);
	const listPhase = useSelector(state => state.list.phase);
	const [orderedLists, setOrderedLists] = useState(lists);
	const [isListUpdated, setIsListUpdated] = useState(false);
	useEffect(()=>{
		if(groupName==="common" && listOrder!=="" && listOrder!==null && listOrder!==undefined){
			let listOrderArr = listOrder.split(",").filter(listId => {return listId!==''});
			if(lists.length!==listOrderArr.length){
				listOrderArr = syncListOrderArr(listOrderArr, lists);
				dispatch(updateListOrder(createFilteredListOrderFromArry(listOrderArr)));
			}
			const tempOrderedList = [];
			let tempList;
			listOrderArr.forEach(listId => {
				if(listId!==""){
					tempList = lists.find(list => {return list.listId === parseInt(listId)});
					if(tempList!==undefined){
						tempOrderedList.push(tempList);
					}
				}
			});
			setOrderedLists(tempOrderedList);
		}else{
			setOrderedLists(lists);
		}
		setIsListUpdated(false);
	},[lists, listOrder, userListsKeys,isListUpdated]);

	useEffect(()=>{
		if(listPhase===UPDATE_LIST_SUCCESS){
			setIsListUpdated(true);
		}
	},[listPhase])

	const changeListOrder = (list, action) => {
		const tempOrderedLists = [...orderedLists];
		let tempListOrder = listOrder;
		if(listOrder==="" || listOrder===undefined || listOrder===null){
			tempListOrder = createListOrderFromList(tempOrderedLists);
		}
		let listOrderArr = getChangedListOrder(list, tempListOrder, action);
		tempListOrder = createFilteredListOrderFromArry(listOrderArr, tempOrderedLists);
		dispatch(updateListOrder(tempListOrder));
	}

	return(
		<div className={groupName+" group-bg"}>
			<label style={{display:groupName==="default" || groupName==="common" ? 'none' : 'block'}} className="group-bg-label">
				{groupName}
			</label>
			{orderedLists.map(uIList=>
				<ListItem key={uIList.listId} list={uIList} 
						onDeleteList={onDeleteList} 
						onAddListToArchive={onAddListToArchive} 
						onSetShowConfirmPopup={onSetShowConfirmPopup}
						changeListOrder = {changeListOrder}
						/>
			)}
		</div>
	);
}