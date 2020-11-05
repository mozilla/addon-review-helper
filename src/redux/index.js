import { combineReducers } from 'redux';

import notes from "./modules/notes/reducers";
import currentAddon from "./modules/currentAddon/reducers"
import sidebar from "./modules/sidebar/reducers";

export default combineReducers({
    notes,
    currentAddon,
    sidebar
})