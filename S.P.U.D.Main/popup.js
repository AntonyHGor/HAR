// import swal from 'sweetalert';

//var urlList = {'www.youtube.com': 0, 'waitbutwhy.com': 0};


function formatUrl(url){
    var strArray = url.split('/'); // formats url into prefix
    var finUrl = strArray[2];
    return finUrl
}


function addWebsite() {
    // alert("website added");
    var txt;
    if (confirm("add this website?")){
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
    function(tabs){
        chrome.storage.sync.get(['urlList'], function(result) {
            var url = tabs[0].url;
            var site = formatUrl(url);
            var urlList = result.urlList;
            urlList[site] = 0;
            chrome.storage.sync.set({"urlList": urlList}, function() {});
        
        });
        });
        txt = "Website Added"
    }else{
        txt = "Website Not Added"
    }
        document.getElementById("demo").innerHTML = txt
    
    // document.getElementById("demo").innerHTML="We will write js code to add a website";
}
 
function closeAlert(){
    document.getElementsByClassName('green alert').this.parentElement.style.display='none';
}
document.getElementById('add').addEventListener('click', addWebsite);
//document.getElementsByClassName('green alert').addEventListener('click', closeAlert)