
function formatUrl(url){ // cleans urls to be stored 
    var finUrl = /:\/\/(www\.)?(.+?)\//;
    return url.match(finUrl)[2]; 
}

function updateList(){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
            function(tabs){
                chrome.storage.local.get(['urlList'], function(result) {
                    var url = tabs[0].url;
                    var site = formatUrl(url);
                    var favIcon = tabs[0].favIconUrl;
                    var urlList = result.urlList;
                    if(site in urlList){
                    }else{
                        urlList[site] = siteAttributes = {
                            homeUrl: url,
                            domain: site,
                            favIcon: favIcon,
                            intervalSeconds: 0,
                            totalSeconds: 0,
                            visited: 0
                            }
                        chrome.storage.local.set({"urlList": urlList}, function() {});
                    }
                });
            });
}

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
                }else{
                    
                       
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Website Added',
                        timer: 1000,
                        showConfirmButton: false // There won't be any confirm button
                      })
                }
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
                        text: "You might become a potato",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: 'lightcoral',
                        cancelButtonColor: 'lightgray',
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

document.getElementById('goSites').addEventListener('click', displaySites);
document.getElementById('add').addEventListener('click', addWebsite);
document.getElementById('remove').addEventListener('click', removeWebsite);
document.getElementById('close').addEventListener('click', closePopup);
setInterval(drawClock, 10);

function formatClock(count){
    var clock;
    var clock1;
    var clock2;
    var sec = count;
    var min = Math.floor(count/60);
    var hr = Math.floor(count/60/60);
    
    if (count < 60){
        if(count<10){
            clock1 = String("00" + "h " + "00" + "m " + "0");
            clock2 = String(sec) + "s";
            clock1 = clock1.fontcolor("lightgray")
            clock = clock1+clock2;
            
        }
        else{
            clock1 = String("00" + "h " + "00" + "m ");
            clock2 = String(sec) + "s";
            clock1 = clock1.fontcolor("lightgray")
            clock = clock1+clock2;
        }
        

    }

    if (count >= 60 && count < 3600) {
        if(count<600){
            if((sec%60)<10){
                clock1 = String("00" + "h " + "0")
                clock2 =String(min) + "m " + "0" + String(sec%60) + "s";
                clock1 = clock1.fontcolor("lightgray")
                clock = clock1+clock2;
            }
            else{
                clock1 = String("00" + "h " + "0")
                clock2 =String(min) + "m " + String(sec%60) + "s";
                clock1 = clock1.fontcolor("lightgray")
                clock = clock1+clock2;
            }
        }else{
            if((sec%60)<10){
                clock1 = String("00" + "h ")
                clock2 =String(min) + "m " + "0" + String(sec%60) + "s";
                clock1 = clock1.fontcolor("lightgray")
                clock = clock1+clock2;
            }
            else{
                clock1 = String("00" + "h ")
                clock2 =String(min) + "m " + String(sec%60) + "s";
                clock1 = clock1.fontcolor("lightgray")
                clock = clock1+clock2;
            }
        }
    }

        
    if (count >= 3600 && count< 36000) {

        if((sec%60%60<10) && (min%60<10)){
            clock1 = String("0")
            clock2 =String(hr)+ "h " + "0" + String(min%60) + "m " + "0" + String(sec%60%60) + "s";
            clock1 = clock1.fontcolor("lightgray")
            clock = clock1+clock2;
        }

        if((sec%60%60<10) && (min%60>=10)){
            clock1 = String("0")
            clock2 =String(hr)+ "h " + "0" + String(min%60) + "m " + "0" + String(sec%60%60) + "s";
            clock1 = clock1.fontcolor("lightgray")
            clock = clock1+clock2;
        }
        if((sec%60%60>=10) && (min%60<10)){
            clock1 = String("0")
            clock2 =String(hr)+ "h " + "0" + String(min%60) + "m " + "0" + String(sec%60%60) + "s";
            clock1 = clock1.fontcolor("lightgray")
            clock = clock1+clock2;
        }
        if((sec%60%60>=10) && (min%60>=10)){
            clock1 = String("0")
            clock2 =String(hr)+ "h " + "0" + String(min%60) + "m " + "0" + String(sec%60%60) + "s";
            clock1 = clock1.fontcolor("lightgray")
            clock = clock1+clock2;
        }

    }

    if (count >= 36000){

        if((sec%60%60<10) && (min%60<10)){
            clock = String ( String(hr)+ "h " + "0" + String(min%60) + "m " + "0" + String(sec%60%60) + "s");}
        if((sec%60%60<10) && (min%60>=10)){
            clock = String ( String(hr)+ "h " + String(min%60) + "m " + "0" + String(sec%60%60) + "s");
        }
        if((sec%60%60>=10) && (min%60<10)){
            clock = String ( String(hr)+ "h " + "0" + String(min%60) + "m " +  String(sec%60%60) + "s");
        }
        if((sec%60%60>=10) && (min%60>=10)){
            clock = String ( String(hr)+ "h " +  String(min%60) + "m " +  String(sec%60%60) + "s");
        }

    }

    return clock;
    
}

function drawSiteLabel(){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
    function(tabs){
        chrome.storage.local.get(['urlList'], function(result) {
            var website = formatUrl(tabs[0].url);
            var site = website;
            document.getElementById("site").innerHTML = site;
            
        });
    });
}

function drawClock(){
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
    function(tabs){
        chrome.storage.local.get(['urlList'], function(result) {
            var website = formatUrl(tabs[0].url);
            var urlList = result.urlList;
            if(typeof urlList[website] === 'undefined'){
                cleanClock();
            }else{
                var s = urlList[website].intervalSeconds;
                var clock = formatClock(s);
                document.getElementById("clock").innerHTML = clock;
            }
        });
    });  
}

function cleanClock(){
    clock = "00h 00m 00s"
    clock1 = clock.fontcolor("lightgray")
    document.getElementById('clock').innerHTML = clock1;
}

cleanClock();
drawSiteLabel();
      
function displaySites(){
    window.location.href="siteList.html";
}
function closePopup(){
    window.close();
}