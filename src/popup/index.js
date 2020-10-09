import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Popup from "./Popup";
import {Provider} from 'react-redux';
import {createUIStore} from 'redux-webext';

async function initApp(){
    const store = await createUIStore();

    const mountNode = document.createElement('div');
    document.body.appendChild(mountNode);

    ReactDOM.render(
        <Provider store={store}>
            <Popup/>
        </Provider>,
        mountNode
    );
}

initApp();
