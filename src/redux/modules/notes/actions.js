import { CREATE_NOTE, SET_CURRENT_NOTE } from "./types" ;

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