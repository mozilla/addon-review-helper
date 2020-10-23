import { SET_TITLE } from "./types";

export function setTitle(payload) {
    return {
        type: SET_TITLE,
        payload
    }
}