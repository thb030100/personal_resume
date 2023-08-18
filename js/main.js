/*
    Henderson - vCard & Resume HTML5 Template
    Version: 3.0.1
    Author: Mountain-Themes
    Author URL: https://themeforest.net/user/mountain-themes
    Henderson © 2023. Design & Coded by Mountain-Themes.

    TABLE OF CONTENTS
    ---------------------------
     1. Loading
     2. owlCarousel
     3. Swiper Slider
     4. Portfolio
     5. Fancybox
     6. Video Background
     7. Contact form
     8. Google Map
*/

/* ================================= */
/* :::::::::: 1. Loading ::::::::::: */
/* ================================= */


    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
         $('#video').css({"display" : "none"});
    } 


    $(".loader-icon").delay(500).fadeOut();
    $("#page-loader").delay(700).fadeOut("slow");

    $(".icon-mobile").on("click", function() {
      $(this).toggleClass("active");
      $(".navigation").toggleClass("menu-mobile");
      $(".return-navigation").toggleClass("menu-mobile");
    });


/* ================================= */
/* ::::::::: 2. OwlCarousel :::::::: */
/* ================================= */


$("#owl-blog").owlCarousel({
 
    // Most important owl features
    items : 1,
    itemsCustom : false,
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [980,3],
    itemsTabletSmall: false,
    itemsMobile : [479,1],
    singleItem : false,
    itemsScaleUp : false,
 
    //Basic Speeds
    slideSpeed : 200,
    paginationSpeed : 800,
    rewindSpeed : 1000,
 
    //Autoplay
    autoPlay : true,
    stopOnHover : false,
 
  
    //Pagination
    pagination : false,
    paginationNumbers: false,
 
    // Responsive 
    responsive: true,
    responsiveRefreshRate : 200,
    responsiveBaseWidth: window,
 
    
});


/* ================================= */
/* :::::::: 3. Swiper Slider ::::::: */
/* ================================= */

const swiper = new Swiper('.slider-left', {
        speed: 900,
        loop: true,
        effect: 'fade',
        centeredSlides: true,
        autoplay: 2500,
        simulateTouch: false,
    });


/* ================================= */
/* :::::::: 4. Portfolio ::::::::::: */
/* ================================= */

$('#grid-portfolio').cubeportfolio({
  filters: '.portfolioFilter',
  layoutMode: 'masonry',
  sortByDimension: true,
  mediaQueries: [{
    width: 1500,
    cols: 4,
  }, {
    width: 1100,
    cols: 3,
  }, {
    width: 800,
    cols: 3,
  }, {
    width: 480,
    cols: 3,
  }, {
    width: 320,
    cols: 2,
  }],
  defaultFilter: '*',
  animationType: 'quicksand',
  gapHorizontal: 5,
  gapVertical: 5,
  gridAdjustment: 'responsive',
  caption: 'zoom',
  displayType: 'sequentially',
  displayTypeSpeed: 100,

});



/* ================================= */
/* ::::::::: 5. Fancybox ::::::::::: */
/* ================================= */

Fancybox.bind('[data-fancybox="gallery"]', {
  Thumbs: {
    Carousel: {
      fill: false,
      center: true,
    },
  },
});
/* ================================= */
/* :::::: 6. Video Background :::::: */
/* ================================= */

var video = $('#video').data('video');
var mute = $('#video').data('mute');

$('#video').YTPlayer({
  videoId: video,
  mute: mute,  
  fitToBackground: false,
});

$(".ytplayer-player-inline").on("load", function() {
  let head = $(".ytplayer-player-inline").contents().find("head");
  let css = '<style>.html5-video-player .video-click-tracking, .html5-video-player .video-stream { display: block; width: 100%!important; height: 100%!important; position: relative; left: 0%!important; top: 0!important;}</style>';
  $(head).append(css);
});


/* ================================= */
/* :::::::: 7. Contact form :::::::: */
/* ================================= */


      $('#submit').on("click", function() {  
           // validate and process form here 
           $("#ajax-contact-form").validate({
             
                  rules:{

                        name:{
                            required: true,
                        },

                        email:{
                            required: true,
                            email: true,
                        },

                        msg:{
                            required: true,
                        },
                   },

                   messages:{

                          name:{
                            required: "<i class='fa fa-exclamation-triangle name'></i>",
                        },

                        email:{
                            required: "<i class='fa fa-exclamation-triangle email'></i>",
                            email: "<i class='fa fa-exclamation-triangle email'></i>",
                        },

                          msg:{
                            required: "<i class='fa fa-exclamation-triangle message'></i>",
                        },

                   },

                // JQuery's awesome submit handler.
                submitHandler: function(form) {

                     // Create variables from the form
                     var name = $('input#name').val(); 
                     var email = $('input#email').val();  
                     var msg = $('textarea#msg').val();

                     // Create variables that will be sent in a URL string to contact.php
                     var dataString = '&name='+ name + '&email=' + email + '&msg=' + msg;
        
                        $.ajax({
                            type: "POST",
                            url: "php/contact.php",
                            data: dataString,
                            success: function(data) {
                                  if(data == 'OK') {
                                    var result = '<div class="notification_ok"><i class="fa fa-check"></i> Your email was sent. Thanks!</div>';
                                    $("#ajax-contact-form").find('input[type=text], input[type=email], textarea').val("");
                                   
                                  } else {
                                  result = data;
                                 }
                                 $('#note').html(result).fadeIn();
                                 setTimeout(function () {
                                   $('#note').html(result).fadeOut();
                                 }, 4000);
           
                          }
                         
                      });
                     return false;
               }
          });
    });




