

var list=["https://www.youtube.com/"];

export function addUrl() {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
  function(tabs){
    url = tabs[0].url;
    list.push(url)}
  );
return list
}


