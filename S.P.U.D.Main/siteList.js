function popList(){
    chrome.storage.local.get(['urlList'], function(result) {
        for (var key in result.urlList) {
            var siteIcon = key.favIcon;
            var siteName = key.domain;
            addDiv(result.urlList[key]);
        }
    });
}

function getTimer(){
    var siteBlock;
    var timeBlock;

    var array = getDivChildren();
    for(elem in array){
    // siteBlock = document.getElementById('siteBlock');
    var nameBlock = elem.getElementById('nameBlock');
    var name = nameBlock.textContent;
    chrome.storage.local.get(['urlList'], function(result) {
        var urlList = result.urlList;
        var s = urlList[name].intervalSeconds;
        timeBlock = siteBlock.getElementById("timeBlock");
        timeBlock.innerHTML = formatClock(s);
    });
    }
}
function getDivChildren() {

    var div = document.getElementById('listContainer'),
        subDiv = div.getElementsByTagName('div'),
        myArray = [];

    for(var i = 0; i < subDiv.length; i++) {
        var elem = subDiv[i];
        console.log(elem.id);
        // if(elem.id('siteBlock') === 0) {
        //     myArray.push(elem.id);
        // }
    }
    return myArray;
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
    name.innerHTML = siteObj.domain;
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
     
    containerBlock = document.getElementById( 'listContainer' );
    containerBlock.appendChild(siteBlock);
    siteBlock.appendChild(iconBlock);
    siteBlock.appendChild(nameBlock);
    siteBlock.appendChild(timeBlock);
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
document.getElementById('goHome').addEventListener('click', goHome);
popList();
getTimer();

function goHome(){
    window.location.href="popup.html";
}