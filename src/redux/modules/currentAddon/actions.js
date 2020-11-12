import {
    SET_TITLE,
    SET_VERSION,
    SET_NOTE_EXISTS
} from "./types";

export function setTitle(payload) {
    return {
        type: SET_TITLE,
        payload
    }
}

export function setVersion(payload) {
    return {
        type: SET_VERSION,
        payload
    }
}
export function setNoteExists(payload) {
    return {
        type: SET_NOTE_EXISTS,
        payload
    }
}