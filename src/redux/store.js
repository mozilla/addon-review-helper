import {createStore, applyMiddleware} from "redux";
import {createBackgroundStore} from "redux-webext"
import reducer from ".";
// import thunk from "redux-thunk";
import logger from 'redux-logger'

import aliases from "./aliases"

const store = createStore(
    reducer,
    applyMiddleware( logger)
);

export default createBackgroundStore({
    store,
    actions: aliases
})