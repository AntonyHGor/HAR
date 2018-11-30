function popList(){
    chrome.storage.local.get(['urlList'], function(result) {
        for (var key in result.urlList) {
            var siteIcon = key.favIcon;
            var siteName = key.domain;
            addDiv(result.urlList[key]);
        }
    });
}

function addDiv(siteObj){
    var siteBlock;
    var containerBlock;
    var iconBlock;
    var timeBlock;
 
    siteBlock = document.createElement('div');
    siteBlock.innerHTML = siteObj.domain;
    siteBlock.classList.add("siteBlock");
 
    iconBlock = document.createElement('IMG');
    var favIconUrl = siteObj.favIcon;
    iconBlock.setAttribute("src", favIconUrl);
    iconBlock.setAttribute("width", "25");
    iconBlock.setAttribute("height", "25");
    iconBlock.classList.add("iconBlock");
 
 
    timeBlock = document.createElement('div');
    var s = siteObj.intervalSeconds;
    timeBlock.innerHTML = formatClock(s);
    timeBlock.classList.add("timeBlock");
 
    containerBlock = document.getElementById( 'listContainer' );
    containerBlock.appendChild(siteBlock);
    siteBlock.appendChild(iconBlock);
    siteBlock.appendChild(timeBlock);
 
    }
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
                clock = String ("0"+ String(hr)+ "h " + "0" + String(min%60) + "m " + "0" + String(sec%60%60) + "s");}
            if((sec%60%60<10) && (min%60>10)){
                clock = String ("0"+ String(hr)+ "h " + "0" + String(min%60) + "m " + String(sec%60%60) + "s");
            }
            if((sec%60%60>10) && (min%60<10)){
                clock = String ("0"+ String(hr)+ "h " +  String(min%60) + "m " + "0" + String(sec%60%60) + "s");
            }
            if((sec%60%60>10) && (min%60>10)){
                clock = String ("0"+ String(hr)+ "h " +  String(min%60) + "m " +  String(sec%60%60) + "s");
            }
    
        }
    
        if (count >= 36000){
    
            if((sec%60%60<10) && (min%60<10)){
                clock = String ( String(hr)+ "h" + "0" + String(min%60) + "m " + "0" + String(sec%60%60) + "s");}
            if((sec%60%60<10) && (min%60>10)){
                clock = String ( String(hr)+ "h" + "0" + String(min%60) + "m " + String(sec%60%60) + "s");
            }
            if((sec%60%60>10) && (min%60<10)){
                clock = String ( String(hr)+ "h" +  String(min%60) + "m " + "0" + String(sec%60%60) + "s");
            }
            if((sec%60%60>10) && (min%60>10)){
                clock = String ( String(hr)+ "h" +  String(min%60) + "m " +  String(sec%60%60) + "s");
            }
    
        }
    
        return clock;
        
    }

popList();