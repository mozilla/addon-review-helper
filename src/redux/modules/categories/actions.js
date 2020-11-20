import {
    SET_CATEGORIES,
    SET_CURRENT_CATEGORY,
    SET_EDIT_INDEX,
    SET_TOTAL_CATEGORIES,
    LOAD_CATEGORIES,
    LOAD_NEW_PAGE_CATEGORIES
} from "./types"

export function setCategories(payload) {
    return {
        type: SET_CATEGORIES,
        payload
    }
}

export function setCurrentCategory(payload) {
    return {
        type: SET_CURRENT_CATEGORY,
        payload
    }
}

export function setEditIndex(payload) {
    return {
        type: SET_EDIT_INDEX,
        payload
    }
}

export function setTotalCategories(payload) {
    return {
        type: SET_TOTAL_CATEGORIES,
        payload
    }
}

export function loadCategories(payload) {
    return {
        type: LOAD_CATEGORIES
    }
}

export function loadNewPageC(payload) {
    return {
        type: LOAD_NEW_PAGE_CATEGORIES,
        payload
    }
}