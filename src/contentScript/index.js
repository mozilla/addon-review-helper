import getTitle from "./title";
import { getLastVersion } from "./versions";
import { UPDATE_REDUX } from "../utils/constants";
import { sendToBackground } from "../utils/helpers";
import { SET_CURRENT_NOTE } from "../redux/modules/notes/types";

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
            if (message.isReview && message.notes && message.notes[title]) {
                //DISPATCH SET CURRENT NOTE
                sendToBackground(SET_CURRENT_NOTE, message.notes[title].content)
            } else {
                sendToBackground(SET_CURRENT_NOTE, null)
            }
            break;
        }
        default:
        //do nothing
    }
}
