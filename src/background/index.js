import store from '../redux/store';
import { setTitle, setVersion } from "../redux/modules/currentAddon/actions";
import { SET_TITLE, SET_VERSION } from "../redux/modules/currentAddon/types";
import { setNotes, createNote, setCurrentNote, canCreateNote } from "../redux/modules/notes/actions";
import { SET_CURRENT_NOTE } from "../redux/modules/notes/types"

import getTitle from "../contentScript/title";
import getLastVersion from "../contentScript/versions";

import { saveToStorage, checkIfMatches, sendToBackground } from "../utils/helpers";
import { SAVE_TO_STORAGE, REVIEW_URL_MATCHES, UPDATE_REDUX, REVIEW_URL_FILTERS, AMO_URL_FILTERS } from "../utils/constants";

console.log('Background.js file loaded');

browser.runtime.onMessage.addListener(handleMessages);

function handleMessages(message) {
    switch (message.type) {
        case SET_TITLE:
            store.dispatch(setTitle(message.payload));
            break;
        case SAVE_TO_STORAGE:
            browser.storage.local.set(message.payload);
            break;
        case SET_VERSION:
            store.dispatch(setVersion(message.payload));
            break;
        case SET_CURRENT_NOTE:
            store.dispatch(setCurrentNote({ payload: message.payload }))
            break;
        default:
        //do nothing
    }
}

// Update content on a tab changes URL
const filter = {
    urls: AMO_URL_FILTERS
}

browser.tabs.onUpdated.addListener(onUpdatedHandler, filter)

function onUpdatedHandler(tabId, changeInfo, tabInfo) {
    console.log("tab status", tabInfo.status)
    updateRedux(tabId, tabInfo.url);
}



function updateRedux(tabId, url) {
    if (store.getState().notes.createNote)
        store.dispatch(createNote({ 'payload': false }))
    let isReview = checkIfMatches(REVIEW_URL_MATCHES, url);
    store.dispatch(canCreateNote(isReview))
    let notes = browser.storage.local.get('notes');
    notes.then((res) => {
        console.log("NOTES IN STORAGE", res.notes)
        store.dispatch(setNotes({
            payload: res.notes
        }))
        browser.tabs.sendMessage(
            tabId,
            {
                type: UPDATE_REDUX,
                notes: res.notes,
                isReview
            }
        )
    });
}
