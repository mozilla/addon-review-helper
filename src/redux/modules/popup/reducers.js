import {
    SET_MENU_TYPE,
    MENU
} from "./types";

const initialState = {
    menuType: MENU
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_MENU_TYPE:
            return {
                ...state,
                menuType: action.payload.payload
            }
        default:
            return state
    }
}