import {
    SET_CATEGORIES,
    SET_CURRENT_CATEGORY,
    SET_EDIT_INDEX,
    SET_SELECTED_CATEGORIES,
    SET_WITH_ADDONS
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

export function setSelectedCategories(payload) {
    return {
        type: SET_SELECTED_CATEGORIES,
        payload
    }
}

export function setWithAddons(payload) {
    return {
        type: SET_WITH_ADDONS,
        payload
    }
}