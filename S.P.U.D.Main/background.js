// things that run in background

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
var visited = 0;
function checkVisited(num) {//checks youtube only currently, need to add another element to dict for times visited
    chrome.history.onVisited.addListener(function(result) {
        if (result.url == "https://www.youtube.com/") {
            visited = visited + 1;
            roastVisited(num);
        }
    });
}

function roastVisited(num, site){
    if(visited == num){
        var defaultVisitedNote = {
            type: "basic",
            title: "Really?",
            message: "You have opened Youtube " + String(num) + " times today.",
            iconUrl: "icon_128.png"
          }
        notify(defaultVisitedNote);
    }
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

function notify(message){
    chrome.notifications.create(null, message, null)
    
}
//

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
function checkUpdate() {
    var currDay = new Date().getDay();
    if (orinDay != currDay) {
        chrome.storage.local.get(['urlList'], function(result) {
        var urlList = result.urlList
        for (key in urlList) {
            urlList[key] = 0;
        }
        chrome.storage.local.set({"urlList": urlList}, function() {});
        orinDay = currDay;
        });
    }   
}

// Initializes the dictionary and saves it
var urlList = {};
chrome.storage.local.set({"urlList": urlList}, function() {});
//

// Does the work for counting and updating the dictionary between files
function checkUrlInList(tabs, result) {
    var url = tabs[0].url; // pulled url
    site = formatUrl(url); // removed https://
    var urlList = result.urlList; // list = saved list
    if (site in urlList) {
        count = urlList[site]; // getting count
        urlList[site] = count + 1; //updates
        chrome.storage.local.set({"urlList": urlList}, function() {}); //overwriting the list
        formatBadge(urlList[site]); // formats and displays badge 
        //roast(urlList[site], 3600, site); // checks number of seconds on site = 30
        checkMinute(count, site);
        
    }
    else {
        setBadge("", grey);
    }
    
}


// function getUrlList(){
//     chrome.storage.sync.get(['urlList'], function(result) {
//         //alert(result.urlList);
//       });
// }


// chrome.storage.sync.get(['urlList'], function(result) {
//     sites = result.urlList;
//   });



// ---------------------- END OF FUNCTIONS ---------------------

// MAIN 
function update () {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
    function(tabs){
        chrome.storage.local.get(['urlList'], function(result) {
        checkUpdate();  // checks and resets variables at each new day (a setting to change?)
        checkUrlInList(tabs, result);
          });
    }
    );
}

setInterval(update, 1000); // update every 1 second
//checkVisited(5); NOT COMPLETE, NEED TO ADAPT FOR DICTIONARY USAGE 

// need to add:
// do all current functions with new storage
// domain and favicon pushing to popup (top three sites)

// there is a minor display lag if user swtiches tab shortly after second has passed, program has to wait the --
// -- rest of the second to change badge. Could be a solution where the tab checker is updated more often to get--
// -- the url and switch off the badge but will still only update the timer badge every second if the tab is unchanged.

// there is also a display lag when badge switches from 60 minutes to one hour, probably due to above reason

