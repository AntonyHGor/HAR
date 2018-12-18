//=================================================================================================

/* This function formats the URL so that it still times if after you go into sub-pages as long
as the main URL between "www." and ".com" is the same. */

function formatUrl(url){ // cleans urls to be stored 
    var finUrl = /:\/\/(www\.)?(.+?)\//;
    return url.match(finUrl)[2]; 
}


/* This function generates and returns a random number. */

function generateRandomNumber(max){
    return Math.floor(Math.random()*Math.floor(max)+1)
}



/* This function shows a real image of a potato instead of the SPUD icon (as a joke) . */

function showRealPotato(num){
    var range = generateRandomNumber(num);
    var potato = document.getElementById('potato image')
    if (num == range){
        potato.setAttribute("src", "realpotato.png");
    }
    else{
        potato.setAttribute("src", "large.png")
    }
}


/* This function updates the dictionary which holds all the website that the extension times */

function updateList(){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, // getting current tab 
            function(tabs){
                chrome.storage.local.get(['urlList'], function(result) { // getting saved data
                    var url = tabs[0].url; // url of current tab
                    var site = formatUrl(url);  // formatted 
                    var favIcon = tabs[0].favIconUrl; // favIcon for url
                    var urlList = result.urlList; 
                    if(site in urlList){
                    }else{ // if this site is not in the list
                        urlList[site] = siteAttributes = { // create entry with the following attributes
                            homeUrl: url,
                            domain: site,
                            favIcon: favIcon,
                            intervalSeconds: 0,
                            totalSeconds: 0,
                            visited: 0
                            }
                        chrome.storage.local.set({"urlList": urlList}, function() {}); // save to local storage
                    }
                });
            });
}



/* This function will add the website that the user is currently on to the dictionary of websites to be timed. If 
it was not on the dictionary previously it will just add it normally and then show the "Website Added" alert. However, if it
is already in it, it will not added it into the dictionary and show the "Looks like this site is already added" alert. */

function addWebsite() {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
    function(tabs){
        chrome.storage.local.get(['urlList'], function(result) {
            if(typeof result.urlList === 'undefined'){ // Initializes the dictionary and saves it if no sites are in list
                var urlList = {};
                chrome.storage.local.set({"urlList": urlList}, function() {}); 
                updateList();
        
            }else{
                updateList();
                var url = tabs[0].url;
                var site = formatUrl(url);
                var urlList = result.urlList;
                if(site in urlList){
                    swal({
                        position: 'top-end',
                        type: 'error',
                        title: 'Dirt...',
                        text: 'Looks like this site is already added',
                        timer: 2000,
                        showConfirmButton: false // There won't be any confirm button
                      })
                }else{}
            }
          
         });
    });
    swal({
        position: 'top-end',
        showConfirmButton: false, // There won't be any confirm button
        type: 'success',
        title: 'Website Added',
        timer: 1000,
      })
}


/* This function will remove the website that the user is currently on from the dictionary of websites to be timed. If 
it was on the dictionary previously it will just remove it normally and then show the "Do you really want SPUD to stop watching?" alert.
 However, if it is not in the dictionary it will not added it will show the "First add this site" alert. */


function removeWebsite(){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
            function(tabs){
                chrome.storage.local.get(['urlList'], function(result) {
                var url = tabs[0].url;
                var site = formatUrl(url)
                var urlList = result.urlList;
                if(site in urlList){
                    swal({
                        title: 'Do you really want SPUD to stop watching?',
                        text: "You might become a potato.",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: 'lightcoral',
                        cancelButtonColor: 'lightgray',
                        focusCancel:true,
                        confirmButtonText: 'Yes'
                    }).then((result) => {
                        if (result.value) {
                            delete urlList[site];
                            chrome.storage.local.set({"urlList": urlList}, function() {});
                            swal({
                                title: 'SPUD stopped monitoring ' + site,
                                text: "You're a potato.",
                                confirmButtonColor: 'lightcoral',
                                imageUrl: './ezgif.com-video-to-gif.gif',
                                imageWidth: 350,
                                imageHeight: 200,
                                imageAlt: 'Custom image',
                            })
                        }
                    })
                }
                else{
                    swal({
                        position: 'top-end',
                        type: 'error',
                        title: 'To Starch Tracking...',
                        text: 'First add this site',
                        timer: 2000,
                        showConfirmButton: false // There won't be any confirm button
                      })
                }
                }); 
    }); 
}

/* Creates button listeners for the popup. */

document.getElementById('goSites').addEventListener('click', displaySites);
document.getElementById('add').addEventListener('click', addWebsite);
document.getElementById('remove').addEventListener('click', removeWebsite);
document.getElementById('close').addEventListener('click', closePopup);

setInterval(drawClock, 10); // update timer every ten milliseconds

/* This function takes care of the formating of the clock inside the popup. */

