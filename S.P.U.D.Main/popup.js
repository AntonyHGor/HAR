
function setBadge(str) {
    chrome.browserAction.setBadgeBackgroundColor({ 'color': "#777" });
    chrome.browserAction.setBadgeText({'text': str});
}

chrome.history.onVisited.addListener(function(result) {
    if (result.url == "https://www.youtube.com/") {
        setBadge("YAY");
    }
}); 

setBadge("Hello");