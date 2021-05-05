import store from '../redux/store';
import {setCountNewRejections, setNewRejections} from "../redux/modules/rejections/actions";
console.log("!! ISSUES BACKGROUND !!");

let newRejections = [];
let fromStorage = browser.storage.local.get('newRejections');
fromStorage.then((res) => {
    if(res.newRejections){
        newRejections = res.newRejections
    }
});

function cancel(requestDetails) {
    if (requestDetails.requestBody.formData.action[0] === "reject_multiple_versions" && requestDetails.requestBody.formData.delayed_rejection[0] === "False") {
        let addonUrl = requestDetails.originUrl;
        let review = requestDetails.requestBody.formData.comments[0]
    
        newRejections.push({
            addonUrl,
            review,
            date: Date.now()
        })

        browser.storage.local.set({
            newRejections
        });

        store.dispatch(setNewRejections(newRejections));
        store.dispatch(setCountNewRejections(newRejections.length))

        // SET TO REDUX AS WELL

        return {cancel: true};
    }
}

// add the listener,
// passing the filter argument and "blocking"
browser.webRequest.onBeforeRequest.addListener(
    cancel,
    { urls: ["https://reviewers.addons.allizom.org/*/reviewers/review/*", "https://reviewers.addons.mozilla.org/*/reviewers/review/*"] },
    ["blocking", "requestBody"]
);

