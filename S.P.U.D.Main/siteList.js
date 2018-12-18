// Controls the functions for the siteList.html


// For each added site, makes a block in the html
function popList(){
    chrome.storage.local.get(['urlList'], function(result) {
        for (var key in result.urlList) {
            addDiv(result.urlList[key]);
        }
    });
}
// determines if the today view or the all-time view should be shown 
var today = true;
function switchTimeView(){
        if(today===true){
            document.getElementById("switch").innerText = 'All-time'
            today = false;
        }else if(today===false){
            document.getElementById("switch").innerText = 'Today'
            today = true;
        }
}
// creates the necassaary html to organize the data for the site list
function addDiv(siteObj){
    var siteBlock;
    var containerBlock;
    var iconBlock;
    var nameBlock;
    var timeBlock;
      
    // creates container
    siteBlock = document.createElement('div');
    siteBlock.classList.add("siteBlock");
    siteBlock.setAttribute('id',"siteBlock")

    // creates name
    nameBlock = document.createElement('div');
    var name = document.createElement('div');
    name.innerText = siteObj.domain;
    name.setAttribute('id',"name");
    name.classList.add("name");
    nameBlock.setAttribute('id',"nameBlock");
    nameBlock.classList.add("nameBlock");

    // creates icon
    iconBlock = document.createElement('div');
    var favIconUrl = siteObj.favIcon;
    var icon = document.createElement('IMG');
    icon.classList.add("icon");
    icon.setAttribute("src", favIconUrl);
    icon.setAttribute("width", "25");
    icon.setAttribute("height", "25");
    iconBlock.classList.add("iconBlock");

    // creates timer
    timeBlock = document.createElement('div');
    var s = siteObj.intervalSeconds;
    var time = document.createElement('div');
    time.innerHTML = formatClock(s);
    time.classList.add("time");
    timeBlock.setAttribute('id',"timeBlock");
    timeBlock.classList.add("timeBlock");

    //removes the block when the x is pressed
    var remove = document.createElement('div');
    remove.setAttribute('id',"remove");
    remove.classList.add("remove");
    remove.innerHTML = "x";
    remove.onclick = e => {
    removeSite(e.target);
    } 
    
    //creates the entire list and adds the site to it
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
// formats the timer
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
                clock2 =String(hr)+ "h " + "0" + String(min%60) + "m "  + String(sec%60%60) + "s";
                clock1 = clock1.fontcolor("lightgray")
                clock = clock1+clock2;
            }
            if((sec%60%60>=10) && (min%60<10)){
                clock1 = String("0")
                clock2 =String(hr)+ "h " + String(min%60) + "m " + "0" + String(sec%60%60) + "s";
                clock1 = clock1.fontcolor("lightgray")
                clock = clock1+clock2;
            }
            if((sec%60%60>=10) && (min%60>=10)){
                clock1 = String("0")
                clock2 =String(hr)+ "h " + String(min%60) + "m " + String(sec%60%60) + "s";
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
// sends the user to the home page
function goHome(){
    window.location.href="popup.html";
}
// closes the popup
function closePopup(){
    window.close();
}
//removes the site from the storage (needs to be copied from popup.js because there are slight syntax differences that are neccasary)
function removeSite(elem){
    chrome.storage.local.get(['urlList'], function(result) {
        var urlList = result.urlList;
        var name = elem.parentElement.children[1].children[0].textContent; 
        if(name in urlList){ // if name is in list 
            swal({
                title: 'Do you really want SPUD to stop watching?',
                text: "You might become a potato.",
                type: 'warning',
                showCancelButton: true,
                focusCancel:true,
                confirmButtonColor: 'lightcoral',
                cancelButtonColor: 'lightgray',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.value) { // if confirmed
                    delete urlList[name]; // delete site from storage
                    chrome.storage.local.set({"urlList": urlList}, function() {}); // resave
                    swal({
                        title: 'SPUD stopped monitoring ' + name,
                        text: "You're a potato.",
                        confirmButtonColor: 'lightcoral',
                        imageUrl: './ezgif.com-video-to-gif.gif',
                        imageWidth: 350,
                        imageHeight: 200,
                        imageAlt: 'Custom image',
                    })
                    elem.parentElement.parentElement.removeChild(elem.parentElement); // remove block from page
                    
                    if(Object.keys(urlList).length == 0){ // this happens to remove today button on empty list
                        displaySites();
                    }
                }
            })
        }
    });
}
//sends the user to the siteList
function displaySites(){
    window.location.href="siteList.html";
}
// displays the today/all-time button
function showTodayButton(){
    chrome.storage.local.get(['urlList'], function(result) {
        if(typeof result.urlList === 'undefined'){ // if urlList has not been created
            document.getElementById('switch').style.display = "none"; 
            document.getElementById('emptyList').style.display = 'block';
        }else if(Object.keys(result.urlList).length == 0){ // if all sites have been removed from list
        document.getElementById('switch').style.display = "none";
        document.getElementById('emptyList').style.display = 'block';
        }
        
        
    });
}
// updates the timers for the data list
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
    }
});
}

//creates button listeners that run the apporpriate functions when clicked
document.getElementById('goHome').addEventListener('click', goHome);
document.getElementById('close').addEventListener('click', closePopup);
document.getElementById('switch').addEventListener('click', switchTimeView);

// Main //
popList();
showTodayButton();
setInterval(updateTimer,10);
