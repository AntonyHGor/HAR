
function notify(message){
    chrome.notifications.create(null, message, null)
}

// Generates random number

function generateRandomNumber(max){
    return Math.floor(Math.random()*Math.floor(max)+1)
}

function makeBasicNote(title, message){
    var note = {
        type: "basic",
        title: title,
        message: message,
        iconUrl: "icon_128.png"
    }
    return note
}

function checkVisited(count, site){
    if (count == 1){
        visited1Note = makeBasicNote("Again?", "Back to " + site + " again are we?")
        notify(visited1Note);
    }
    if (count == 2){
        visited2Note = makeBasicNote("Wow.", "Just can't shake it huh?")
        notify(visited2Note);
    }
    if (count == 3){
        visited3Note = makeBasicNote("Come on now.", "You've been to " + site + " " + count + " times today.")
        notify(visited3Note);
    }
}

function checkMinute(count, site){
    

}


var min= 60
    if(count<=min){
        var num=generateRandomNumber(min)
        if(num==min){
            timeNote = makeBasicNote("Listen.", "You've spent " + count +  " seconds on " + site + ".");
            notify(timeNote)
        }
    }

// 1 minute into with first site
// 15 - 45 goofs and jokes with some reminders 1 in the 30 period 
// 60-85 minor roasts and reminders .75
// 95-120 medium roasts .75 
// 130 - 175 heavier roast more frequent, 2 in hour
// 190 - 240 heavy roasts, 3 in hour
// 240 - infinity, 1 every 15 minutes 

/* A simple MVP times visited algorithm would be easy to implement
asumming we track it
If its the first time nothing
second time: Again? Back to __ again are we?
third time: Wow. Just can't shake it huh?
fourth time: Come on now. You've been to __ __ times today. 
fifth time: Really? __ __ times today. You're going places. 
fifth time: Stop. Just stop.
sixth time: AHHHHH. AHHHHHHHHH. 
seven time: OK. I've given up. 
eighth time: ... You're doing this to me on purpose aren't you?
nineth time: Yeah. Your kids respect you. 

Could be breaks in between where nothing pops up or its randomized to not always show that time's message. 

Even better is sytem where it doesn't always notify you, but goes in that order. 
*/ 