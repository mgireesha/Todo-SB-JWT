import { INIT, LOADING } from "../todoActionTypes"
import { addListToUserLists, getUpdatedUserLists, removeList, updateArchiveList, updateListCounter } from "./listActions"
import { ADD_LIST_ARCHIVE_START, ADD_LIST_ARCHIVE_SUCCESS, 
            CREATE_LIST_START, CREATE_LIST_SUCCESS,
            FETCH_LISTS_START, FETCH_LISTS_SUCCESS,
            UPDATE_LIST_START, UPDATE_LIST_SUCCESS, UPDATE_LIST_WIDTH,
            DELETE_LIST_START, DELETE_LIST_SUCCESS, 
            SET_LIST_COUNTER, SET_MOBILE_DEVICE, SET_SHOW_LISTS, SET_SHOW_LIST_ADD,
        } from "./listActionTypes"

export const initialState = {
    userLists:[],
    userListsKeys:[],
    showListAdd:false,
    showLists:true,
    listDivWidth:'',
    isMobileDevice:false,
    phase:INIT
}

const listReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_LISTS_START:
            return{
                ...state,
                phase: LOADING
            }
        case FETCH_LISTS_SUCCESS:
            return{
                ...state,
                userLists: action.userLists,
                userListsKeys: action.userListsKeys,
                phase: FETCH_LISTS_SUCCESS
            }
        case CREATE_LIST_START:
            return{
                ...state,
                phase:LOADING
            }
        case CREATE_LIST_SUCCESS:
            const addListRes = addListToUserLists([...state.userLists],[...state.userListsKeys],action.list)
            return{
                ...state,
                userLists:addListRes.userLists,
                userListsKeys:addListRes.userListsKeys,
                phase:CREATE_LIST_SUCCESS
            }
        case UPDATE_LIST_WIDTH:
            return{
                ...state,
                listDivWidth:action.listDivWidth
            }
        case UPDATE_LIST_START:
            return{
                ...state,
                phase:LOADING
            }
        case UPDATE_LIST_SUCCESS:
            return{
                ...state,
                userLists:getUpdatedUserLists([...state.userLists],[...state.userListsKeys],action.list),
                phase:UPDATE_LIST_SUCCESS
            }
        case DELETE_LIST_START:
            return{
                ...state,
                phase:LOADING
            }
        case DELETE_LIST_SUCCESS:
            return{
                ...state,
                userLists:removeList([...state.userLists],[...state.userListsKeys],action.list),
                phase:DELETE_LIST_SUCCESS
            }
        case ADD_LIST_ARCHIVE_START:
            return{
                ...state,
                phase:LOADING
            }
        case ADD_LIST_ARCHIVE_SUCCESS:
            const archRes = updateArchiveList([...state.userLists],[...state.userListsKeys],action.list);
            return{
                ...state,
                userLists:archRes.userLists,
                userListsKeys:archRes.userListsKeys,
                phase:ADD_LIST_ARCHIVE_SUCCESS
            }
        case SET_SHOW_LIST_ADD:
            return{
                ...state,
                showListAdd:action.showListAdd
            }
        case SET_LIST_COUNTER:
            return{
                ...state,
                userLists: updateListCounter([...state.userLists],[...state.userListsKeys],action)
            }
        case SET_MOBILE_DEVICE:
            return{
                ...state,
                isMobileDevice:action.isMobileDevice
            }
        case SET_SHOW_LISTS:
            return{
                ...state,
                showLists:action.showLists
            }
        default:
            return {
                ...state,
                phase:INIT
            }
    }
}

export default listReducer;