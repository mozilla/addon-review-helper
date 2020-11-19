import {
    SET_MENU_TYPE
} from "./types";

export function setMenuType(payload) {
    return {
        type: SET_MENU_TYPE,
        payload
    }
}