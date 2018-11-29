function popList(){
    chrome.storage.local.get(['urlList'], function(result) {
        for (var key in result.urlList) {
            var siteIcon = key.favIcon;
            var siteName = key.domain;
            addDiv(key);
        }
    });
}


function addDiv(siteObj){
    var block_to_insert ;
    var container_block ;
     
    block_to_insert = document.createElement( 'div' );
    block_to_insert.innerHTML = siteObj ;
     
    container_block = document.getElementById( 'listContainer' );
    container_block.appendChild( block_to_insert );
    }
    
popList();