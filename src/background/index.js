import store from '../redux/store';
import { setTitle, setVersion } from "../redux/modules/currentAddon/actions";
import { SET_TITLE, SET_VERSION } from "../redux/modules/currentAddon/types";
import { setNotes, createNote } from "../redux/modules/notes/actions";

import getTitle from "../contentScript/title";
import getLastVersion from "../contentScript/versions";

import { saveToStorage, checkIfMatches, sendToBackground } from "../utils/helpers";
import { SAVE_TO_STORAGE, REVIEW_URL_MATCHES, UPDATE_REDUX } from "../utils/constants";

console.log('Background.js file loaded');

browser.runtime.onMessage.addListener(handleMessages);

function handleMessages(message) {
    console.log('background message', message)

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
        default:
        //do nothing
    }
}

/*
Update content when a new tab becomes active.
*/
browser.tabs.onActivated.addListener(updateContent);

function updateContent() {
    browser.tabs.query({ active: true, currentWindow: true })
        .then((tabs) => {
            store.dispatch(createNote({ 'payload': false }))
            if (checkIfMatches(REVIEW_URL_MATCHES, tabs[0].url)) {
                /*
                if URL is review
                - change title
                - change version
                */
                // check for existing notes
                let notes = browser.storage.local.get('notes');
                notes.then((res) => {
                    console.log("NOTES IN STORAGE", res.notes)
                    store.dispatch(setNotes(res.notes))
                });
                browser.tabs.sendMessage(
                    tabs[0].id,
                    { "type": UPDATE_REDUX }
                )
            }
        })
    // console.log("tab changed");


}

