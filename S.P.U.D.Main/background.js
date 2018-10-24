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
// formats timer
function formatBadge(count){
    var sec = count;
    var min = Math.floor(count/60);
    var hr = Math.floor(count/60/60);

    if (count < 60){
        setBadge(String(sec) + "s", grey);
    }
    if (count >= 60) {
        setBadge(String(min) + "m", grey);
    }
    if (count >= 3600) {
        setBadge(String(hr) + "h", grey);
    }
}

// Creates notification settings, in future we could have a random generator that points to
// title/message combination ie. num[0] = title and num[0[0]] = message or something like that
var note = {
    type: "basic",
    title: "You boy.",
    message: "Why you no listen?",
    iconUrl: "icon_128.png"
  }
function notify(message){
    chrome.notifications.create(null, message, null)
}
//

//roasts user, int is the number of seconds on site before roasting them
function roast(count, int, message){
    if (count == int){
        notify(message);
    }
}



// ---------------------- END OF FUNCTIONS ---------------------
count = 0;
count1 = 0;




function update () {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
    function(tabs){
        var url = tabs[0].url;
        if (url ){
            count = count + 1;
            formatBadge(count);
        }
        else if (url=="https://www.google.com/"){
            count1=count1+1
            formatBadge(count1)
        }
        else{
            setBadge("", grey)
        }
    }
    );
}
setInterval(update, 1000);



