import { REVIEW_STATE } from './constants';

export function saveToStorage(content){
    browser.storage.local.set(content);
}

export function sendToBackground(action, payload){
    browser.runtime.sendMessage({
        'type': action,
        'payload': payload
    });
}

export function checkIfMatches(expression, subject){
    return expression.test(subject)
}

export function loadItems(items, lowerCount, upperCount){
    let pageItems = null;
    if (items) {
        pageItems = items.slice(lowerCount, upperCount)
    }
    return pageItems
}

export function checkURLMatches(arr, url) {
    return arr.some(str=> url.includes(str.split('*')[1]));}

export function loadPage(items, newPage, perPage){

    let lowerCount = perPage * ( newPage - 1 );
    let upperCount = perPage * newPage;
    let pageItems = loadItems(items, lowerCount, upperCount);
    
    return {
        pageItems,
        currentPage: newPage,
        currentCount: upperCount
    }
}

export async function getCurrentURL() {
    let currentURL = ''
    await browser.tabs.query({currentWindow: true, active: true})
    .then((tabs) => currentURL = tabs[0].url);

    return currentURL;
}

export const getNameFromURL = url => {
    let nameURL = '';

    REVIEW_STATE.map(index => {
        if(url.indexOf(index)!==-1) {
            let [, nameUpdate] = url.split(index);
    
            nameUpdate = nameUpdate.split('-').map(index => index.toUpperCase()[0]+index.slice(1)).join(' ');
            nameURL=nameUpdate;
        }

    });
    return nameURL;
};
