import {
    SET_SIDEBAR_TYPE,
    SET_SIDEBAR_TITLE,
    SET_SIDEBAR_CONTENT,
    LOAD_NEW_PAGE,
    LOAD_DATA,
    SET_TOTAL_NOTES, 
    SET_NOTES
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

export function loadNewPage(payload) {
    return {
        type: LOAD_NEW_PAGE,
        payload
    }
}

export function loadData() {
    return {
        type: LOAD_DATA
    }
}

export function setTotalNotes(payload) {
    return {
        type: SET_TOTAL_NOTES,
        payload
    }
}

export function setNotes(payload) {
    return {
        type: SET_NOTES,
        payload
    }
}