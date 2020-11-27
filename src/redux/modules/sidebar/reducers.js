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
    TITLE_DESC,
    SET_SEARCH_BY,
    CLEAR,
    SET_SELECTED_CATEGORY
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
    orderBy: DATE_DESC,
    searchBy: null,
    selectedCategory: null
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
            return loadOrderedAndSearchedNotes(state, state.orderBy);
        case LOAD_NEW_PAGE:
            var newPage = action.payload.payload;
            var addPages = state.currentPage - newPage;
            // next page -> -1
            // previouse page -> +1
            var perPage = state.notesPerPage;
            let notes = state.notes;
            let ordered = orderNotes(notes, state.orderBy);
            if (state.searchBy && state.searchBy != CLEAR) {
                ordered = searchNotes(ordered, state.searchBy);
            }
            var upperCount;
            var lowerCount;
            var nextCurrentCount;
            let pageNotes;
            switch (addPages) {
                case -1: // next page
                    upperCount = state.currentCount + perPage;
                    lowerCount = state.currentCount;
                    nextCurrentCount = upperCount;
                    pageNotes = loadNotes(ordered, lowerCount, upperCount)
                    break;
                case 1: // previous page
                    upperCount = state.currentCount;
                    lowerCount = state.currentCount - perPage;
                    nextCurrentCount = lowerCount;
                    pageNotes = loadNotes(ordered, lowerCount - perPage, upperCount - perPage)
                    break;

                default:
                    nextCurrentCount = state.currentCount;
                    pageNotes = state.pageNotes
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
                    return loadOrderedAndSearchedNotes(state, DATE_ASC);
                case DATE_DESC:
                    return loadOrderedAndSearchedNotes(state, DATE_DESC);
                case TITLE_ASC:
                    return loadOrderedAndSearchedNotes(state, TITLE_ASC);
                case TITLE_DESC:
                    return loadOrderedAndSearchedNotes(state, TITLE_DESC);
                default:
                // do nothing
            }
            break;
        case SET_SEARCH_BY:
            return loadOrderedAndSearchedNotes(state, state.orderBy, action.payload.payload);
        case SET_SELECTED_CATEGORY:
            return {
                ...state,
                selectedCategory: action.payload.payload
            }
        default:
            return state;
    }
}

function loadOrderedAndSearchedNotes(state, orderBy, searchBy = null) {
    var totalNotes = state.totalNotes
    var notesPerPage = state.notesPerPage;
    var notes = state.notes;
    let changedNotes = orderNotes(notes, orderBy)
    let searchTerm = searchBy ?? state.searchBy;
    if (searchTerm && searchTerm !== CLEAR) {
        changedNotes = searchNotes(changedNotes, searchTerm)
    }
    let pageNotes = loadNotes(changedNotes, 0, notesPerPage);
    var totalPages = Math.ceil(changedNotes.length / notesPerPage);

    return {
        ...state,
        orderBy,
        pageNotes,
        currentCount: notesPerPage,
        notesPerPage,
        totalNotes,
        currentPage: 1,
        totalPages: totalPages,
        searchBy: searchTerm
    }
}

function orderNotes(notes, orderBy) {
    let ordered;
    switch (orderBy) {
        case DATE_ASC:
            ordered = _.orderBy(notes, [notes => new Date(notes.date)], "asc");
            break;
        case DATE_DESC:
            ordered = _.orderBy(notes, [notes => new Date(notes.date)], "desc");
            break;
        case TITLE_ASC:
            ordered = _.orderBy(notes, [notes => notes.addon.toLowerCase()], "asc");
            break;
        case TITLE_DESC:
            ordered = _.orderBy(notes, [notes => notes.addon.toLowerCase()], "desc");
            break;
        default:
        //nothing
    }
    return ordered;
}

function loadNotes(notes, lowerCount, upperCount) {
    // let pageNotes = Object.keys(notes).slice(0, notesPerPage).reduce((result, key) => {
    let pageNotes = Object.keys(notes).slice(lowerCount, upperCount).reduce((result, key) => {
        result[key] = notes[key];
        return result;
    }, {});

    return pageNotes
}

function searchNotes(notes, searchBy) {
    searchBy = searchBy.toLowerCase();
    let searched = _.filter(notes, function (note) {
        return note.addon.toLowerCase().includes(searchBy) || note.content.toLowerCase().includes(searchBy)
    })

    return searched;
}