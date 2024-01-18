import { FETCH_HEADER_LINKS_START, FETCH_HEADER_LINKS_SUCCESS } from "./commonActionTypes";

export const fetchHeaderLinks = () => ({
    type: FETCH_HEADER_LINKS_START
});

export const fetchHeaderLinksSucc = (headerLinks) =>({
    type: FETCH_HEADER_LINKS_SUCCESS,
    headerLinks
})