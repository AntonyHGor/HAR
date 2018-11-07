// things that run in background

var TIMER_COUNT = 0;
var VISITED_COUNT = 1;

// ---------------------- START OF FUNCTIONS ---------------------
function checkReset(){

}
function setDefaults(count, visited){
    var visited = 0;
    var count = 0;
    return count, visited
}
// sets the icon badge to a given text and color
var red = "#FF0000"
var grey = "#777"
function setBadge(str, color) {
    chrome.browserAction.setBadgeBackgroundColor({ 'color': color });
    chrome.browserAction.setBadgeText({'text': str});
}

// listens to see if a certain url appears in the history
function countVisited() {
    chrome.history.onVisited.addListener(function(result) {
        chrome.storage.local.get(['urlList'], function(callback){
            var site = formatUrl(result.url);
            var urlList = callback.urlList
            if (site in urlList) {
                    var count = urlList[site][VISITED_COUNT]; // getting count
                    urlList[site][VISITED_COUNT] = count + 1; //updates
                    chrome.storage.local.set({"urlList": urlList}, function() {}); //overwriting the list
                    checkVisited(urlList[site][VISITED_COUNT], site);    
            }
        });
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
    if (count >= 60 && count < 3600) {
        setBadge(String(min) + "m", grey);
    }
    if (count >= 3600) {
        setBadge(String(hr) + "h", grey);
    }
}

// Creates notification settings, in future we could have a random generator that points to
// title/message combination ie. num[0] = title and num[0[0]] = message or something like that

function notify(message){
    chrome.notifications.create(null, message, null)
    
}
//roasts user, int is the number of seconds on site before roasting them
function roast(count, int, site){
    if (count == int){
        var defaultTimeNote = {
            type: "basic",
            title: "Wow. ",
            message: "You've spent " + count +  " seconds on " + site + ". Your grandma would be proud.",
            iconUrl: "icon_128.png"
          }
        notify(defaultTimeNote);
    }
}

function formatUrl(url){
    var strArray = url.split('/'); // formats url into prefix
    var finUrl = strArray[2];
    return finUrl
}

var orinDay = new Date().getDay();
function checkReset() {
    var currDay = new Date().getDay();
    if (orinDay != currDay) {
        chrome.storage.local.get(['urlList'], function(result) {
        var urlList = result.urlList
        for (key in urlList) {
            urlList[key][TIMER_COUNT] = 0;
            urlList[key][VISITED_COUNT] = 0;
        }
        chrome.storage.local.set({"urlList": urlList}, function() {});
        orinDay = currDay;
        });
    }   
}
function countSeconds(site, list){
    if (site in list) {
        count = list[site][TIMER_COUNT]; // getting count
        list[site][TIMER_COUNT] = count + 1; //updates
        chrome.storage.local.set({"urlList": list}, function() {}); //overwriting the list
        formatBadge(list[site][TIMER_COUNT]); // formats and displays badge
        //roast(urlList[site], 3600, site); // checks number of seconds on site = 30
        checkMinute(count, site); // runs roast time algorithm
    }else {
        setBadge("", grey);
        }
}

// Initializes the dictionary and saves it
var urlList = {};
chrome.storage.local.set({"urlList": urlList}, function() {});
//

// Does the work for counting and updating the dictionary between files
function checkUrlInList(tabs, result) {
    try {
        var url = tabs[0].url; // pulled url
        site = formatUrl(url); // removed https://
        var urlList = result.urlList; // list = saved list
        countSeconds(site, urlList);   
        
    }catch{}
}

// ---------------------- END OF FUNCTIONS ---------------------

// MAIN 
function update () {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
    function(tabs){
        chrome.storage.local.get(['urlList'], function(result) {
        checkReset();  // checks and resets variables at each new day (a setting to change?)
        checkUrlInList(tabs, result);
        });
    });
}


setInterval(update, 1000); // update every 1 second
countVisited();




