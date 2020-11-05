import { createNote, setCurrentNote, setNotes, canCreateNote } from "./modules/notes/actions"
import { CREATE_NOTE, SET_CURRENT_NOTE, SET_NOTES, CAN_CREATE_NOTE } from "./modules/notes/types";

import { SET_TITLE, SET_VERSION } from "./modules/currentAddon/types";
import { setTitle, setVersion } from "./modules/currentAddon/actions";

import { SET_SIDEBAR_TYPE, SET_SIDEBAR_CONTENT, SET_SIDEBAR_TITLE } from "./modules/sidebar/types";
import { setSidebarType, setSidebarContent, setSidebarTitle} from "./modules/sidebar/actions";

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
}