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
    
}



var urlList = {'www.youtube.com': 0, 'waitbutwhy.com': 0};


// ---------------------- END OF FUNCTIONS ---------------------
var count = 0;
var orinDay = new Date().getDay();
function update () {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
    function(tabs){
        // checks and resets variables at each new day
        var currDay = new Date().getDay();
        if(orinDay != currDay){
            for(key in urlList){
                urlList[key] = 0;
            }
            visited = 0;
            orinDay = currDay;
        }
        //---------------
        // checks if url is in list of added urls
        var url = tabs[0].url;
        var strArray = url.split('/'); // formats url into prefix
        var finUrl = strArray[2];
        if (finUrl in urlList){
            count = urlList[finUrl];
            urlList[finUrl] = count + 1;
            formatBadge(urlList[finUrl]); // formats and displays badge 
            roast(urlList[finUrl], 3600, finUrl); // checks number of seconds on site = 30
        }else{
            setBadge("", grey) // if url doesn't match, remove badge
        }
    }
    );
}

setInterval(update, 1000); // update every 1 second
checkVisited(5); // checks number of times visited = 3


// need to add:
// storage saving and pulling for each site (currently working with hardcoded sites. Need a function to add sites to dict.)
// ability to add and remove sites
// do all current functions with new storage
// domain and favicon pushing to popup (top three sites)

// there is a minor display lag if user swtiches tab shortly after second has passed, program has to wait the --
// -- rest of the second to change badge. Could be a solution where the tab checker is updated more often to get--
// -- the url and switch off the badge but will still only update the timer badge every second if the tab is unchanged.



