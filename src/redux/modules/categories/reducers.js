import {
    SET_CATEGORIES,
    SET_CURRENT_CATEGORY,
    SET_EDIT_INDEX,
    SET_SELECTED_CATEGORIES,
    SET_WITH_ADDONS
} from "./types"

const initialState = {
    categories: [],
    currentCategory: '',
    editIndex: null,
    selectedCategories: [],
    withAddons: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload.payload
            }
        case SET_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.payload.payload
            }
        case SET_EDIT_INDEX:
            return {
                ...state,
                editIndex: action.payload.payload
            }
        case SET_SELECTED_CATEGORIES:
            return {
                ...state,
                selectedCategories: action.payload.payload
            }
        case SET_WITH_ADDONS:
            return {
                ...state,
                withAddons: action.payload.payload
            }
        default:
            return state
    }
}
