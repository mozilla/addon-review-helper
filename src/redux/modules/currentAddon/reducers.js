import {
    SET_TITLE,
    SET_VERSION,
    SET_NOTE_EXISTS
} from "./types";

const initialState = {
    title: '',
    version: '',
    noteExists: false
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
        case SET_NOTE_EXISTS:
            return {
                ...state,
                noteExists: action.payload
            }
        default:
            return state;
    }
}