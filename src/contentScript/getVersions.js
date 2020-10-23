export default function getVersions() {
    let lastapproved_idx = null;

    let versions = Array.from(document.querySelectorAll(".review-files .listing-body, #review-files .listing-body")).map((listbody, idx) => {
        let headerparts = listbody.previousElementSibling.firstElementChild.textContent.match(/Version ([^·]+)· ([^·]+)· (.*)/);
        let submissiondate = floatingtime(headerparts[2].trim(), true);
        let hasAutoApproval = false;
        let hasConfirmApproval = false;

        let activities = Array.from(listbody.querySelectorAll(".activity tr")).reduce((results, activityrow) => {
            console.log('activity row', activityrow)
            let state = activityrow.firstElementChild.textContent.trim();
            console.log("state", state)
            let author = stateHasAuthor(state) ? activityrow.querySelector("td > div > a") : null;
            console.log('author', author)

            if (state == "Approved" && author && author.getAttribute("href").endsWith("mozilla/")) {
                // This is an auto-approval, mark it for later.
                hasAutoApproval = true;
            }

            if (state == "Auto-Approval confirmed") {
                // ...and the approval was confirmed
                hasConfirmApproval = true;
            }

            if (state && state != "Not Auto Approved Because" && activityrow.firstElementChild.className != "no-activity") {
                results.push({
                    state: state,
                    type: stateToType(state),
                    automatic: author && author.getAttribute("href").endsWith("mozilla/"),
                    author: authorInfo(author),
                    date: author ? floatingtime(author.nextSibling.textContent.replace(" on ", "")) : submissiondate,
                    comment: activityrow.lastElementChild.textContent.trim()
                });
            }
            return results;
        }, []).map(activityAnnotator);

        if (!activities.length) {
            let listingauthor = document.querySelector("#scroll_sidebar ul:nth-of-type(3) > li > a");
            activities.push(activityAnnotator({
                state: "Submission",
                type: stateToType("Submission"),
                author: authorInfo(listingauthor),
                date: submissiondate,
                comment: ""
            }));
        }

        let installanchor = listbody.querySelector(".editors-install");
        let sourceanchor = listbody.querySelector("a[href^='/firefox/downloads/source']");
        let status = headerparts[3].trim().split(",")[0];
        let permissions = listbody.querySelector(".file-info div strong");
        if (permissions) {
            permissions = permissions.nextSibling.textContent.trim().split(", ");
        }

        // Only the last manual approval
        if (status == "Approved" && (!hasAutoApproval || hasConfirmApproval)) {
            lastapproved_idx = idx;
        }

        return {
            version: headerparts[1].trim(),
            date: submissiondate,
            status: status,

            installurl: installanchor ? (new URL(installanchor.getAttribute("href"), location.href)).href : null,
            sourceurl: sourceanchor ? (new URL(sourceanchor.getAttribute("href"), location.href)).href : null,

            activities: activities,
            permissions: permissions
        };
    });

    return versions;
}

function floatingtime(str, dtonly) {
    try {
        return new Date(str.replace(/\./g, "") + " UTC").toISOString().substr(0, dtonly ? 10 : 19);
    } catch (e) {
        return str;
    }
}

function stateHasAuthor(state) {
    switch (state) {
        case "Approved":
        case "Rejected":
        case "More information requested":
        case "Comment":
        case "Super review requested":
        case "Source code uploaded":
        case "Approval notes changed":
        case "Developer Reply":
        case "Reviewer Reply":
        case "Auto-Approval confirmed":
            return true;
    }
    return false;
}

function stateToType(state) {
    return {
        "Submission": "submission",
        "Approved": "status",
        "Rejected": "status",
        "More information requested": "needinfo",
        "Comment": "comment",
        "Super review requested": "superreview"
    }[state] || "unknown";
}

function authorInfo(anchor) {
    return anchor ? {
        name: anchor.getAttribute("title"),
        url: anchor.getAttribute("href")
    } : null;
}


function activityAnnotator(activity) {
    if (activity.state == "More information requested" &&
        activity.comment.includes("provide the original sources")) {
        activity.state = "Sources Requested";
    } else if (activity.state == "Super review requested" &&
        activity.comment.includes("source files attached when submitted")) {
        activity.state = "Sources Attached";
    } else if (activity.state == "Notes for Reviewers" || activity.state == "Version Notes") {
        activity.state = "Submission";
    } else if (activity.state == "More information requested" &&
        activity.comment.includes("Please provide us with detailed information on how to test this add-on")) {
        activity.state = "Testing info requested";
    }

    return activity;
}