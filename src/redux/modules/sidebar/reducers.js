import {
    SET_SIDEBAR_TYPE,
    SET_SIDEBAR_TITLE,
    SET_SIDEBAR_CONTENT
} from "./types";

const initialState = {
    type: null,
    title: null,
    content: null
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
        default:
            return state;
    }
}