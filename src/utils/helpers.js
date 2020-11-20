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
    let pageItems = Object.keys(items).slice(lowerCount, upperCount).reduce((result, key) => {
        result[key] = items[key];
        return result;
    }, {});

    return pageItems
}