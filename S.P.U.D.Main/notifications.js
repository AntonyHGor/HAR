
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

function checkMinute(count, site){
    var min= 60
    if(count<=min){
        var num=generateRandomNumber(min)
        if(num==min){
            timeNote = makeBasicNote("OMG.", "You've spent " + count +  " seconds on " + site + ".");
            notify(timeNote)
        }
    }

}