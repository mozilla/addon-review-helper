import { SET_TITLE } from "../redux/modules/currentAddon/types";

export function getTitle() {
    let entireTitle = document.querySelector('.addon span').innerText

    let title = entireTitle.includes('Review') ? entireTitle.split('Review').pop().trim() : entireTitle.trim()

    // sending through message to background us no way to initiate store in content script found
    browser.runtime.sendMessage({
        'type': SET_TITLE,
        'payload': title
    });
}