
var list30=[
    note1={title: "Hello", message: "Just wanted to say hi."},
    note2={title: "Hi.", message: "Just checking in."},
    note3={title: "S.P.U.D.", message: "That's my name."},
    note4={title: "So...", message: "What's up with this weather huh?."},
    note5={title: "So...", message: "I never know what to say in these situations."},
    note6={title: "Howdy.", message: "That was me, as a cowboy."},
    note7={title: "What do you get when it rains potatoes?", message: "Spuddles."}, 
    note8={title: "Where are you?", message: "There you are."}
]

var list50=[
    note1={title: "Hi.", message: "You should stop."},
    note2={title: "(looks at watch)", message: "Been awhile now, yeah?"},
    note3={title: "Hey.", message: "Might be time for a break."},
    note4={title: "Researchers say:", message: "Those who listen to S.P.U.D. are good people."},
    note5={title: "Hi.", message: "You should stop."},
    note6={title: "Hi.", message: "You should take a break."},
    note7={title: "And the Lord said:", message: "'Listen to S.P.U.D.'"},
     
]
var list85=[
    note1={title: "Stop.", message: "STOP."},
    note2={title: "(looks at watch)", message: "Please stop."},
    note3={title: "Hey.", message: "It's time for a break."},
    note4={title: ":(", message: "You really hate to listen don't you."},
    note5={title: "Hm.", message: "You have trouble listening don't you?"},
    note6={title: "Hellloooo.", message: "CAN YOU HEAR ME??"},
    note7={title: "And the Lord said:", message: "'Listen to S.P.U.D.'"},
     
]
var list120=[
    note1={title: "Do me a favor?", message: "Knock it off."},
    note2={title: "HEY!", message: "STOP!"},
    note3={title: "(looks at watch)", message: ":("},
    note4={title: "Wow.", message: "Your grandma would be proud."},
    note5={title: "Wow.", message: "Your mom would be proud."},
    note6={title: "Wow.", message: "I'm disapointed in you."},
    note7={title: "Listen.", message: "You've been here too long."},
    note8={title: "Listen", message: "You need to quit."},
    note9={title: "Listen", message: "You have a problem"}   
]
var list175=[
    note1={title: "(looks at watch)", message: "You're a bad person."},
    note2={title: "Trust me.", message: "You will pay for this."},
    note3={title: "You.", message: "Don't cross me."},
    note4={title: "stopstopstopstopstop", message: "stopstopstopstopstopstopstop"},
    note5={title: "Oh yeah.", message: "You're really going places huh?"},
    
]
var list240=[
    note1={title: "S.P.U.D.", message: "I will never forget this."},
    note2={title: "AHHHHHH.", message: "AHHHHHHHHHHHH!"},
    note3={title: "STOOOPPPPPP!.", message: "I HATE YOU! I HATE YOU!"},
    note4={title: "You. Will. Not.", message: "PASSSS!!!"},
    note5={title: "(maniacal laughter)", message: "(coughing) You're killing me."},
    note6={title: "*The S.P.U.D. system is rebooting:*", message: "You suck."}  
]
var listAfterFour=[
    note1={title: "Stop.", message: "Stop."},
    note2={title: "Stop.", message: "Stop."},
    note3={title: "Stop.", message: "Stop."},
    note4={title: "This won't end.", message: "I will win."} 

]


function getList(num){
    var min = 60;
    if(num==30*min){
        return list30
    }
    if(num==50*min){
        return list50
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
        return list240
    }
    if(num>240*min){
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
    if(count/60 == 240){
                var listName=getList(240*1)
                chooseNotification(listName)
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
    chooseInterval(count,30*min, 10*min);
    chooseInterval(count,50*min, 35*min);
    chooseInterval(count,85*min, 60*min);
    chooseInterval(count,120*min, 95*min);
    chooseInterval(count,175*min, 130*min);
    chooseInterval(count,240*min, 190*min);
    afterFourHours(count)
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