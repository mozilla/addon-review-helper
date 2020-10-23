import { SET_TITLE, SET_VERSION } from "./types";

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