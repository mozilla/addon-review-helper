import { CREATE_NOTE, 
    SET_CURRENT_NOTE,
    SET_NOTES,
    CAN_CREATE_NOTE
} from "./types" ;

export function createNote(payload) {
    return {
        type: CREATE_NOTE,
        payload
    }
}

export function setCurrentNote(payload) {
    return {
        type: SET_CURRENT_NOTE,
        payload
    }
}

export function setNotes(payload) {
    return {
        type: SET_NOTES,
        payload
    }
}

export function canCreateNote(payload) {
    return {
        type: CAN_CREATE_NOTE,
        payload
    }
}