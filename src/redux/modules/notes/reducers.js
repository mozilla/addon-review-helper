import {
    CREATE_NOTE,
    SET_CURRENT_NOTE,
    SET_NOTES
} from "./types";

const initialState = {
    createNote: false,
    currentNote: '',
    notes: []
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
        case SET_NOTES:
            return {
                ...state,
                notes: action.payload
            }
        default:
            return state
    }
}