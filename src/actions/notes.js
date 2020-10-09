import { CREATE_NOTE } from "../utils/constants";

export const createNote = (payload) => ({
    type: CREATE_NOTE,
    payload
})