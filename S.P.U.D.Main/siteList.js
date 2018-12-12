
function popList(){
    chrome.storage.local.get(['urlList'], function(result) {
        for (var key in result.urlList) {
            addDiv(result.urlList[key]);
        }
    });
}

var today = true;
function switchTimeView(){
    // chrome.storage.local.get(['urlList'], function(result) {
    // var listContainer = document.getElementById("listContainer");
    // for(var elem = 0; elem < listContainer.children.length; elem++){
    //     var siteBlock = listContainer.children[elem]
    //     // console.log(siteBlock);
    //     var siteObj = result.urlList[siteBlock.children[1].children[0].textContent];
    //     // console.log(siteObj);

    //     if(today === true){
    //         var timeBlock = document.createElement('div');
    //         var s = siteObj.intervalSeconds;
    //         // console.log("showing total")
    //         var time = document.createElement('div');
    //         time.innerHTML = formatClock(s);
    //         time.classList.add("time");
    //         timeBlock.setAttribute('id',"timeBlock");
    //         timeBlock.classList.add("timeBlock");
    //         siteBlock.children[2] = timeBlock;
    //     }else if(today === false){
    //         timeBlock = document.createElement('div');
    //         var s = siteObj.totalSeconds;
    //         // console.log("showing interval")
    //         var time = document.createElement('div');
    //         time.innerHTML = formatClock(s);
    //         time.classList.add("time");
    //         timeBlock.setAttribute('id',"timeBlock");
    //         timeBlock.classList.add("timeBlock");
    //         siteBlock.children[2] = timeBlock;
    //     }
    //     }
        if(today===true){
            document.getElementById("switch").innerText = 'All-time'
            today = false;
        }else if(today===false){
            document.getElementById("switch").innerText = 'Today'
            today = true;
        }
    // });
}

function addDiv(siteObj){
    var siteBlock;
    var containerBlock;
    var iconBlock;
    var nameBlock;
    var timeBlock;
      
    siteBlock = document.createElement('div');
    siteBlock.classList.add("siteBlock");
    siteBlock.setAttribute('id',"siteBlock")

    nameBlock = document.createElement('div');
    var name = document.createElement('div');
    name.innerText = siteObj.domain;
    name.setAttribute('id',"name");
    name.classList.add("name");
    nameBlock.setAttribute('id',"nameBlock");
    nameBlock.classList.add("nameBlock");

    iconBlock = document.createElement('div');
    var favIconUrl = siteObj.favIcon;
    var icon = document.createElement('IMG');
    icon.classList.add("icon");
    icon.setAttribute("src", favIconUrl);
    icon.setAttribute("width", "25");
    icon.setAttribute("height", "25");
    iconBlock.classList.add("iconBlock");

    
    timeBlock = document.createElement('div');
    var s = siteObj.intervalSeconds;
    var time = document.createElement('div');
    time.innerHTML = formatClock(s);
    time.classList.add("time");
    timeBlock.setAttribute('id',"timeBlock");
    timeBlock.classList.add("timeBlock");

    var remove = document.createElement('div');
    remove.setAttribute('id',"remove");
    remove.classList.add("remove");
    remove.innerHTML = "x";
    remove.onclick = e => {
        removeSite(e.target);
    } 
    // remove.onclick = removeSite(this);

     
    containerBlock = document.getElementById( 'listContainer' );
    containerBlock.appendChild(siteBlock);
    siteBlock.appendChild(iconBlock);
    siteBlock.appendChild(nameBlock);
    siteBlock.appendChild(timeBlock);
    siteBlock.appendChild(remove);
    iconBlock.appendChild(icon);
    nameBlock.appendChild(name);
    timeBlock.appendChild(time);
    
    
    }

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

function goHome(){
    window.location.href="popup2-0.html";
}
function closePopup(){
    window.close();
}
function removeSite(elem){
    chrome.storage.local.get(['urlList'], function(result) {
        var urlList = result.urlList;
        var name = elem.parentElement.children[1].children[0].textContent; 
        if(name in urlList){
            swal({
                title: 'Do you really want SPUD to stop watching?',
                text: "You might become a potato.",
                type: 'warning',
                dangerMode: true,
                className: "swal-button",
                showCancelButton: true,
                focusCancel:true,
                confirmButtonColor: 'lightcoral',
                cancelButtonColor: 'lightgray',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.value) {
                    delete urlList[name];
                    chrome.storage.local.set({"urlList": urlList}, function() {});
                    swal({
                        title: 'SPUD stopped monitoring ' + name,
                        text: "You're a potato.",
                        className: "swal-button",
                        confirmButtonColor: 'lightcoral',
                        imageUrl: './ezgif.com-video-to-gif.gif',
                        imageWidth: 350,
                        imageHeight: 200,
                        imageAlt: 'Custom image',
                    })
                    elem.parentElement.parentElement.removeChild(elem.parentElement);
                    
                    if(Object.keys(urlList).length == 0){ // this happens to remove today button on empty list
                        displaySites();
                    }
                }
            })
        }
    });
}
function displaySites(){
    window.location.href="siteList.html";
}

function showTodayButton(){
    chrome.storage.local.get(['urlList'], function(result) {
        if(typeof result.urlList === 'undefined'){
            document.getElementById('switch').style.display = "none";
        }else if(Object.keys(result.urlList).length == 0){
        document.getElementById('switch').style.display = "none";
        }
        
    });
}
function updateTimer(){
    chrome.storage.local.get(['urlList'], function(result) {
    for(var elem = 0; elem < listContainer.children.length; elem++){
        var siteBlock = listContainer.children[elem]
        // console.log(siteBlock);
        var siteObj = result.urlList[siteBlock.children[1].children[0].textContent];
        if(today === true){
            var s = siteObj.intervalSeconds;
            var time = formatClock(s);
            siteBlock.children[2].children[0].innerHTML = time;
        }else if(today === false){
            var s = siteObj.totalSeconds;
            var time = formatClock(s);
            siteBlock.children[2].children[0].innerHTML = time;
        }

        // console.log(siteObj);
    }
});
}

document.getElementById('goHome').addEventListener('click', goHome);
document.getElementById('close').addEventListener('click', closePopup);
document.getElementById('switch').addEventListener('click', switchTimeView);

popList();
showTodayButton();
setInterval(updateTimer,10);
