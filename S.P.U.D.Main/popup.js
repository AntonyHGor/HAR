function changeImage(){
    document.getElementById("x").src='ezgif.com-vieo-to-gif.gif';
}

function randomGif(){
    var gifList = [];
}

function formatUrl(url){
    var finUrl = /:\/\/(www\.)?(.+?)\//;
    return url.match(finUrl)[2]; 
}

function updateList(){
    // var attributeList = [0,0] // first element is timer count, second is vister count  
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
                        delay: .5,
                        width: '95%',
                        font: '9px',
                        position: 'top-end',
                        type: 'error',
                        title: 'Dirt...',
                        text: 'Looks like this site is already added',
                        timer: 2000,
                        showConfirmButton: false // There won't be any confirm button
                      })
                }else{
                    swal({
                        delay: .5,
                        width: '95%',
                        font: '9px',
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
        delay: .5,
        width: '95%',
        font: '9px',
        position: 'top-end',
        showConfirmButton: false, // There won't be any confirm button
        type: 'success',
        title: 'Website Added',
        timer: 1000,
      })
    //   document.getElementById("x").src='ezgif.com-vieo-to-gif.gif'
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
                        delay: .5,
                        width: '95%',
                        font: '9px', 
                        title: 'Are you sure you want to remove this site?',
                        text: "Your procrastinating may go unchecked!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: 'lightgreen',
                        cancelButtonColor: 'lightcoral',
                        confirmButtonText: 'Yes, remove it!'
                    }).then((result) => {
                        if (result.value) {
                            delete urlList[site];
                            chrome.storage.local.set({"urlList": urlList}, function() {});
                            swal({
                                delay: .5,
                                width: '95%',
                                font: '9px',
                                title: 'Tracking Disabled',
                                text: "You're a potato.",
                                imageUrl: './ezgif.com-video-to-gif.gif',
                                imageWidth: 350,
                                imageHeight: 200,
                                imageAlt: 'Custom image',
                                timer: 2500,
                                showConfirmButton: false, 
                            })
                        }
                    })
                }
                else{
                    swal({
                        delay: .5,
                        width: '95%',
                        font: '9px',
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

document.getElementById('displaySites').addEventListener('click', displaySites);
document.getElementById('add').addEventListener('click', addWebsite);
document.getElementById('remove').addEventListener('click', removeWebsite);
document.getElementById('closeButton').addEventListener('click', closeWindow);
setInterval(drawClock, 10);

function formatClock(count){
    var clock;
    var sec = count;
    var min = Math.floor(count/60);
    var hr = Math.floor(count/60/60);
    
    if (count < 60){
        if(count<10){
            clock = String("00" + "h " + "00" + "m " + "0"+ String(sec) + "s");
        }
        else{
            clock = String("00" + "h " + "00" + "m " + String(sec) + "s");
        }
    }

    if (count >= 60 && count < 3600) {
        if(count<600){
            if((sec%60)<10){
                clock = String("00" + "h " + "0" + String(min) + "m " + "0" + String(sec%60) + "s");
            }
            else{
                clock = String("00" + "h " + "0" + String(min) + "m " + String(sec%60) + "s");
            }
        }else{
            if((sec%60)<10){
                clock = String("00" + "h " + String(min) + "m " + "0" + String(sec%60) + "s");
            }
            else{
                clock = String("00" + "h " + String(min) + "m " + String(sec%60) + "s");
            }
        }
    }
        
    if (count >= 3600 && count< 36000) {
        if((sec%60%60<10) && (min%60<10)){
            clock = String ("0"+ String(hr)+ "h " + "0" + String(min%60) + "m " + "0" + String(sec%60%60) + "s");
        }
        if((sec%60%60<10) && (min%60>=10)){
            clock = String ("0"+ String(hr)+ "h " +  String(min%60) + "m " + "0" +String(sec%60%60) + "s");
        }
        if((sec%60%60>=10) && (min%60<10)){
            clock = String ("0"+ String(hr)+ "h " +  "0" + String(min%60) + "m " + String(sec%60%60) + "s");
        }
        if((sec%60%60>=10) && (min%60>=10)){
            clock = String ("0"+ String(hr)+ "h " +  String(min%60) + "m " +  String(sec%60%60) + "s");
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
            var site = "you are on: " + website;
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
// function addDiv(siteObj){
// var block_to_insert ;
// var container_block ;
 
// block_to_insert = document.createElement( 'div' );
// block_to_insert.innerHTML = siteObj ;
 
// container_block = document.getElementById( 'listContainer' );
// container_block.appendChild( block_to_insert );

            
// function displaySites(){
//     window.location.href="siteList.html";
// }


cleanClock();
drawSiteLabel();
      
function displaySites(){
    window.location.href="siteList.html";
}

//   chrome.storage.local.get(['urlList'], function(result) {
//     for (var key in result.urlList) {
//         var siteIcon = key.favIcon;
//         var siteName = key.domain;
//         addDiv(key);
//     }
// });

function closeWindow(){
    window.close(); 
}