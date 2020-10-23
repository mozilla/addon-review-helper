import { createNote, setCurrentNote, setNotes } from "./modules/notes/actions"
import { CREATE_NOTE, SET_CURRENT_NOTE, SET_NOTES } from "./modules/notes/types";

import { SET_TITLE, SET_VERSION } from "./modules/currentAddon/types";
import { setTitle, setVersion } from "./modules/currentAddon/actions";

export default {
    CREATE_NOTE: createNote,
    SET_CURRENT_NOTE: setCurrentNote,
    SET_NOTES: setNotes,

    SET_TITLE: setTitle,
    SET_VERSION: setVersion
}