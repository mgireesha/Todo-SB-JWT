import {
  EXPORT_TODO_LISTS_FAIL,
  EXPORT_TODO_LISTS_START,
  EXPORT_TODO_LISTS_SUCESS,
  FETCH_HEADER_LINKS_START,
  FETCH_HEADER_LINKS_SUCCESS,
  FETCH_LOGGED_IN_USER_DETAILS_START,
  FETCH_LOGGED_IN_USER_DETAILS_SUCCESS,
  FETCH_MY_ACCOUNT_LINKS_START,
  FETCH_MY_ACCOUNT_LINKS_SUCCESS,
  SET_COMMON_PHASE,
  SET_COMMON_POPUIP_OBJECT,
  SET_HEADER_LINKS,
  SET_IS_MOBILE_DEVICE,
  SET_IS_NAVABAR_EXPANDED,
  SET_STATUS_MESSAGE,
} from "./commonActionTypes";

export const fetchHeaderLinks = () => ({
  type: FETCH_HEADER_LINKS_START,
});

export const fetchHeaderLinksSucc = (headerLinks) => ({
  type: FETCH_HEADER_LINKS_SUCCESS,
  headerLinks,
});

export const fetchMyAccountLinks = () => ({
    type: FETCH_MY_ACCOUNT_LINKS_START,
  });
  
  export const fetchMyAccountLinksSucc = (myAccountLinks) => ({
    type: FETCH_MY_ACCOUNT_LINKS_SUCCESS,
    myAccountLinks,
  });

export const fetchCurrentUser = () => ({
  type: FETCH_LOGGED_IN_USER_DETAILS_START,
});

export const fetchCurrentUserSucc = (response) => ({
  type: FETCH_LOGGED_IN_USER_DETAILS_SUCCESS,
  response,
});

export const exportTodoLists = () => ({
  type: EXPORT_TODO_LISTS_START,
});

export const exportTodoListsSucc = (response) => ({
  type: EXPORT_TODO_LISTS_SUCESS,
  response,
});

export const exportTodoListsFail = (response) => ({
  type: EXPORT_TODO_LISTS_FAIL,
  response,
});

export const setStatusMessage = (statusMessage) => ({
  type: SET_STATUS_MESSAGE,
  statusMessage,
});

export const setHeaderLinks = (headerLinks) => ({
  type: SET_HEADER_LINKS,
  headerLinks,
});

export const setCommonPopupObject = (commonPopupObject) => ({
  type: SET_COMMON_POPUIP_OBJECT,
  commonPopupObject,
});

export const setIsNabarExpanded = (isNabarExpanded) => ({
  type: SET_IS_NAVABAR_EXPANDED,
  isNabarExpanded,
});

export const setCommonPhase = (phase) => ({
  type: SET_COMMON_PHASE,
  phase,
});

export const setIsMobileDevice = (isMobileDevice) => ({
  type: SET_IS_MOBILE_DEVICE,
  isMobileDevice
})
