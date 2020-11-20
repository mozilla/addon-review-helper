import {
    SET_CATEGORIES,
    SET_CURRENT_CATEGORY,
    SET_EDIT_INDEX,
    CATEGORIES_PER_PAGE,
    SET_TOTAL_CATEGORIES,
    LOAD_CATEGORIES,
    LOAD_NEW_PAGE_CATEGORIES
} from "./types"

const initialState = {
    categories: null,
    currentCategory: '',
    editIndex: null,
    pageCategories: null,
    currentCount: null,
    categoriesPerPage: CATEGORIES_PER_PAGE,
    totalCategories: null,
    currentPage: 1,
    totalPages: 1
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
        case SET_TOTAL_CATEGORIES:
            return {
                ...state,
                totalCategories: action.payload.payload
            }
        case LOAD_CATEGORIES:
            var pageCategories = loadItems(state.categories, 0, state.categoriesPerPage)
            var totalPages = Math.ceil(state.totalCategories / state.categoriesPerPage)
            return {
                ...state,
                pageCategories,
                currentCount: state.categoriesPerPage,
                totalPages
            }
        case LOAD_NEW_PAGE_CATEGORIES:
            var newPage = action.payload.payload;
            var addPages = state.currentPage - newPage;
            // next page -> -1
            // previouse page -> +1
            var upperCount;
            var lowerCount;
            var nextCurrentCount;
            var pageCategories
            switch (addPages) {
                case -1: //next page
                    upperCount = state.currentCount + state.categoriesPerPage
                    lowerCount = state.currentCount;
                    nextCurrentCount = upperCount;
                    pageCategories = loadItems(state.categories, lowerCount, upperCount);

                    break;
                case 1: //previous page
                    upperCount = state.currentCount;
                    lowerCount = state.currentCount - state.categoriesPerPage;
                    nextCurrentCount = lowerCount;
                    pageCategories = loadItems(state.categories, lowerCount - state.categoriesPerPage, upperCount - state.categoriesPerPage);

                    break;
                default:
                    nextCurrentCount = state.currentCount;
                    pageCategories = state.pageCategories

                // do nothing
            }
            console.log(state.categories, lowerCount, upperCount)
            return {
                ...state,
                pageCategories,
                currentPage: newPage,
                currentCount: nextCurrentCount
            }
        default:
            return state
    }
}

function loadItems(items, lowerCount, upperCount) {
    let pageItems = null;
    if (items) {
        pageItems = items.slice(lowerCount, upperCount)
    }
    return pageItems
}