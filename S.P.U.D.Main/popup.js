// import swal from 'sweetalert';


var list=["https://www.youtube.com/"];

export function addUrl() {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
  function(tabs){
    url = tabs[0].url;
    list.push(url)}
  );
return list
}


function addWebsite() {
    // alert("website added");
    var txt;
    if (confirm("add this website?")){
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
