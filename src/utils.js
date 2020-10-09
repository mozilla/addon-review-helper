export function openNewTab(page){
    browser.tabs.create({
        "url": page
    });
}