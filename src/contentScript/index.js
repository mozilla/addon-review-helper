import getTitle  from "./title";
import { getLastVersion } from "./versions";
import { UPDATE_REDUX } from "../utils/constants";

console.log('!!!!! Content scripts has loaded !!!!!');

browser.runtime.onMessage.addListener(handleMessages);

function handleMessages(message){
    switch(message.type){
        case UPDATE_REDUX: {
            getTitle()
            getLastVersion();
            break;
        }
        default:
            //do nothing
    }
}
