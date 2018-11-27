
$(".farmMap").ready(function() { 
    initMap() 
    });
var map;
var geocoder;


/*************
 *  INIT MAP *
 * ***********/
function initMap() {
    // set location set to grinnell as center of map
    var grinnell = {
        lat: 41.7434,
        lng: -92.7232
    };

    // init map
    map = new google.maps.Map(document.getElementById('map1'), {
        zoom: 13.7,
        center: grinnell
    });
    console.log("test")

    // init geocoder
    geocoder = new google.maps.Geocoder();

}




