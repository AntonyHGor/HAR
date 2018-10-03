
function setBadge(){chrome.browserAction.setBadgeBackgroundColor({ 'color': "#777" });
chrome.browserAction.setBadgeText({'text': "Hello"});}

chrome.history.onVisited.addListener(function(result) {
    if (result.url == "https://www.youtube.com/") {
        setBadge();
    }
}); 