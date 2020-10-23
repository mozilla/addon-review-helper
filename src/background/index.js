import store from '../redux/store';

import { setTitle } from "../redux/modules/currentAddon/actions";
import { SET_TITLE } from "../redux/modules/currentAddon/types";

import { saveToStorage } from "../utils/helpers";
import { SAVE_TO_STORAGE } from "../utils/constants";

console.log('Background.js file loaded');

browser.runtime.onMessage.addListener(handleMessages);

function handleMessages(message) {
    console.log('background message', message)
    if (message.type === SET_TITLE)
        store.dispatch(setTitle(message.payload));
    if (message.type === SAVE_TO_STORAGE)
        browser.storage.local.set(message.payload);

}

