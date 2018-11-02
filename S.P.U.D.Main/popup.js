function changeImage(){
    document.getElementById("x").src='ezgif.com-vieo-to-gif.gif'
}

function addWebsite() {
    swal({
        position: 'top-end',
        type: 'success',
        title: 'Website Added',
        showConfirmButton: true,
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
document.getElementById('change image').addEventListener('click', changeImage);
  // "content_scripts": 
  //   {
  //     "js":["sweetalert2.all.min.js"]
  //   },