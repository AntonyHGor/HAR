


var list45={note1={title: "Hello", message: "liste."},note2={title: "Attention", message: "sdascasc."} }
var list85={}
var list120={}
var list175={}
var list240={}


function getList(num){
    if(num==45){
        return list45
    }
    // if(num==85){
    //     return list85
    // }
}


function chooseNotification(list){
    var randomNum=generateRandomNumber(list.length)
    var randomKey=list[randomNum]

    var notification=makeBasicNote(randomKey.title, randomKey.message)

    notify(notification)
}



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



function firstGreeting(count, site){
    if(count==60){
        timeNote = makeBasicNote("Welcome to SPUD", "You've spent " + count +  " seconds on " + site + ".");
        notify(timeNote)
    }
}


function notificationAlert(count, site, highNum, lowNum){
    // var notified = false

    
    if(count<=highNum && count>=lowNum){
        var randomNum=generateRandomNumber(highNum-lowNum);
            if(randomNum==highNum-lowNum){
                var listName=getList(highNum)
                chooseNotification(listName)
                // notified=true;
            }
            
        }
    
    if(count== highNum){
        var listName=getList(highNum)
        chooseNotification(listName)
    }
        
   
}


function mainNotification(count, site){
    var min= 60
    var hour=3600



    notificationAlert(count, site, 45*1, 15*1);
    notificationAlert(count, site, 85*1, 60*1);
    notificationAlert(count, site, 95*1, 120*1);
    notificationAlert(count, site, 130*1, 175*1);
    notificationAlert(count, site, 190*1, 240*1);


}

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