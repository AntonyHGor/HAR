// things that run in background

// ---------------------- START OF FUNCTIONS ---------------------
// sets the icon badge to a given text and color
var red = "#FF0000"
var grey = "#777"
function setBadge(str, color) {
    chrome.browserAction.setBadgeBackgroundColor({ 'color': color });
    chrome.browserAction.setBadgeText({'text': str});
}
function preLoad(){
    chrome.storage.local.get(['urlList'], function(result) {
        var urlList = result.urlList;
            urlList['youtube.com'] = siteAttributes = {
                homeUrl: 'youtube.com',
                domain: 'youtube.com',
                favIcon: 'http://www.youtube.com/favicon.ico',
                intervalSeconds: 0,
                totalSeconds: 0,
                visited: 0
                }
                urlList['facebook.com'] = siteAttributes = {
                    homeUrl: 'facebook.com',
                    domain: 'facebook.com',
                    favIcon: 'http://facebook.com/favicon.ico',
                    intervalSeconds: 0,
                    totalSeconds: 0,
                    visited: 0
                    }
                    urlList['netflix'] = siteAttributes = {
                        homeUrl: 'netflix.com',
                        domain: 'netflix.com',
                        favIcon: 'http://netflix.com/favicon.ico',
                        intervalSeconds: 0,
                        totalSeconds: 0,
                        visited: 0
                        }
            chrome.storage.local.set({"urlList": urlList}, function() {});
    });

}
function checkInstall(){
    chrome.runtime.onInstalled.addListener(function(details){
        if(details.reason == "install"){
            message = makeBasicNote("I'M ALIVE!", "You'll be hearing more from me ;)");
            notify(message);
            console.log("This is a first install!");
            preLoad();
        }else if(details.reason == "update"){
            message = makeBasicNote("Hey there!", "Thanks for brushing the dirt off me!");
            notify(message);
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
    if (count >= 60 && count < 3600) {
        setBadge(String(min) + "m",grey);
    }
    if (count >= 3600) {
        setBadge(String(hr)+ "h",grey);
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
    var finUrl = /:\/\/(www\.)?(.+?)\//;
    return url.match(finUrl)[2];
}

function getStartDay(){
    chrome.storage.local.get(['startDay'], function(result) {
        if(typeof result.startDay === 'undefined'){
            var startDay = new Date().getDay();
            chrome.storage.local.set({"startDay": startDay}, function() {});
        }else{
            // console.log(result.startDay)
        }
    });
}

function checkReset(daysToReset) {
    chrome.storage.local.get(['startDay'], function(get) {
        var startDay = get.startDay;
        var currDay = new Date().getDay();
        if (currDay - startDay >= daysToReset) {
            chrome.storage.local.get(['urlList'], function(result) {
            var urlList = result.urlList
            for (key in urlList) {
                urlList[key].intervalSeconds = 0;
                urlList[key].visited = 0;
            }
            chrome.storage.local.set({"urlList": urlList}, function() {});
            startDay = currDay;
            chrome.storage.local.set({"startDay": startDay}, function() {});
            });
        }
    });   
}
function updateSeconds(site, list){
    if (site in list) {
        count = list[site].intervalSeconds; // getting count
        list[site].intervalSeconds = count + 1; //updates
        totalCount = list[site].totalSeconds;
        list[site].totalSeconds = totalCount +1;
        chrome.storage.local.set({"urlList": list}, function() {}); //overwriting the list
        formatBadge(list[site].intervalSeconds); // formats and displays badge
        //roast(urlList[site], 3600, site); // checks number of seconds on site = 30
        mainNotification(count, site); // runs roast time algorithm
    }else {
        setBadge("", grey);
        }
}

// Does the work for counting and updating the dictionary between files
function checkUrlInList(tabs, result) {
    try {
        var url = tabs[0].url; // pulled url
        site = formatUrl(url); // removed https://
        var urlList = result.urlList; // list = saved list
        updateSeconds(site, urlList);   
        
    }catch{}
}

// determines if chrome is the focused application
function ifFocused(){
        focus = true;  
chrome.windows.onFocusChanged.addListener(function(window) {
    if (window == chrome.windows.WINDOW_ID_NONE) { // checks to see if there is no focused chrome window
        focus = false;
    } else {
        focus = true;
    }
});
}


// Checks to see if the program should count, if yes, it counts, saves, and updates the count using linked functions
function checkIfCount () {
    if(focus == true){
        chrome.idle.queryState(100000, function (state) {
        if(state === 'active'){
                chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
        function(tabs){
                chrome.storage.local.get(['urlList'], function(result) {
                    checkReset(1);  // checks and resets variables at each new day (a setting to change?)
                    checkUrlInList(tabs, result);
                    //for checking storage persistence 
                    chrome.storage.local.get(['urlList'], function (data) { 
                        sites = data.urlList
                        console.log(sites) });
                    //----
                });
            });
        }
        
    });
    }
}

// counts the number of seconds the user has been on an added site 
function countSeconds(){
    setInterval(checkIfCount, 1000); // update every 1 second
}

function countVisited() {
    try{chrome.history.onVisited.addListener(function(result) {
        chrome.storage.local.get(['urlList'], function(callback){
            var site = formatUrl(result.url);
            var urlList = callback.urlList
            if (site in urlList) {
                if(result.url == urlList[site].homeUrl){
                    var count = urlList[site].visited; // getting count
                    urlList[site].visited = count + 1; //updates
                    chrome.storage.local.set({"urlList": urlList}, function() {}); //overwriting the list
                    // checkVisited(urlList[site].visited, site);    
                }
            }
        });
    });
}catch{}
  
}

// ---------------------- END OF FUNCTIONS ---------------------

// --- MAIN ---
countSeconds(); 
countVisited(); 
ifFocused();
getStartDay();