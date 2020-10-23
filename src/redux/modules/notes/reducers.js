import { CREATE_NOTE, SET_CURRENT_NOTE } from "./types";

const initialState = {
    createNote: false,
    currentNote: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NOTE:
            return {
                ...state,
                createNote: action.payload.payload
            }
        case SET_CURRENT_NOTE:
            return {
                ...state,
                currentNote: action.payload.payload
            }
        default:
            return state
    }
}