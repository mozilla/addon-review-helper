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

export function loadPage(items, newPage, perPage, pageItems){

    let lowerCount = perPage * ( newPage - 1 );
    let upperCount = perPage * newPage;
    pageItems = loadItems(items, lowerCount, upperCount);
    
    return {
        pageItems,
        currentPage: newPage,
        currentCount: upperCount
    }
}
