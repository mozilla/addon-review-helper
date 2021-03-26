import React from 'react';
import ReactDOM from 'react-dom';
import ToDoList from './ToDoList';
import {Provider} from 'react-redux';
import {createUIStore} from 'redux-webext';

async function initApp(){
    const store = await createUIStore();

    ReactDOM.render(
        <Provider store={store}>
           <ToDoList />
        </Provider>,
        document.getElementById('root'),
    );
}

initApp();
      