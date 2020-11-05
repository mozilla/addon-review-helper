import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Sidebar from './Sidebar';
import {Provider} from 'react-redux';
import {createUIStore} from 'redux-webext';

async function initApp(){
    const store = await createUIStore();

    const mountNode = document.createElement('div');
    document.body.appendChild(mountNode);

    ReactDOM.render(
        <Provider store={store}>
            <Sidebar/>
        </Provider>,
        mountNode
    );
}

initApp();

//ReactDOM.render(<Sidebar />, document.getElementById('root'));