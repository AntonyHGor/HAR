
function notify(message){
    chrome.notifications.create(null, message, null)
}





// Generates random number

function generateRandomNumber(max){
    return Math.floor(Math.random()*Math.floor(max)+1)
}



function checkMinute(count, site){
    var min= 60
    if(count<=min){
        var num=generateRandomNumber(min)
        if(num==min){
            defaultTimeNote2 = {
                type: "basic",
                title: "OMG. ",
                message: "You've spent " + count +  " seconds on " + site + ".",
                iconUrl: "icon_128.png"
            
            }
            notify(defaultTimeNote2)
        }
    }

}