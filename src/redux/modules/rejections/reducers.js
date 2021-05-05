import {
    SET_COUNT_NEW_REJECTIONS,
    SET_NEW_REJECTIONS
} from "./types"

const initialState = {
    newRejections: [],
    countNewRejections: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_COUNT_NEW_REJECTIONS:
            return {
                ...state,
                countNewRejections: action.payload
            }
        case SET_NEW_REJECTIONS:
            return {
                ...state,
                newRejections: action.payload
            }
        default:
            return state;
    }
}