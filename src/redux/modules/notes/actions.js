import { CREATE_NOTE, 
    SET_CURRENT_NOTE,
    SET_NOTES
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