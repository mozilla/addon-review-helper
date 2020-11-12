import _ from "lodash";
import {
    SET_SIDEBAR_TYPE,
    SET_SIDEBAR_TITLE,
    SET_SIDEBAR_CONTENT,
    LOAD_DATA,
    SET_TOTAL_NOTES,
    SET_NOTES,
    NOTES_PER_PAGE,
    LOAD_NEW_PAGE,
    SET_ORDER_BY,
    DATE_DESC,
    DATE_ASC,
    TITLE_ASC,
    TITLE_DESC
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
    orderBy: DATE_DESC

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
            var totalNotes = state.totalNotes
            var notesPerPage = state.notesPerPage;
            var totalPages = Math.ceil(totalNotes / notesPerPage);
            var notes = state.notes;
            var pageNotes = loadNotes(notes, notesPerPage)
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
            var newPage = action.payload.payload;
            var addPages = state.currentPage - newPage;
            // if next page -> -1
            // if previouse page -> +1
            var perPage = state.notesPerPage;
            notes = state.notes;
            var upperCount;
            var lowerCount;
            var nextCurrentCount;
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
        case SET_ORDER_BY:
            switch (action.payload.payload) {
                case DATE_ASC:
                    var totalNotes = state.totalNotes
                    var notesPerPage = state.notesPerPage;
                    var totalPages = Math.ceil(totalNotes / notesPerPage);
                    var notes = state.notes;
                    var pageNotes = loadNotes(notes, notesPerPage)
                    var ordered = _.orderBy(notes, [notes => new Date(notes.date)], "asc");
                    pageNotes = loadNotes(ordered, notesPerPage)
                    return {
                        ...state,
                        orderBy: DATE_ASC,
                        pageNotes,
                        currentCount: notesPerPage,
                        notesPerPage,
                        totalNotes,
                        currentPage: 1,
                        totalPages: totalPages
                    }
                case DATE_DESC:
                    var totalNotes = state.totalNotes
                    var notesPerPage = state.notesPerPage;
                    var totalPages = Math.ceil(totalNotes / notesPerPage);
                    var notes = state.notes;
                    var pageNotes = loadNotes(notes, notesPerPage)
                    var ordered = _.orderBy(notes, [notes => new Date(notes.date)], "desc");
                    pageNotes = loadNotes(ordered, notesPerPage)
                    return {
                        ...state,
                        orderBy: DATE_DESC,
                        pageNotes,
                        currentCount: notesPerPage,
                        notesPerPage,
                        totalNotes,
                        currentPage: 1,
                        totalPages: totalPages
                    }
                case TITLE_ASC:
                    var totalNotes = state.totalNotes
                    var notesPerPage = state.notesPerPage;
                    var totalPages = Math.ceil(totalNotes / notesPerPage);
                    var notes = state.notes;
                    var pageNotes = loadNotes(notes, notesPerPage)
                    var ordered = _.orderBy(notes, [notes => notes.addon.toLowerCase()], "asc");
                    pageNotes = loadNotes(ordered, notesPerPage)
                    return {
                        ...state,
                        orderBy: TITLE_ASC,
                        pageNotes,
                        currentCount: notesPerPage,
                        notesPerPage,
                        totalNotes,
                        currentPage: 1,
                        totalPages: totalPages
                    }
                case TITLE_DESC:
                    var totalNotes = state.totalNotes
                    var notesPerPage = state.notesPerPage;
                    var totalPages = Math.ceil(totalNotes / notesPerPage);
                    var notes = state.notes;
                    var pageNotes = loadNotes(notes, notesPerPage)
                    var ordered = _.orderBy(notes, [notes => notes.addon.toLowerCase()], "desc");
                    var pageNotes = loadNotes(ordered, notesPerPage)
                    return {
                        ...state,
                        orderBy: TITLE_DESC,
                        pageNotes,
                        currentCount: notesPerPage,
                        notesPerPage,
                        totalNotes,
                        currentPage: 1,
                        totalPages: totalPages
                    }
                default:
                // do nothing
            }
        default:
            return state;
    }
}

function loadNotes(notes, notesPerPage) {
    let pageNotes = Object.keys(notes).slice(0, notesPerPage).reduce((result, key) => {
        result[key] = notes[key];

        return result;
    }, {});

    return pageNotes
}