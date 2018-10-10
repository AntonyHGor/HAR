function checkVisited() {//checks youtube only currently
    chrome.history.onVisited.addListener(function(result) {
        if (result.url == "https://www.youtube.com/") {
            setBadge("stop", red)
        }
    }); 
}
var red = "#FF0000"
function setBadge(str, color) {
    chrome.browserAction.setBadgeBackgroundColor({ 'color': color });
    chrome.browserAction.setBadgeText({'text': str});
}

checkVisited();
