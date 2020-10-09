import {createStore, applyMiddleware} from "redux";
import {createBackgroundStore} from "redux-webext"
import reducer from "../reducers";
// import thunk from "redux-thunk";
import logger from 'redux-logger'

const store = createStore(
    reducer,
    applyMiddleware( logger)
);

export default createBackgroundStore({
    store
})