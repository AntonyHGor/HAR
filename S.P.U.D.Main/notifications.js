
var list45=[
    note1={title: "NOTE 1", message: "FOR LIST45"},
    note2={title: "NOTE 2", message: "FOR LIST45"},
    note3={title: "NOTE 3", message: "FOR LIST45"},
    note4={title: "NOTE 4", message: "FOR LIST45"} 
    // note1={title: "Hello", message: "Just wanted to say hi."},
    // note2={title: "What do you get when it rains potatoes?", message: "Spuddles."} 
]

var list85=[
    note1={title: "NOTE 1", message: "FOR LIST85"},
    note2={title: "NOTE 2", message: "FOR LIST85"},
    note3={title: "NOTE 3", message: "FOR LIST85"},
    note4={title: "NOTE 4", message: "FOR LIST85"} 
    // note1={title: "Hi.", message: "You should stop."},
    // note2={title: "Where are you?", message: "There you are."} 
]
var list120=[
    note1={title: "NOTE 1", message: "FOR LIST120"},
    note2={title: "NOTE 2", message: "FOR LIST120"},
    note3={title: "NOTE 3", message: "FOR LIST120"},
    note4={title: "NOTE 4", message: "FOR LIST120"}  
]
var list175=[
    note1={title: "NOTE 1", message: "FOR LIST175"},
    note2={title: "NOTE 2", message: "FOR LIST175"},
    note3={title: "NOTE 3", message: "FOR LIST175"},
    note4={title: "NOTE 4", message: "FOR LIST175"} 
]
var list240=[
    note1={title: "NOTE 1", message: "FOR LIST240"},
    note2={title: "NOTE 2", message: "FOR LIST240"},
    note3={title: "NOTE 3", message: "FOR LIST240"},
    note4={title: "NOTE 4", message: "FOR LIST240"} 
]
var listAfterFour=[
    note1={title: "NOTE 1", message: "FOR LIST4HOURS"},
    note2={title: "NOTE 2", message: "FOR LIST4HOURS"},
    note3={title: "NOTE 3", message: "FOR LIST4HOURS"},
    note4={title: "NOTE 4", message: "FOR LIST4HOURS"} 
]


function getList(num){
    var min = 60;
    if(num==45*min){
        return list45
    }
    if(num==85*min){
        return list85
    }
    if(num==120*min){
        return list120
    }
    if(num==175*min){
        return list175
    }
    if(num==240*min){
        return list175
    }
    if(num>240 * min){
        return listAfterFour
    }
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

function firstGreeting(count,site){
    chrome.storage.local.get(['urlList'], function(result) {
        if( result.urlList.length == 1){
            if(count==4){
                     var notification=makeBasicNote("This is a notification.", "This is how I will talk to you!")
                    notify(notification)
            }
        }
    });
}

function afterFourHours(count){
    if(count > 240){
        var randomNum=generateRandomNumber(1500);
            if(randomNum == 1500){
                var listName=getList(241*1)
                chooseNotification(listName)
            }
            
        }
    }
  
var notified = false;
function chooseInterval(count,highNum, lowNum){
    if(count === lowNum){
        notified = false;
    }
        if (notified == false){
            if(count<=highNum && count>=lowNum){
                var inter = highNum-count;
                var randomNum=generateRandomNumber(inter);
                console.log(randomNum);
                    if(randomNum==inter){
                        var listName=getList(highNum)
                        chooseNotification(listName)
                        notified = true;
                    }else{
                        inter -= 1;
                        console.log(inter);
                    }
                    
                }
        }
    
    
    
    // if(count == highNum){
    //     var listName=getList(highNum)
    //     chooseNotification(listName)
    // }
}


function mainNotification(count,site){
    var min= 60
    var hour=3600

    // firstGreeting(count,site);
    notify(makeBasicNote("You suck."))
    chooseInterval(count,45*min, 15*min);
    chooseInterval(count,85*min, 60*min);
    chooseInterval(count,120*min, 95*min);
    chooseInterval(count,175*min, 130*min);
    chooseInterval(count,240*min, 190*min);
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