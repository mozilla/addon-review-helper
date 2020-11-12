import { createNote, setCurrentNote,  canCreateNote } from "./modules/notes/actions"
import { CREATE_NOTE, SET_CURRENT_NOTE,  CAN_CREATE_NOTE } from "./modules/notes/types";

import { SET_TITLE, SET_VERSION } from "./modules/currentAddon/types";
import { setTitle, setVersion } from "./modules/currentAddon/actions";

import { SET_SIDEBAR_TYPE, SET_NOTES, SET_SIDEBAR_CONTENT, SET_SIDEBAR_TITLE, LOAD_DATA, LOAD_NEW_PAGE, SET_TOTAL_NOTES, SET_ORDER_BY, SET_SEARCH_BY } from "./modules/sidebar/types";
import { setSidebarType, setNotes, setSidebarContent, setSidebarTitle, loadData, loadNewPage, setTotalNotes, setOrderBy, setSearchBy} from "./modules/sidebar/actions";

export default {
    CREATE_NOTE: createNote,
    SET_CURRENT_NOTE: setCurrentNote,
    SET_NOTES: setNotes,
    CAN_CREATE_NOTE: canCreateNote,

    SET_TITLE: setTitle,
    SET_VERSION: setVersion,

    SET_SIDEBAR_TYPE: setSidebarType,
    SET_SIDEBAR_CONTENT: setSidebarContent,
    SET_SIDEBAR_TITLE: setSidebarTitle,
    LOAD_DATA: loadData,
    LOAD_NEW_PAGE: loadNewPage,
    SET_TOTAL_NOTES: setTotalNotes,
    SET_ORDER_BY: setOrderBy,
    SET_SEARCH_BY: setSearchBy,

}