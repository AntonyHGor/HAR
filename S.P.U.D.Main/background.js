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
function checkVisited(num) {//checks youtube only currently
    chrome.history.onVisited.addListener(function(result) {
        if (result.url == "https://www.youtube.com/") {
            visited = visited + 1;
            roastVisited(num);
        }
    }); 
}

function roastVisited(num){
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
function roast(count, int){
    if (count == int){
        var defaultTimeNote = {
            type: "basic",
            title: "Wow. ",
            message: "You've spent " + count +  " seconds on Youtube. Your grandma would be proud.",
            iconUrl: "icon_128.png"
          }
        notify(defaultTimeNote);
    }
}
function formatUrl(url){
    


}
var urlList = ['www.youtube.com'];

// ---------------------- END OF FUNCTIONS ---------------------
var count = 0;
var orinDay = new Date().getDay();
function update () {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
    function(tabs){
        // checks and resets variables at each new day
        var currDay = new Date().getDay();
        if(orinDay != currDay){
            count = 0;
            visited = 0;
            orinDay = currDay;
        }
        //---------------
        // checks if url is in list of added urls
        var url = tabs[0].url;
        var strArray = url.split('/'); // formats url into prefix
        var newUrl = strArray[2];
        if (urlList.includes(newUrl)){
            count = count + 1;
            formatBadge(count); // formats and displays badge 
            roast(count, 30); // checks number of seconds on site = 30
        }else{
            setBadge("", grey) // if url doesn't match, remove badge
        }
    }
    );
}

setInterval(update, 1000); // update every 1 second
checkVisited(3); // checks number of times visited = 3


// need to add:
// prefix recognizer
// storage saving and pulling for each site
// ability to add and remove sites
// do all current functions with new storage
// domain and favicon pushing to popup (top three sites)


