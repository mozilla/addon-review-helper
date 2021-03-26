import store from '../redux/store';
import { setTitle, setVersion } from "../redux/modules/currentAddon/actions";
import { SET_TITLE, SET_VERSION, SET_NOTE_EXISTS } from "../redux/modules/currentAddon/types";
import { createNote, setCurrentNote, canCreateNote } from "../redux/modules/notes/actions";
import { SET_CURRENT_NOTE } from "../redux/modules/notes/types"
import { setNotes } from "../redux/modules/sidebar/actions";
import { setNoteExists } from "../redux/modules/currentAddon/actions";
import { saveToStorage, checkIfMatches, sendToBackground, checkURLMatches } from "../utils/helpers";
import { SAVE_TO_STORAGE, REVIEW_URL_MATCHES, UPDATE_REDUX, AMO_URL_MATCHES, AMO_URL_FILTERS, CHECK_WITH_ADDONS, REVIEW_URL_FILTERS, REDIRECT_TO } from "../utils/constants";

import { MENU } from "../redux/modules/popup/types"
import { setMenuType } from "../redux/modules/popup/actions"
import { setCategories, setWithAddons, setSelectedCategories } from "../redux/modules/categories/actions"
import { SET_SELECTED_CATEGORIES } from "../redux/modules/categories/types";
console.log('Background.js file loaded');

const MESAJ_TEXT="MESAJ_TEXT";

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
        case MESAJ_TEXT:
            console.log('message payload', message.payload);
        default:
        //do nothing
    }
}

// Update content on a tab changes URL

browser.tabs.onUpdated.addListener(onUpdatedHandler)

function onUpdatedHandler(tabId, changeInfo, tabInfo) {
    if (tabInfo.status === "complete")
        updateRedux(tabId, tabInfo.url);

    handleActivated();
}

function updateRedux(tabId, url) {
    // if AMO page
    let isReview = checkIfMatches(REVIEW_URL_MATCHES, url);
    store.dispatch(canCreateNote(isReview))

    browser.browserAction.setBadgeText(
        { text: "" }// object
    )
    if (checkIfMatches(AMO_URL_MATCHES, url)) {
        if (store.getState().popup.menuType !== MENU)
            store.dispatch(setMenuType({ 'payload': MENU }))

        /**
         * Notes
         */
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
        /**
         * Categories
         */
        let allCategories;
        let categories = browser.storage.local.get('categories');
        categories.then((res) => {
            console.log("CATEGORIES: ", res.categories)
            allCategories = res.categories;
            if (res.categories) {
                store.dispatch(setCategories({
                    payload: res.categories
                }))
            }
        })
        /**
         * withAddons - only on review pages
         */
        // check for withAddons and set them in redux
        let withAddons = browser.storage.local.get("withAddons");
        withAddons.then((res) => {
            if (res.withAddons) {
                store.dispatch(setWithAddons({
                    payload: res.withAddons
                }))
                browser.tabs.sendMessage(
                    tabId,
                    {
                        type: CHECK_WITH_ADDONS,
                        withAddons: res.withAddons,
                        isReview,
                        categories: allCategories
                    }
                )
            }
        })
    }
}

browser.tabs.onActivated.addListener(handleActivated);

async function handleActivated () {
    let tabUrl = await browser.tabs.query({currentWindow: true, active: true});

    if(checkURLMatches([...REVIEW_URL_FILTERS.slice(3,4)], tabUrl[0].url)) {
         browser.contextMenus.create({
             id: `id-${REDIRECT_TO.review}`,
             title: `Go to ${REDIRECT_TO.review}`,
             contexts: ["all"],
         });

         browser.contextMenus.remove(`id-${REDIRECT_TO.content}`);

    } else if(checkURLMatches([...REVIEW_URL_FILTERS.slice(0,3)], tabUrl[0].url)) {
         browser.contextMenus.create({
             id: `id-${REDIRECT_TO.content}`,
             title: `Go to ${REDIRECT_TO.content}`,
             contexts: ["all"],
         });

         browser.contextMenus.remove(`id-${REDIRECT_TO.review}`);

    } else {
        browser.contextMenus.remove(`id-${REDIRECT_TO.content}`);
        browser.contextMenus.remove(`id-${REDIRECT_TO.review}`);
    } 
}

browser.contextMenus.onClicked.addListener((info, tab) => {
    let urlUpdate;
    if(info.menuItemId===`id-${REDIRECT_TO.review}`) {
        urlUpdate = info.pageUrl.replace(`/review-${REDIRECT_TO.content}/`, '/review/');
        
        browser.contextMenus.create({
            id: `id-${REDIRECT_TO.content}`,
            title: `Click on ${REDIRECT_TO.content}`,
            contexts: ["all"],
        });

        browser.contextMenus.remove(`id-${REDIRECT_TO.review}`);


    } else {
        urlUpdate = info.pageUrl.replace('/review/', `/review-${REDIRECT_TO.content}/`)
                        .replace(`/review-${REDIRECT_TO.listed}/`, `/review-${REDIRECT_TO.content}/`)
                        .replace(`/review-${REDIRECT_TO.unlisted}/`, `/review-${REDIRECT_TO.content}/`);

        browser.contextMenus.create({
            id: `id-${REDIRECT_TO.review}`,
            title: `Click on ${REDIRECT_TO.review}`,
            contexts: ["all"],
        });

        browser.contextMenus.remove(`id-${REDIRECT_TO.content}`);       
    }

    browser.tabs.update({url: urlUpdate});
});
