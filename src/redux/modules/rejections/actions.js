import {
    SET_COUNT_NEW_REJECTIONS,
    SET_NEW_REJECTIONS
} from "./types";

export function setCountNewRejections(payload){
    return {
        type: SET_COUNT_NEW_REJECTIONS,
        payload
    }
};

export function setNewRejections(payload){
    return {
        type: SET_NEW_REJECTIONS,
        payload
    }
}