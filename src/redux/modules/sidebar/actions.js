import {
    SET_SIDEBAR_TYPE,
    SET_SIDEBAR_TITLE,
    SET_SIDEBAR_CONTENT,
    SET_NOTES,
    SET_SELECTED_CATEGORY,
    SET_CURRENT_PAGE,
    SET_ORDER_BY
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

export function setNotes(payload) {
    return {
        type: SET_NOTES,
        payload
    }
}

export function setSelectedCategory(payload){
    return {
        type: SET_SELECTED_CATEGORY,
        payload
    }
}

export function setCurrentPage(payload){
    return {
        type: SET_CURRENT_PAGE,
        payload
    }
}

export function setOrderBy(payload){
    return {
        type: SET_ORDER_BY,
        payload
    }
}