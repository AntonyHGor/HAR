function changeImage(){
    document.getElementById("x").src='ezgif.com-vieo-to-gif.gif'
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
                        title: 'Are you sure you want to remove this site?',
                        text: "Your procrastinating may go unchecked!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, remove it!'
                    }).then((result) => {
                        if (result.value) {
                            delete urlList[site];
                            chrome.storage.local.set({"urlList": urlList}, function() {});
                            swal({
                                title: 'Tracking Disabled',
                                text: "You're a potato.",
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

// function formatTimer(count){
//     var sec;
//     var min;
//     var hr;
    
//     if (count < 60){
//         sec = count;
//     }
//     if (count >= 60 && count < 3600) {
//         min = Math.floor(count/60);
//         sec = count%60;
//     }
//     if (count >= 3600) {
//         hr = Math.floor(count/60/60);
//         min = Math.floor(count%60);
//         sec = count/60%60;
//     }

//     return h + ":" + min + ":" + sec;
// }

document.getElementById('add').addEventListener('click', addWebsite);
document.getElementById('remove').addEventListener('click', removeWebsite);

chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
    function(tabs){
        chrome.storage.local.get(['urlList'], function(result) {
            var website = formatUrl(tabs[0].url);
            var site = "you are on: " + website;
            // var urlList = result.urlList;
            // var s = urlList[website].intervalSeconds;
            // var clock = formatTimer(s);
            // document.getElementById("clock").innerHTML = clock;
            document.getElementById("site").innerHTML = site;
        });
});

            
// function displaySites(){
//     var sites = []; 
//     chrome.storage.local.get(['urlList'], function(result){
//         var urlList = result.urlList;
//         for(key in urlList){
//             // var siteFav = key.favIcon;
//             document.getElementById('listedSites').innerHTML += <li> + key </li>;
//             console.log(key);
//             // var urls = key.domain;
//             // sites.push(urls);
//         }      
//         // window.print(sites);
//         // document.getElementById('print_sites').innerHTML= sites; 
//     }); 
// }

// document.getElementById('displaySites').addEventListener('click', displaySites)
// displaySites();

//   chrome.storage.local.get(['urlList'], function(result) {
//     for (var key in result.urlList) {
//         var siteIcon = key.favIcon;
//         var siteName = key.domain;
//     }
//     document.getElementById('site-list').innerHTML += '<li>' + key + '</li>';
// });

    
