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
            }else{
                urlList[site] = attributeList;
                chrome.storage.local.set({"urlList": urlList}, function() {});
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
      document.getElementById("x").src='ezgif.com-vieo-to-gif.gif'
}

function removeWebsite(){
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

            chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
            function(tabs){
                chrome.storage.local.get(['urlList'], function(result) {
                var url = tabs[0].url;
                var site = formatUrl(url);
                var urlList = result.urlList;
                delete urlList[site];
                chrome.storage.local.set({"urlList": urlList}, function() {});
    
         });
    });
            swal({
                title: 'Tracking Disabled',
                text: "You're a potato.",
                imageUrl: './ezgif.com-video-to-gif.gif',
                imageWidth: 350,
                imageHeight: 200,
                imageAlt: 'Custom image',
                animation: false
            })
        }
    })
}

document.getElementById('add').addEventListener('click', addWebsite);
document.getElementById('remove').addEventListener('click', removeWebsite);
//document.getElementById('change image').addEventListener('click', changeImage);
  // "content_scripts": 
  //   {
  //     "js":["sweetalert2.all.min.js"]
  //   },
