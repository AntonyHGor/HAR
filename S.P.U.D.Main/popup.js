
function setBadge(str) {
    chrome.browserAction.setBadgeBackgroundColor({ 'color': "#777" });
    chrome.browserAction.setBadgeText({'text': str});
}

//setBadge("Hello");

// ** Creates notification settings, in future we could have a random generator that points to
// ** title/message combination ie. num[0] = title and num[0[0]] = message or something like that
var note = {
    type: "basic",
    title: "You boy.",
    message: "Why you no listen?",
    iconUrl: "icon_128.png"
  }
function notify(){
    chrome.notifications.create(null, note, null)
}
// ****

chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
      url = tabs[0].url;
      if (url == "https://www.youtube.com/"){
        notify();
      }
   }
);



