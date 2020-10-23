import { createNote, setCurrentNote } from "./modules/notes/actions"
import { CREATE_NOTE, SET_CURRENT_NOTE } from "./modules/notes/types";

import { SET_TITLE } from "./modules/currentAddon/types";
import { setTitle } from "./modules/currentAddon/actions";

export default {
    CREATE_NOTE: createNote,
    SET_CURRENT_NOTE: setCurrentNote,
    SET_TITLE: setTitle
}