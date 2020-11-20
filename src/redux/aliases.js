import { createNote, setCurrentNote,  canCreateNote } from "./modules/notes/actions"
import { CREATE_NOTE, SET_CURRENT_NOTE,  CAN_CREATE_NOTE } from "./modules/notes/types";

import { SET_TITLE, SET_VERSION, SET_NOTE_EXISTS } from "./modules/currentAddon/types";
import { setTitle, setVersion, setNoteExists } from "./modules/currentAddon/actions";

import { SET_SIDEBAR_TYPE, SET_NOTES, SET_SIDEBAR_CONTENT, SET_SIDEBAR_TITLE, LOAD_DATA, LOAD_NEW_PAGE, SET_TOTAL_NOTES, SET_ORDER_BY, SET_SEARCH_BY } from "./modules/sidebar/types";
import { setSidebarType, setNotes, setSidebarContent, setSidebarTitle, loadData, loadNewPage, setTotalNotes, setOrderBy, setSearchBy} from "./modules/sidebar/actions";

import { SET_MENU_TYPE } from "./modules/popup/types";
import { setMenuType } from "./modules/popup/actions";

import { SET_CATEGORIES, SET_CURRENT_CATEGORY, SET_EDIT_INDEX, SET_TOTAL_CATEGORIES, LOAD_CATEGORIES, LOAD_NEW_PAGE_CATEGORIES } from "./modules/categories/types";
import { setCategories, setCurrentCategory, setEditIndex, setTotalCategories, loadCategories, loadNewPageC } from "./modules/categories/actions";

export default {
    CREATE_NOTE: createNote,
    SET_CURRENT_NOTE: setCurrentNote,
    SET_NOTES: setNotes,
    CAN_CREATE_NOTE: canCreateNote,

    SET_TITLE: setTitle,
    SET_VERSION: setVersion,
    SET_NOTE_EXISTS: setNoteExists,

    SET_SIDEBAR_TYPE: setSidebarType,
    SET_SIDEBAR_CONTENT: setSidebarContent,
    SET_SIDEBAR_TITLE: setSidebarTitle,
    LOAD_DATA: loadData,
    LOAD_NEW_PAGE: loadNewPage,
    SET_TOTAL_NOTES: setTotalNotes,
    SET_ORDER_BY: setOrderBy,
    SET_SEARCH_BY: setSearchBy,

    SET_MENU_TYPE: setMenuType,

    SET_CATEGORIES: setCategories,
    SET_CURRENT_CATEGORY: setCurrentCategory,
    SET_EDIT_INDEX: setEditIndex,
    SET_TOTAL_CATEGORIES: setTotalCategories,
    LOAD_CATEGORIES: loadCategories,
    LOAD_NEW_PAGE_CATEGORIES: loadNewPageC,

}