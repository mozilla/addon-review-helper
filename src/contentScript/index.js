import getTitle from "./title";
import { getLastVersion } from "./versions";
import { UPDATE_REDUX, CHECK_WITH_ADDONS, REVIEW_URL_FILTERS, REDIRECT_TO} from "../utils/constants";
import { sendToBackground, checkURLMatches } from "../utils/helpers";
import { SET_CURRENT_NOTE, } from "../redux/modules/notes/types";
import { SET_NOTE_EXISTS } from "../redux/modules/currentAddon/types";
import { SET_SELECTED_CATEGORIES } from "../redux/modules/categories/types"
import "./index.css"

console.log('!!!!! Content scripts has loaded !!!!!');

browser.runtime.onMessage.addListener(handleMessages);

let keysPressed = {};

function handleMessages(message) {
    switch (message.type) {
        case UPDATE_REDUX: {
            if (message.isReview) {
                let title = null;
                title = getTitle();
                getLastVersion();

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
                    if (!exists) {
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
            let withAddons = message.withAddons;
            let selectedCategories = [];
            let withCategories = {};
            const classArray = ["green", "purple", "light-blue", "blue"]
            document.querySelectorAll(".chip").forEach(el => el.remove());

            Object.keys(withAddons).forEach(category => {

                if (message.isReview) {
                    if (withAddons[category].indexOf(getTitle()) > -1) {
                        let chip = document.createElement("div")
                        chip.className = "chip " + classArray[Math.floor(Math.random() * classArray.length)]
                        chip.innerHTML = `<div class="chip-content">${category}</div>`
                        document.querySelector("#addon .addon-info-and-previews").after(chip);
                        selectedCategories.push(category)
                    }
                }

                // create new array addons => categories
                withAddons[category].forEach(addon => {
                    if (!withCategories[addon]) {
                        withCategories[addon] = [category];
                    } else {
                        let addCategories = withCategories[addon];
                        addCategories.push(category);
                        withCategories[addon] = addCategories;
                    }
                })
            })

            document.querySelectorAll(".addon-row").forEach(el => {
                let title = el.children[1].children[0].innerHTML.split("<em>")[0].trim()
                if (withCategories[title]) {
                    withCategories[title].forEach(category => {
                        let chip1 = document.createElement("div")
                        chip1.className = `chip small ${classArray[Math.floor(Math.random() * classArray.length)]}`
                        chip1.innerHTML = `<div class="chip-content">${category}</div>`
                        el.children[1].append(chip1)
                    })
                }
            });

            sendToBackground(SET_SELECTED_CATEGORIES, selectedCategories)
        default:
        //do nothing
    }
}

document.addEventListener('keydown', event => {
    let pageURL = window.location.href;
    keysPressed[event.key] = true;
    
    if(keysPressed['Shift'] && event.key === 'R' && checkURLMatches([...REVIEW_URL_FILTERS.slice(3,4)],pageURL)) {
        pageURL = pageURL.replace(`/review-${REDIRECT_TO.content}/`, '/review/');
        window.location.href = pageURL;
    } else if(keysPressed['Shift'] && event.key === 'C' && checkURLMatches([...REVIEW_URL_FILTERS.slice(0,3)], pageURL)) {   
        pageURL = pageURL.replace('/review/', `/review-${REDIRECT_TO.content}/`)
        .replace(`/review-${REDIRECT_TO.listed}/`, `/review-${REDIRECT_TO.content}/`)
        .replace(`/review-${REDIRECT_TO.unlisted}/`, `/review-${REDIRECT_TO.content}/`);
        window.location.href = pageURL;
    }
});

