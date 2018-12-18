// things that run in background

// ---------------------- START OF FUNCTIONS ---------------------
// sets the icon badge to a given text and color
var red = "#FF0000"
var grey = "#777"
function setBadge(str, color) {
    chrome.browserAction.setBadgeBackgroundColor({ 'color': color });
    chrome.browserAction.setBadgeText({'text': str});
}

// formats timer for badge
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

// sends notification of message
function notify(message){
    chrome.notifications.create(null, message, null)

}
// formats the url of the website to inculde only the domain
function formatUrl(url){
    var finUrl = /:\/\/(www\.)?(.+?)\//;
    return url.match(finUrl)[2];
}

// gets the start of each day and saves it to storage
function getStartDay(){
    chrome.storage.local.get(['startDay'], function(result) {
        if(typeof result.startDay === 'undefined'){
            var startDay = new Date().getDay();
            chrome.storage.local.set({"startDay": startDay}, function() {});
        }else{
        }
    });
}

// checks to see if the start day is the same, if not, resets the interval seconds for all added sites
function checkReset(daysToReset) {
    chrome.storage.local.get(['startDay'], function(get) {
        var startDay = get.startDay;
        var currDay = new Date().getDay();
        if (currDay - startDay >= daysToReset) {
            potatoDay();
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
// increments the count for the site currently on, will run notification algorithm and set the badge
function updateSeconds(site, list){
    if (site in list) {
        count = list[site].intervalSeconds; // getting count
        list[site].intervalSeconds = count + 1; //updates
        totalCount = list[site].totalSeconds;
        list[site].totalSeconds = totalCount +1;
        chrome.storage.local.set({"urlList": list}, function() {}); //overwriting the list
        formatBadge(list[site].intervalSeconds); // formats and displays badge
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
// determines if the chrome browser is focused, if not, set focus to false
function checkFocused(){
    chrome.windows.getCurrent(function(browser){
        if(browser.focused==true){
            focus=true;
        }
        else{
            focus=false;
        }
    })
    var views= chrome.extension.getViews({type: "popup"}); //continue timing when popup is open (for windows OS)
    if(views.length==1){
        focus=true;
    }
}

// Checks to see if the program should count, if yes, it counts, saves, and updates the count using linked functions
function checkIfCount() {
    if(focus == true){ // Is Chrome focused?
                chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
        function(tabs){
                chrome.storage.local.get(['urlList'], function(result) {
                    checkReset(1);  // checks and resets variables at each new day
                    checkUrlInList(tabs, result);
                });
            });
        }
    }


// counts the number of seconds the user has been on an added site
function countSeconds(){
    setInterval(checkIfCount, 1000); // update every 1 second
}
//counts the number of times the user has visited the site (not currently implemented)
function countVisited() {
     chrome.history.onVisited.addListener(function(result) {
        chrome.storage.local.get(['urlList'], function(callback){
            var site = formatUrl(result.url);
            var urlList = callback.urlList
            try{
                if (site in urlList) {
                    if(result.url == urlList[site].homeUrl){
                        var count = urlList[site].visited; // getting count
                        urlList[site].visited = count + 1; //updates
                        chrome.storage.local.set({"urlList": urlList}, function() {}); //overwriting the list
                    }
                }
            }catch{}

        });
    });
}

// ---------------------- END OF FUNCTIONS ---------------------

// --- MAIN ---
//checks focus every .1 seconds
setInterval(checkFocused,100); // needs to be before other functions to keep timing correct
countSeconds();
// countVisited(); // something to implement later

getStartDay(); // checks if day has past