function formatClock(count){
    var clock;
    var clock1;
    var clock2;
    var sec = count;
    var min = Math.floor(count/60);
    var hr = Math.floor(count/60/60);
    
    if (count < 60){ // if there are less than 60 seconds
       
        if(count<10){                                       // if there are less than 10 seconds
            clock1 = String("00" + "h " + "00" + "m " + "0");
            clock2 = String(sec) + "s";
            clock1 = clock1.fontcolor("lightgray")
            clock = clock1+clock2;
            
        }
        else{                                               // if there are more or equal to 10 seconds
            clock1 = String("00" + "h " + "00" + "m ");
            clock2 = String(sec) + "s";
            clock1 = clock1.fontcolor("lightgray")
            clock = clock1+clock2;
        }
        

    }

    if (count >= 60 && count < 3600) { // if time is between 1 minute and 1 hour
       
        if(count<600){ // if there are less than 10 minutes

            if((sec%60)<10){                                            // if there are less than 10 seconds
                clock1 = String("00" + "h " + "0")
                clock2 =String(min) + "m " + "0" + String(sec%60) + "s";
                clock1 = clock1.fontcolor("lightgray")
                clock = clock1+clock2;
            }
            else{                                                      // if there are more or equal to 10 seconds
                clock1 = String("00" + "h " + "0")
                clock2 =String(min) + "m " + String(sec%60) + "s";
                clock1 = clock1.fontcolor("lightgray")
                clock = clock1+clock2;
            }


        }else{  // if there are more or equal to 10 minutes
            
            if((sec%60)<10){                                            // if there are less than 10 seconds
                clock1 = String("00" + "h ")
                clock2 =String(min) + "m " + "0" + String(sec%60) + "s";
                clock1 = clock1.fontcolor("lightgray")
                clock = clock1+clock2;
            }
            else{                                                       // if there are more or equal to 10 seconds
                clock1 = String("00" + "h ")
                clock2 =String(min) + "m " + String(sec%60) + "s";
                clock1 = clock1.fontcolor("lightgray")
                clock = clock1+clock2;
            }
        }
    }

    if (count >= 3600 && count< 36000) { // if time is between 1 hour and 10 hours

        if((sec%60%60<10) && (min%60<10)){ // if there are less than 10 seconds and less than 10 minutes
            clock1 = String("0")
            clock2 =String(hr)+ "h " + "0" + String(min%60) + "m " + "0" + String(sec%60%60) + "s";
            clock1 = clock1.fontcolor("lightgray")
            clock = clock1+clock2;
        }

        if((sec%60%60<10) && (min%60>=10)){ // if there are less than 10 seconds and more or equal to 10 minutes
            clock1 = String("0")
            clock2 =String(hr)+ "h " + "0" + String(min%60) + "m "  + String(sec%60%60) + "s";
            clock1 = clock1.fontcolor("lightgray")
            clock = clock1+clock2;
        }
        if((sec%60%60>=10) && (min%60<10)){ // if there are more or equal to 10 seconds and less than 10 minutes
            clock1 = String("0")
            clock2 =String(hr)+ "h " + String(min%60) + "m " + "0" + String(sec%60%60) + "s";
            clock1 = clock1.fontcolor("lightgray")
            clock = clock1+clock2;
        }
        if((sec%60%60>=10) && (min%60>=10)){ // if there are more or equal to 10 seconds and more or equal to 10 minutes
            clock1 = String("0")
            clock2 =String(hr)+ "h " + String(min%60) + "m " + String(sec%60%60) + "s";
            clock1 = clock1.fontcolor("lightgray")
            clock = clock1+clock2;
        }

    }

    if (count >= 36000){ // if time is more than 10 hours

        if((sec%60%60<10) && (min%60<10)){ // if there are less than 10 seconds and less than 10 minutes

            clock = String ( String(hr)+ "h " + "0" + String(min%60) + "m " + "0" + String(sec%60%60) + "s");}

        if((sec%60%60<10) && (min%60>=10)){ // if there are less than 10 seconds and more or equal to 10 minutes

            clock = String ( String(hr)+ "h " + String(min%60) + "m " + "0" + String(sec%60%60) + "s");
        }
        if((sec%60%60>=10) && (min%60<10)){ // if there are more or equal to 10 seconds and less than 10 minutes

            clock = String ( String(hr)+ "h " + "0" + String(min%60) + "m " +  String(sec%60%60) + "s");
        }
        if((sec%60%60>=10) && (min%60>=10)){ // if there are more or equal to 10 seconds and more or equal to 10 minutes

            clock = String ( String(hr)+ "h " +  String(min%60) + "m " +  String(sec%60%60) + "s");
        }

    }

    return clock;
    

}

/* This function takes care of inputing the current site name on the popup. */

function drawSiteLabel(){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
    function(tabs){
        chrome.storage.local.get(['urlList'], function(result) {
            try{
                var website = formatUrl(tabs[0].url);
                var site = website;
                document.getElementById("site").innerHTML = site;
            }catch{}
        });
    });
}

/* This function takes care of drawing the clock on the popup. This is run every 10 milliseconds */

function drawClock(){
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
    function(tabs){
        chrome.storage.local.get(['urlList'], function(result) {
            try{
                var website = formatUrl(tabs[0].url);
                var urlList = result.urlList;
                if(typeof urlList[website] === 'undefined'){
                    cleanClock();
                }else{
                    var s = urlList[website].intervalSeconds; //gets the interval seconds for the current site in storage
                    var clock = formatClock(s);
                    document.getElementById("clock").innerHTML = clock; // presents it
                }
            }catch{}
        });
    });  
}

/* This function takes care of reseting the clock. */

function cleanClock(){
    clock = "00h 00m 00s"
    clock1 = clock.fontcolor("lightgray")
    document.getElementById('clock').innerHTML = clock1;
}

//=================================================================================================

/* Function calls */

cleanClock();
drawSiteLabel();
showRealPotato(60);

//=================================================================================================
      
/* This function sends the user to the site lists if clicked. */

function displaySites(){
    window.location.href="siteList.html";
}

/* This function closes the popup. */

function closePopup(){
    window.close();
}
