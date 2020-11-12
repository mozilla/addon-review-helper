import getTitle from "./title";
import { getLastVersion } from "./versions";
import { UPDATE_REDUX } from "../utils/constants";
import { sendToBackground } from "../utils/helpers";
import { SET_CURRENT_NOTE, } from "../redux/modules/notes/types";
import { SET_NOTE_EXISTS, } from "../redux/modules/currentAddon/types";

console.log('!!!!! Content scripts has loaded !!!!!');

browser.runtime.onMessage.addListener(handleMessages);

function handleMessages(message) {
    switch (message.type) {
        case UPDATE_REDUX: {
            console.log("NOTES IN CONTENT SCRIPT", message.notes)
            let title = null;
            if (message.isReview) {
                title = getTitle();
                getLastVersion();
            }
            if (message.isReview && message.notes) {
                //DISPATCH SET CURRENT NOTE
                message.notes.forEach((note) => {
                    if (note.addon === title) {
                        sendToBackground(SET_CURRENT_NOTE, note.content)
                        sendToBackground(SET_NOTE_EXISTS, true)
                    }
                })
            } else {
                sendToBackground(SET_CURRENT_NOTE, null)
                sendToBackground(SET_NOTE_EXISTS, false)
            }
            break;
        }
        default:
        //do nothing
    }
}
