import store from '../redux/store';
import { setTitle, setVersion } from "../redux/modules/currentAddon/actions";
import { SET_TITLE, SET_VERSION, SET_NOTE_EXISTS } from "../redux/modules/currentAddon/types";
import { createNote, setCurrentNote, canCreateNote } from "../redux/modules/notes/actions";
import { SET_CURRENT_NOTE } from "../redux/modules/notes/types"
import { setNotes, setTotalNotes } from "../redux/modules/sidebar/actions";
import { setNoteExists } from "../redux/modules/currentAddon/actions";
import { saveToStorage, checkIfMatches, sendToBackground } from "../utils/helpers";
import { SAVE_TO_STORAGE, REVIEW_URL_MATCHES, UPDATE_REDUX, REVIEW_URL_FILTERS, AMO_URL_FILTERS, CHECK_WITH_ADDONS } from "../utils/constants";
import { MENU } from "../redux/modules/popup/types"
import { setMenuType } from "../redux/modules/popup/actions"
import { setCategories, setTotalCategories, setWithAddons, setSelectedCategories } from "../redux/modules/categories/actions"
import { SET_SELECTED_CATEGORIES } from "../redux/modules/categories/types";
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
        case SET_NOTE_EXISTS:
            if (message.payload) {
                browser.browserAction.setBadgeText(
                    { text: "Note" }// object
                )
            } else {
                browser.browserAction.setBadgeText(
                    { text: "" }// object
                )
            }
            store.dispatch(setNoteExists(message.payload));
            break;
        case SET_SELECTED_CATEGORIES:
            store.dispatch(setSelectedCategories({
                payload: message.payload
            }))
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
    console.log("tabid", tabId)
    console.log("changeInfo", changeInfo)
    console.log("tabInfo", tabInfo)
    if (tabInfo.status === "complete")
        updateRedux(tabId, tabInfo.url);
}



function updateRedux(tabId, url) {
    if (store.getState().popup.menuType !== MENU)
        store.dispatch(setMenuType({ 'payload': MENU }))
    let isReview = checkIfMatches(REVIEW_URL_MATCHES, url);
    store.dispatch(canCreateNote(isReview))
    /**
     * Notes
     */
    let notes = browser.storage.local.get('notes');
    notes.then((res) => {
        console.log("NOTES IN STORAGE", res.notes)
        if (res.notes) {
            store.dispatch(setTotalNotes({
                payload: Object.keys(res.notes).length
            }))
        } else {
            store.dispatch(setTotalNotes({
                payload: 0
            }))
        }
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
    /**
     * Categories
     */
    let categories = browser.storage.local.get('categories');
    categories.then((res) => {
        console.log("CATEGORIES: ", res.categories)
        if (res.categories) {
            store.dispatch(setCategories({
                payload: JSON.parse(res.categories)
            }))
            store.dispatch(setTotalCategories({
                payload: JSON.parse(res.categories).length
            }))
        } else {
            store.dispatch(setTotalCategories({
                payload: 0
            }))
        }
    })
    /**
     * withAddons - only on review pages
     */
    if (isReview) {
        // check for withAddons and set them in redux
        let withAddons = browser.storage.local.get("withAddons");
        withAddons.then((res) => {
            if (res.withAddons) {
                console.log("withAddons: ", res.withAddons)
                store.dispatch(setWithAddons({
                    payload: res.withAddons
                }))

                browser.tabs.sendMessage(
                    tabId,
                    {
                        type: CHECK_WITH_ADDONS,
                        withAddons: res.withAddons
                    }
                )
            }
        })
    }
}

