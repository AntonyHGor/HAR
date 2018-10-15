// things that run in background

// ---------------------- START OF FUNCTIONS ---------------------

// sets the icon badge to a given text and color
var red = "#FF0000"
var grey = "#777"
function setBadge(str, color) {
    chrome.browserAction.setBadgeBackgroundColor({ 'color': color });
    chrome.browserAction.setBadgeText({'text': str});
}

// listens to see if a certain url appears in the history 
function checkVisited() {//checks youtube only currently
    chrome.history.onVisited.addListener(function(result) {
        if (result.url == "https://www.youtube.com/") {
            setBadge("stop", red)
        }
    }); 
}

// Creates notification settings, in future we could have a random generator that points to
// title/message combination ie. num[0] = title and num[0[0]] = message or something like that
var note = {
    type: "basic",
    title: "You boy.",
    message: "Why you no listen?",
    iconUrl: "icon_128.png"
  }
function notify(){
    chrome.notifications.create(null, note, null)
}
//

// ---------------------- END OF FUNCTIONS ---------------------

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab ) {
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
    var url = tabs[0].url;
    if (url == "https://www.youtube.com/"){
        //alert("bonk")
      }
   }
);
});
