import { SET_TITLE, SET_VERSION } from "./types";

const initialState = {
    title: '',
    version: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_TITLE:
            return {
                ...state,
                title: action.payload
            }
        case SET_VERSION:
            return {
                ...state,
                version: action.payload
            }
        default:
            return state;
    }
}