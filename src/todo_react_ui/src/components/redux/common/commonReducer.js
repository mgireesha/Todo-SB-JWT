import { INIT, LOADING } from "../todoActionTypes"
import { FETCH_HEADER_LINKS_START, FETCH_HEADER_LINKS_SUCCESS } from "./commonActionTypes"

export const initialState = {
    headerLinks:{},
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
        default:
            return {
                ...state,
                phase:INIT
            }
    }
}

export default commonReducer;