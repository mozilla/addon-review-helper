import getTitle from "./title";
import { getLastVersion } from "./versions";
import { UPDATE_REDUX, CHECK_WITH_ADDONS } from "../utils/constants";
import { sendToBackground } from "../utils/helpers";
import { SET_CURRENT_NOTE, } from "../redux/modules/notes/types";
import { SET_NOTE_EXISTS } from "../redux/modules/currentAddon/types";
import { SET_SELECTED_CATEGORIES } from "../redux/modules/categories/types"

console.log('!!!!! Content scripts has loaded !!!!!');

browser.runtime.onMessage.addListener(handleMessages);

function handleMessages(message) {
    switch (message.type) {
        case UPDATE_REDUX: {
            console.log("NOTES IN CONTENT SCRIPT", message.notes)
            if (message.isReview) {
                let title = null;
                title = getTitle();
                getLastVersion();

                console.log("TITLE", title)
                if (message.notes) {
                    //DISPATCH SET CURRENT NOTE
                    let exists = false;
                    message.notes.forEach((note) => {
                        if (note.addon === title) {
                            sendToBackground(SET_CURRENT_NOTE, note.content)
                            sendToBackground(SET_NOTE_EXISTS, true)
                            exists = true;
                        }
                    })
                    if(!exists){
                        sendToBackground(SET_CURRENT_NOTE, null)
                    }
                } else {
                    sendToBackground(SET_CURRENT_NOTE, null)
                    sendToBackground(SET_NOTE_EXISTS, false)
                }
            }
            break;
        }
        case CHECK_WITH_ADDONS:
            // let withAddons = message.withAddons;
            // let selectedCategories = [];
            // Object.keys(withAddons).forEach(category => {
            //     if (withAddons[category].indexOf(getTitle()) > -1)
            //         selectedCategories.push(category)
            // })
            // sendToBackground(SET_SELECTED_CATEGORIES, selectedCategories)
        default:
        //do nothing
    }
}
