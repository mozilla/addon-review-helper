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

export const AMO_URL_FILTERS = [
    ...REVIEW_URL_FILTERS,
    "https://reviewers.addons.mozilla.org/*/reviewers/queue/reviews*",
    "https://reviewers.addons.mozilla.org/*/reviewers/queue/reviews*",
    "https://reviewers.addons.allizom.org/*/reviewers/queue/reviews*",
    "https://reviewers.addons.allizom.org/*/reviewers/queue/reviews*",
    "https://reviewers.addons-dev.allizom.org/*/reviewers/queue/reviews*",
    "https://reviewers.addons-dev.allizom.org/*/reviewers/queue/reviews*",
    "https://reviewers.addons.thunderbird.net/*/reviewers/queue/reviews*",
    "https://reviewers.addons.thunderbird.net/*/reviewers/queue/reviews*",
    "https://reviewers.addons.mozilla.org/*/reviewers/queue/*",
    "https://reviewers.addons.allizom.org/*/reviewers/queue/*",
    "https://reviewers.addons-dev.allizom.org/*/reviewers/queue/*",
    "https://reviewers.addons.thunderbird.net/*/reviewers/queue/*",
    "https://reviewers.addons.mozilla.org/*/reviewers/",
    "https://reviewers.addons.allizom.org/*/reviewers/",
    "https://reviewers.addons-dev.allizom.org/*/reviewers/",
    "https://reviewers.addons.thunderbird.net/*/reviewers/",
    "https://reviewers.addons.mozilla.org/*/reviewers/review-content/*",
    "https://reviewers.addons.allizom.org/*/reviewers/review-content/*",
    "https://reviewers.addons-dev.allizom.org/*/reviewers/review-content/*",
    "https://reviewers.addons.thunderbird.net/*/reviewers/review-content/*",
    "https://reviewers.addons.mozilla.org/*/reviewers/privacy/*",
    "https://reviewers.addons.allizom.org/*/reviewers/privacy/*",
    "https://reviewers.addons-dev.allizom.org/*/reviewers/privacy/*",
    "https://reviewers.addons.thunderbird.net/*/reviewers/privacy/*"
]