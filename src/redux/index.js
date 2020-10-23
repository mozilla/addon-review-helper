import { combineReducers } from 'redux';

import notes from "./modules/notes/reducers";
import currentAddon from "./modules/currentAddon/reducers"

export default combineReducers({
    notes,
    currentAddon
})