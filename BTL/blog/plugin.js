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
