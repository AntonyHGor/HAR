//=================================================================================================

/* Lists of time intervals and the respective notifications for each list.*/

/* List of the notifications for the time interval between 10 to 30 minutes.*/

var list30=[
    note1={title: "Hello", message: "Just wanted to say hi."},
    note2={title: "Hi.", message: "Just checking in."},
    note3={title: "S.P.U.D.", message: "That's my name."},
    note4={title: "So...", message: "What's up with this weather huh?."},
    note5={title: "So...", message: "I never know what to say in these situations."},
    note6={title: "Howdy.", message: "That was me, as a cowboy."},
    note7={title: "What is made when it rains potatoes?", message: "Spuddles."}, 
    note8={title: "Where are you?", message: "There you are."}
]


/* List of the notifications for the time interval between 35 to 50 minutes.*/

var list50=[
    note1={title: "Hi.", message: "You should stop."},
    note2={title: "(looks at watch)", message: "Been awhile now, yeah?"},
    note3={title: "Hey.", message: "Might be time for a break."},
    note5={title: "Hi.", message: "You should stop."},
    note6={title: "Hi.", message: "You should take a break."},
    note7={title: "And the Lord said:", message: "'Listen to S.P.U.D.'"},
    note8={title: "Looks like you're on a roll", message: "Maybe roll into a full stop"},
     
]


/* List of the notifications for the time interval between 1 hour to 1 hour and 25 minutes.*/

var list85=[
    note1={title: "Stop.", message: "STOP."},
    note2={title: "(looks at watch)", message: "Please stop."},
    note4={title: "Researchers say:", message: "Those who listen to S.P.U.D. are good people."},
    note3={title: "Hey.", message: "It's time for a break."},
    note4={title: ":(", message: "You really hate to listen don't you."},
    note5={title: "Hm.", message: "You have trouble listening don't you?"},
    note6={title: "Hellloooo.", message: "CAN YOU HEAR ME??"},
    note7={title: "And the Lord said:", message: "'Listen to S.P.U.D.'"},
     
]


/* List of the notifications for the time interval between 1 hour and 35 minutes to 2 hours.*/

var list120=[
    note1={title: "Do me a favor?", message: "Knock it off."},
    note2={title: "HEY!", message: "STOP!"},
    note3={title: "(looks at watch)", message: ":("},
    note4={title: "Wow.", message: "Your grandma would be proud."},
    note5={title: "Wow.", message: "Your mom would be proud."},
    note6={title: "Wow.", message: "I'm disapointed in you."},
    note7={title: "Listen.", message: "You've been here too long."},
    note8={title: "Listen", message: "You need to quit."},
    note9={title: "Listen", message: "You have a problem"},  
    note10={title: "Well", message: "You have evolved into a literal POTATO"}, 
]


/* List of the notifications for the time interval between 2 hours and 10 minutes to 2 hours and 55 minutes.*/

var list175=[
    note1={title: "(looks at watch)", message: "You're a bad person."},
    note2={title: "Trust me.", message: "You will pay for this."},
    note3={title: "You.", message: "Don't cross me."},
    note4={title: "stopstopstopstopstop", message: "stopstopstopstopstopstopstop"},
    note5={title: "Oh yeah.", message: "You're really going places huh?"},
    
]


/* List of the notifications for the time interval between 3 hours and 10 minutes to 4 hours.*/

var list240=[
    note1={title: "S.P.U.D.", message: "I will never forget this."},
    note2={title: "AHHHHHH.", message: "AHHHHHHHHHHHH!"},
    note3={title: "STOOOPPPPPP!.", message: "I HATE YOU! I HATE YOU!"},
    note4={title: "You. Will. Not.", message: "PASSSS!!!"},
    note5={title: "(maniacal laughter)", message: "(coughing) You're killing me."},
    note6={title: "*The S.P.U.D. system is rebooting:*", message: "You suck."}  
]


/* List of the notifications for the time interval after 4 hours.*/

var listAfterFour=[
    note1={title: "Stop.", message: "Stop."},
    note2={title: "Stop.", message: "Stop."},
    note3={title: "Stop.", message: "Stop."},
    note4={title: "This won't end.", message: "I will win."} 

]


//=================================================================================================


/* It takes in the number of minutes and based on that number it dictates the list that it
   should return. */

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



/* Fun function which shows the following notification on national potato day. */

function potatoDay(){
    var month = new Date().getMonth();
    var date = new Date().getDate();
    if(month == 8 && date == 19){
        var message = makeBasicNote("Happy National Potato Day!", "(pops streamer)")
        notify(message);
    }
}




/* This function checks for the first time the user installed the extension or when they
   update the extension and returns the following notifications. */

function checkInstall(){
    chrome.runtime.onInstalled.addListener(function(details){
        if(details.reason == "install"){
            message = makeBasicNote("I'M ALIVE!", "Thanks for installing me. :)");
            notify(message);
            console.log("This is a first install!");
            // preLoad();
        }else if(details.reason == "update"){
            var message = makeBasicNote("Hey there!", "I am new and improved!");
            notify(message);
        }
    });
}


/* This function chooses a random notification from a specific list and then
   notifies the user. */

function chooseNotification(list){
    var randomNum=generateRandomNumber(list.length)
    var randomKey=list[randomNum]
    
    var notification=makeBasicNote(randomKey.title, randomKey.message)
    
    notify(notification)
}


/* This function creates a notification which will be displayed to the user. */

function notify(message){
    chrome.notifications.create(null, message, null)
}



/* This function generates and returns a random number. */

function generateRandomNumber(max){
    return Math.floor(Math.random()*Math.floor(max)+1)
}


/* This function creates a notification with a title and a message and then returns it. */

function makeBasicNote(title, message){
    var note = {
        type: "basic",
        title: title,
        message: message,
        iconUrl: "icon_128.png"
    }
    return note
}




/* This function takes care of the notifications that the user will reveice after
   the threshhold of four hours. After four hours every 15 minutes the user will 
   receive a notification. */

function afterFourHours(count){
    if(count/60 > 240 && (count/60)%15==0){
                var listName=getList(241*60)
                chooseNotification(listName)
            }
            
        }
  

/* This is the algorithm which chooses the interval and generates a number based on how many seconds that 
are in the interval and returns and notifies the user with a random notification. */

var notified = false; //this is initialized as false because the user in not yet notified.

function chooseInterval(count,highNum, lowNum){
    if(count === lowNum){
        notified = false;
    }
        if (notified == false){

            if(count<=highNum && count>=lowNum){
                var inter = highNum-count; //this variable is equal to the minutes in the time interval
                var randomNum=generateRandomNumber(inter);//random number is generated based on the inter variable

                    if(randomNum==inter){
                        var listName=getList(highNum)
                        chooseNotification(listName)
                        notified = true; //if the user is notified this  variable becomes true and the algorithm does not run in this time interval anymore
                    }else{
                        inter -= 1; //if the user is not notified then each minute the probabality of getting a notification increases
                        
                    }
                    
                }
        }
}

/* This is the main notification function which takes cares of the calls for each specific interval*/

function mainNotification(count){
    var min= 60

    chooseInterval(count,30*min, 10*min);
    chooseInterval(count,50*min, 35*min);
    chooseInterval(count,85*min, 60*min);
    chooseInterval(count,120*min, 95*min);
    chooseInterval(count,175*min, 130*min);
    chooseInterval(count,240*min, 190*min);
    afterFourHours(count)
}

checkInstall();
