import {
    CREATE_NOTE,
    SET_CURRENT_NOTE,
    CAN_CREATE_NOTE
} from "./types";

const initialState = {
    createNote: false,
    currentNote: null,
    canCreateNote: false,
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
        case CAN_CREATE_NOTE:
            return {
                ...state,
                canCreateNote: action.payload
            }
        default:
            return state
    }
}