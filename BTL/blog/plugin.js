$(document).ready(function(){
  $('.owl-carousel').owlCarousel({
    stagePadding: 0,
    loop:true,
    margin:50,
    center: true,
    autoplay: true,
    // nav:true,
    responsive:{
        0:{
            items:1
        },
        700:{
            items:2
        },
        1000:{
            items:2 
        }
        
    }
  })
});
var check = true;
function myF1(){
    if(check){
        document.getElementById("idBars").style.display = "none";
        document.getElementById("idRemove").style.display = "block";
        document.getElementById("menu-left").style.display = "block";
        check = false;
    }else {
        document.getElementById("idBars").style.display = "block";
        document.getElementById("idRemove").style.display = "none";
        document.getElementById("menu-left").style.display = "none";
        check = true;
    }
}

function myF2(){
    if(!check){
        document.getElementById("idBars").style.display = "block";
        document.getElementById("idRemove").style.display = "none";
        document.getElementById("menu-left").style.display = "none";
        check = true;
    }
}
