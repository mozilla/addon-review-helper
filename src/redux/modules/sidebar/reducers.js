import {
    SET_SIDEBAR_TYPE,
    SET_SIDEBAR_TITLE,
    SET_SIDEBAR_CONTENT,
    LOAD_DATA,
    SET_TOTAL_NOTES,
    SET_NOTES,
    NOTES_PER_PAGE,
    LOAD_NEW_PAGE
} from "./types";

const initialState = {
    type: null,
    title: null,
    content: null,
    pageNotes: [],
    currentCount: null,
    notesPerPage: NOTES_PER_PAGE,
    totalNotes: null,
    currentPage: 1,
    totalPages: 1,
    notes: [],

}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SIDEBAR_TYPE:
            return {
                ...state,
                type: action.payload.payload
            }
        case SET_SIDEBAR_TITLE:
            return {
                ...state,
                title: action.payload.payload
            }
        case SET_SIDEBAR_CONTENT:
            return {
                ...state,
                content: action.payload.payload
            }
        case SET_NOTES:
            return {
                ...state,
                notes: action.payload.payload
            }
        case SET_TOTAL_NOTES:
            return {
                ...state,
                totalNotes: action.payload.payload
            }
        case LOAD_DATA:
            let totalNotes = state.totalNotes
            let notesPerPage = state.notesPerPage;
            let totalPages = Math.ceil(totalNotes / notesPerPage);
            let notes = state.notes;
            let pageNotes = Object.keys(notes).slice(0, notesPerPage).reduce((result, key) => {
                result[key] = notes[key];

                return result;
            }, {});
            return {
                ...state,
                pageNotes,
                currentCount: notesPerPage,
                notesPerPage,
                totalNotes,
                currentPage: 1,
                totalPages: totalPages
            }
        case LOAD_NEW_PAGE:
            let newPage = action.payload.payload;
            let addPages = state.currentPage - newPage;
            // if next page -> -1
            // if previouse page -> +1
            let perPage = state.notesPerPage;
            notes = state.notes;
            let upperCount;
            let lowerCount;
            let nextCurrentCount;
            switch (addPages) {
                case -1: // next page
                    upperCount = state.currentCount + perPage;
                    lowerCount = state.currentCount;
                    nextCurrentCount = upperCount;
                    pageNotes = Object.keys(notes).slice(lowerCount, upperCount).reduce((result, key) => {
                        result[key] = notes[key];

                        return result;
                    }, {});
                    break;
                case 1: // previous page
                    upperCount = state.currentCount;
                    lowerCount = state.currentCount - perPage;
                    nextCurrentCount = lowerCount;
                    pageNotes = Object.keys(notes).slice(lowerCount - perPage, upperCount - perPage).reduce((result, key) => {
                        result[key] = notes[key];

                        return result;
                    }, {});
                    break;
                default:
                //
            }

            return {
                ...state,
                currentCount: nextCurrentCount,
                currentPage: newPage,
                pageNotes
            }
        default:
            return state;
    }
}