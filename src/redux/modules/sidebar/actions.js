import {
    SET_SIDEBAR_TYPE,
    SET_SIDEBAR_TITLE,
    SET_SIDEBAR_CONTENT
} from "./types";

export function setSidebarType(payload) {
    return {
        type: SET_SIDEBAR_TYPE,
        payload
    }
}

export function setSidebarTitle(payload) {
    return {
        type: SET_SIDEBAR_TITLE,
        payload
    }
}

export function setSidebarContent(payload) {
    return {
        type: SET_SIDEBAR_CONTENT,
        payload
    }
}