/* ================================= */
/* :::::::: 8. Google Map :::::::::: */
/* ================================= */


  //set your google maps parameters
  var latitude = -37.8602828,
    longitude = 145.079616,
    map_zoom = 9;

  //google map custom marker icon - .png fallback for IE11
  var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
  var marker_url = ( is_internetExplorer11 ) ? 'images/icon-location.png' : 'images/icon-location.png';
    
  //define the basic color of your map, plus a value for saturation and brightness
  var main_color = '#2d313f',
    saturation_value= -20,
    brightness_value= 5;

  //we define here the style of the map
  var style= [ 
    {
      //set saturation for the labels on the map
      elementType: "labels",
      stylers: [
        {saturation: saturation_value},
      ]
    },  
      { //poi stands for point of interest - don't show these lables on the map 
      featureType: "poi",
      elementType: "labels",
      stylers: [
        {visibility: "off"},
      ]
    },
    {
      //don't show highways lables on the map
          featureType: 'road.highway',
          elementType: 'labels',
          stylers: [
              {visibility: "off"},
          ]
      }, 
    {   
      //don't show local road lables on the map
      featureType: "road.local", 
      elementType: "labels.icon", 
      stylers: [
        {visibility: "off"}, 
      ] 
    },
    { 
      //don't show arterial road lables on the map
      featureType: "road.arterial", 
      elementType: "labels.icon", 
      stylers: [
        {visibility: "off"},
      ] 
    },
    {
      //don't show road lables on the map
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {visibility: "off"},
      ]
    }, 
    //style different elements on the map
    { 
      featureType: "transit", 
      elementType: "geometry.fill", 
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value },
      ]
    }, 
    {
      featureType: "poi",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value },
      ]
    },
    {
      featureType: "poi.government",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value },
      ]
    },
    {
      featureType: "poi.attraction",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value },
      ]
    },
    {
      featureType: "poi.business",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value },
      ]
    },
    {
      featureType: "transit",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value },
      ]
    },
    {
      featureType: "transit.station",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value },
      ]
    },
    {
      featureType: "landscape",
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value },
      ]
      
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value },
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value },
      ]
    }, 
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value },
      ]
    }
  ];
    
  //set google map options
  var map_options = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: map_zoom,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        styles: style,
    }
    //inizialize the map
  var map = new google.maps.Map(document.getElementById('google-container'), map_options);
  //add a custom marker to the map        



 var contentString = '<div class="contact-box left">'+
      '<h3>CONTACT INFORMATION.</h3>'+
         '<ul>'+
       '<li><i class="fa-solid fa-location-dot"></i>Melbourne, Australia</li>'+
       '<li><i class="fa fa-fw fa-phone"></i>765-302-2878</li>'+
       '<li><i class="fa fa-paper-plane"></i><a href="mailto:">name@domain.com</a></li>'+
       '<li><i class="fa fa-fw fa-globe"></i><a href="">mycompanyname.com</a></li>'+
       '</ul>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 300,

  });

   var marker = new google.maps.Marker({
      position: new google.maps.LatLng(latitude, longitude),
      map: map,
      title: 'Melbourne, Australia',
      visible: true,
      icon: marker_url,
  });
  
    infowindow.open(map,marker);

 google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });

  google.maps.event.addDomListener(window, "resize", function() {
     var center = map.getCenter();
     google.maps.event.trigger(map, "resize");
     map.setCenter(center); 

    }); 




  //add custom buttons for the zoom-in/zoom-out on the map
  function CustomZoomControl(controlDiv, map) {
    //grap the zoom elements from the DOM and insert them in the map 
      var controlUIzoomIn= document.getElementById('zoom-in'),
        controlUIzoomOut= document.getElementById('zoom-out');
      controlDiv.appendChild(controlUIzoomIn);
      controlDiv.appendChild(controlUIzoomOut);

    // Setup the click event listeners and zoom-in or out according to the clicked element
    google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
        map.setZoom(map.getZoom()+1)
    });
    google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
        map.setZoom(map.getZoom()-1)
    });
  }

  var zoomControlDiv = document.createElement('div');
  var zoomControl = new CustomZoomControl(zoomControlDiv, map);

    //insert the zoom div on the top left of the map
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);

