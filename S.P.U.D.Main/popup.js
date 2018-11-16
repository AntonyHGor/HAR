function changeImage(){
    document.getElementById("x").src='ezgif.com-vieo-to-gif.gif'
}


function formatUrl(url){
    var strArray = url.split('/'); // formats url into prefix
    var finUrl = strArray[2];
    return finUrl
}



function addWebsite() {
    var attributeList = [0,0] // first element is timer count, second is vister count
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
    function(tabs){
        chrome.storage.local.get(['urlList'], function(result) {
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
                  })
            }else{
                urlList[site] = attributeList;
                chrome.storage.local.set({"urlList": urlList}, function() {});
                swal({
                    position: 'top-end',
                    type: 'success',
                    title: 'Website Added',
                    timer: 2000,
                  })
            }
         });
    });
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
                        title: 'To Starch tracking...',
                        text: 'first add this site',
                        timer: 2500,
                      })
                }
                }); 
    }); 
}

// function removeWebsite(){
//     swal({
//         title: 'Are you sure you want to remove this site?',
//         text: "Your procrastinating may go unchecked!",
//         type: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, remove it!'
//       }).then((result) => {
//         if (result.value) {
//             chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
//             function(tabs){
//                 chrome.storage.local.get(['urlList'], function(result) {
//                 var url = tabs[0].url;
//                 var site = formatUrl(url)
//                 var urlList = result.urlList;
//                 if(site in urlList){
//                 delete urlList[site];
//                 chrome.storage.local.set({"urlList": urlList}, function() {});
//                 swal({
//                     title: 'Tracking Disabled',
//                     text: "You're a potato.",
//                     imageUrl: './ezgif.com-video-to-gif.gif',
//                     imageWidth: 350,
//                     imageHeight: 200,
//                     imageAlt: 'Custom image',
//                     animation: false
//                     })
//                 }
//                 else{
//                     swal({
//                         position: 'top-end',
//                         type: 'error',
//                         title: 'To Starch Tracking',
//                         text: 'first add this site',
//                         timer: 2000,
//                       })
//                     }
//                 });
//             });  
//         }
//     })
// }

function displaySites(){
    var sites = []; 
    chrome.storage.local.get(['urlList'], function(result){
        var urlList = result.urlList;
        for(key in urlList){
            // var siteFav = key.favIcon;
            document.getElementById('listedSites').innerHTML += <li> + key </li>;
            console.log(key);
            // var urls = key.domain;
            // sites.push(urls);
        }      
        // window.print(sites);
        // document.getElementById('print_sites').innerHTML= sites; 
    }); 
}


document.getElementById('add').addEventListener('click', addWebsite);
document.getElementById('remove').addEventListener('click', removeWebsite);
document.getElementById('displaySites').addEventListener('click', displaySites)
displaySites();
//document.getElementById('change image').addEventListener('click', changeImage);