import { CREATE_LIST_START, CREATE_LIST_SUCCESS,
        FETCH_LISTS_START, FETCH_LISTS_SUCCESS,
        DELETE_LIST_START, DELETE_LIST_SUCCESS, 
        UPDATE_LIST_START, UPDATE_LIST_SUCCESS, UPDATE_LIST_WIDTH,
        SET_LIST_COUNTER, SET_MOBILE_DEVICE, SET_SHOW_LISTS, SET_SHOW_LIST_ADD, ADD_LIST_ARCHIVE_START, ADD_LIST_ARCHIVE_SUCCESS
    } from "./listActionTypes";

export const fethUserLists = (isMobileDevice) => ({
    type: FETCH_LISTS_START,
    isMobileDevice:isMobileDevice!==undefined?isMobileDevice:false
})

export const fethUserListsSucc = (userLists,userListsKeys) => ({
    type:FETCH_LISTS_SUCCESS,
    userLists,
    userListsKeys
})

export const createList = (list) => ({
    type: CREATE_LIST_START,
    list
})

export const createListSucc = (list) => ({
    type: CREATE_LIST_SUCCESS,
    list
})

export const updateList = (list) => ({
    type: UPDATE_LIST_START,
    list
})

export const updateListSucc = (list) => ({
    type: UPDATE_LIST_SUCCESS,
    list
})

export const deleteList = (list) => ({
    type:DELETE_LIST_START,
    list
})

export const deleteListSucc = (list) => ({
    type:DELETE_LIST_SUCCESS,
    list
})

export const addListToArchive = (list) => ({
    type:ADD_LIST_ARCHIVE_START,
    list
})

export const addListToArchiveSucc = (list) => ({
    type:ADD_LIST_ARCHIVE_SUCCESS,
    list
})

export const setListDivWidth = (listDivWidth) => ({
    type: UPDATE_LIST_WIDTH,
    listDivWidth
})

export const setShowListAdd = (showListAdd) => ({
    type: SET_SHOW_LIST_ADD,
    showListAdd
})

export const setIsMobileDevice = (isMobileDevice) => ({
    type: SET_MOBILE_DEVICE,
    isMobileDevice
})

export const setShowLists = (showLists) => ({
    type:SET_SHOW_LISTS,
    showLists
})

export const setListCounter = (list,action) => ({
    type:SET_LIST_COUNTER,
    list,
    action
})

export const addListToUserLists = (userLists,userListsKeys,list) => {
    let commonListsIndex = userListsKeys.findIndex(obj => obj==="common");
    let commonLists = commonListsIndex!==-1?userLists[commonListsIndex]:[];
    if(commonListsIndex===-1)commonListsIndex=userLists.length;
    userListsKeys[commonListsIndex]='common';
    commonLists.push(list);
    userLists[commonListsIndex]=commonLists;
    return {userLists,userListsKeys};
}

export const getUpdatedUserLists = (userLists,userListsKeys,list) => {
    let listGroupIndex = userListsKeys.findIndex(obj => obj===list.groupName);
    let listGroup = userLists[listGroupIndex];
    listGroup.forEach((elem, index) => {
        if(elem.listId===list.listId){
            listGroup[index]=list;
        }
    });
    userLists[listGroupIndex]=listGroup;
    return userLists;
}

export const updateListCounter = (userLists,userListsKeys,action) => {
    const list = action.list;
    const actionT = action.action;
    const listIndex = userListsKeys.findIndex(obj => obj===list.groupName);
    const userList = userLists[listIndex];
    //const task = action.task;
    userList.forEach(elem=>{
        if(elem.listId===list.listId){
            elem.taskCount = actionT==='add' ? elem.taskCount+1:elem.taskCount-1;
            //if(task!==undefined && task!==null){
                //const sArr = elem.sortedtasks.split(",").map(t=>Number(t)).filter(t=>{return task.taskId!==t});
                elem.sortedtasks = list.sortedtasks;
            //}
        }
    })
    userLists[listIndex] = userList;
    return userLists;
}

export const removeList = (userLists,userListsKeys,list) => {
    const listIndex = userListsKeys.findIndex(obj => obj===list.groupName);
    let userList = userLists[listIndex];
    userList = userList.filter(elem => {return elem.listId!==list.listId});
    userLists[listIndex] = userList;
    return userLists;
}

export const updateArchiveList = (userLists,userListsKeys,list) => {
    let archiveListIndex = userListsKeys.findIndex(obj => obj==='archived');
    let commonListIndex = userListsKeys.findIndex(obj => obj==='common');
    let archivedList;
    let commonList;
    if(archiveListIndex===-1){
        archiveListIndex = userLists.length;
        archivedList=[];
        userListsKeys[archiveListIndex]= 'archived';
    }else{
        archivedList = userLists[archiveListIndex];
    }
    if(commonListIndex===-1){
        commonListIndex = userLists.length;
        commonList=[];
        userListsKeys[commonListIndex]= 'common';
    }else{
        commonList = userLists[commonListIndex];
    }
    if(list.groupName==='archived'){
        archivedList.push(list);
        commonList = commonList.filter(elem => {return elem.listId!==list.listId});
    }else{
        archivedList = archivedList.filter(elem => {return elem.listId!==list.listId});
        commonList.push(list);
    }
    userLists[archiveListIndex] = archivedList;
    userLists[commonListIndex] = commonList;
    return {userLists,userListsKeys};
}