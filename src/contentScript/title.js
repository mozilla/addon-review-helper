import { SET_TITLE } from "../redux/modules/currentAddon/types";
import { sendToBackground } from "../utils/helpers";

export default function () {
    let entireTitle = document.querySelector('.addon span').innerText

    let title = entireTitle.includes('Review') ? entireTitle.split('Review').pop().trim() : entireTitle.trim()
    
    // sending through message to background us no way to initiate store in content script found
    sendToBackground(SET_TITLE, title)
    
}