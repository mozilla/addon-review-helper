import _ from "lodash";
import {
    SET_SIDEBAR_TYPE,
    SET_SIDEBAR_TITLE,
    SET_SIDEBAR_CONTENT,
    SET_NOTES,
    SET_SELECTED_CATEGORY,
    SET_CURRENT_PAGE,
    DATE_DESC,
    SET_ORDER_BY,
    SET_SEARCH_BY
} from "./types";

const initialState = {
    type: null,
    title: null,
    content: null,
    notes: [],
    selectedCategory: null,
    currentPage: 1,
    orderBy: DATE_DESC,
    searchBy: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SIDEBAR_TYPE:
            return {
                ...state,
                type: action.payload.payload
            }
        case SET_SIDEBAR_TITLE:
            return {
                ...state,
                title: action.payload.payload
            }
        case SET_SIDEBAR_CONTENT:
            return {
                ...state,
                content: action.payload.payload
            }
        case SET_NOTES:
            return {
                ...state,
                notes: action.payload.payload
            }
        case SET_SELECTED_CATEGORY:
            return {
                ...state,
                selectedCategory: action.payload.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload.payload
            }
        case SET_ORDER_BY:
            return {
                ...state,
                orderBy: action.payload.payload
            }
        case SET_SEARCH_BY:
            return {
                ...state,
                searchBy: action.payload.payload
            }
        default:
            return state;
    }
}
