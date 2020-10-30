export const SAVE_TO_STORAGE = "SAVE_TO_STORAGE";
export const UPDATE_REDUX = "UPDATE_REDUX";
export const REVIEW_URL_MATCHES = /https:\/\/reviewers\.addons\.mozilla\.org\/?([a-z]{2}-[A-Z]{2})?\/reviewers\/review[-a-z]*\/[aA-zZ]*/
export const REVIEW_URL_FILTERS = [
    "https://reviewers.addons.mozilla.org/*/reviewers/review/*",
    "https://reviewers.addons.mozilla.org/*/reviewers/review-listed/*",
    "https://reviewers.addons.mozilla.org/*/reviewers/review-unlisted/*",
    "https://reviewers.addons.mozilla.org/*/reviewers/review-content/*",
    "https://reviewers.addons-dev.allizom.org/*/reviewers/review/*",
    "https://reviewers.addons-dev.allizom.org/*/reviewers/review-listed/*",
    "https://reviewers.addons-dev.allizom.org/*/reviewers/review-unlisted/*",
    "https://reviewers.addons-dev.allizom.org/*/reviewers/review-content/*",
    "https://reviewers.addons.thunderbird.net/*/reviewers/review/*",
    "https://reviewers.addons.thunderbird.net/*/reviewers/review-listed/*",
    "https://reviewers.addons.thunderbird.net/*/reviewers/review-unlisted/*",
    "https://reviewers.addons.thunderbird.net/*/reviewers/review-content/*"
]