list1={defaultTimeNote = {
    type: "basic",
    title: "Wow. ",
    message: "You've spent " + count +  " seconds on " + site + ". Your grandma would be proud.",
    iconUrl: "icon_128.png"
  }, 
  
  defaultTimeNote2 = {
    type: "basic",
    title: "OMG. ",
    message: "You've spent " + count +  " seconds on " + site + ". Your grandma would be proud.",
    iconUrl: "icon_128.png"
  }, 

}


function notify(message){
    chrome.notifications.create(null, message, null)
}



defaultTimeNote2 = {
    type: "basic",
    title: "OMG. ",
    message: "You've spent " + count +  " seconds on " + site + ". Your grandma would be proud.",
    iconUrl: "icon_128.png"

}

// Generates random number

function generateRandomNumber(max){
    return Math.floor(Math.random()*Math.floor(max))
}



function checkMinute(count, site){
    var min= 60
    if(count<=min){
        var num=generateRandomNumber(min)
        if(num==min){
            notify(defaultTimeNote2)
        }
    }

}