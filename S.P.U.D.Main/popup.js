
function setBadge(str) {
    chrome.browserAction.setBadgeBackgroundColor({ 'color': "#777" });
    chrome.browserAction.setBadgeText({'text': str});
}

//setBadge("Hello");
