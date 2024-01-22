import { INIT, LOADING } from "../todoActionTypes"
import { EXPORT_TODO_LISTS_START, EXPORT_TODO_LISTS_SUCESS, FETCH_HEADER_LINKS_START, FETCH_HEADER_LINKS_SUCCESS, FETCH_LOGGED_IN_USER_DETAILS_START, FETCH_LOGGED_IN_USER_DETAILS_SUCCESS, FETCH_MY_ACCOUNT_LINKS_START, FETCH_MY_ACCOUNT_LINKS_SUCCESS, SET_COMMON_PHASE, SET_COMMON_POPUIP_OBJECT, SET_HEADER_LINKS, SET_IS_MOBILE_DEVICE, SET_IS_NAVABAR_EXPANDED, SET_STATUS_MESSAGE } from "./commonActionTypes"

export const initialState = {
    headerLinks:{},
    myAccountLinks: {},
    currentUser: {},
    commonPopupObject: {},
    statusMessage:"",
    isNabarExpanded: false,
    exportTodoListsResponse:"",
    isMobileDevice:false,
    phase:INIT
}

const commonReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_HEADER_LINKS_START:
            return{
                ...state,
                phase: LOADING
            }
        case FETCH_HEADER_LINKS_SUCCESS:
            return{
                ...state,
                headerLinks: action.headerLinks,
                phase: FETCH_HEADER_LINKS_SUCCESS
            }
        case FETCH_MY_ACCOUNT_LINKS_START:
            return{
                ...state,
                phase: LOADING
            }
        case FETCH_MY_ACCOUNT_LINKS_SUCCESS:
            return{
                ...state,
                myAccountLinks: action.myAccountLinks,
                phase: FETCH_MY_ACCOUNT_LINKS_SUCCESS
            }
        case FETCH_LOGGED_IN_USER_DETAILS_START:
            return{
                ...state,
                phase: LOADING
            }
        case FETCH_LOGGED_IN_USER_DETAILS_SUCCESS:
            return{
                ...state,
                currentUser : action.response.user,
                phase: FETCH_LOGGED_IN_USER_DETAILS_SUCCESS
            }
        case EXPORT_TODO_LISTS_START:
            return{
                ...state,
                phase: LOADING
            }
        case EXPORT_TODO_LISTS_SUCESS:
            return{
                ...state,
                exportTodoListsResponse : action.response.response,
                phase: EXPORT_TODO_LISTS_SUCESS
            }
        case SET_STATUS_MESSAGE:
            return{
                ...state,
                statusMessage: action.statusMessage
            }
        case SET_HEADER_LINKS:
            return{
                ...state,
                headerLinks: action.headerLinks
            }
        case SET_COMMON_POPUIP_OBJECT:
            return{
                ...state,
                commonPopupObject: action.commonPopupObject
            }
        case SET_IS_NAVABAR_EXPANDED:
            return{
                ...state,
                isNabarExpanded: action.isNabarExpanded
            }
        case SET_COMMON_PHASE:
            return{
                ...state,
                phase: action.phase
            }
        case SET_IS_MOBILE_DEVICE:
            return{
                ...state,
                isMobileDevice: action.isMobileDevice
            }
        default:
            return {
                ...state,
                phase:INIT
            }
    }
}

export default commonReducer;