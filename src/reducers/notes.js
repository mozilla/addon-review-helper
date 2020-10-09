import { CREATE_NOTE } from "../utils/constants";

const initialState = {
    createNote: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NOTE:
            return {
                createNote: [
                    ...state.createNote, action.payload
                ]
            }
        default:
            return state
    }
}