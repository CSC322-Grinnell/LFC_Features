/****************************************
 * GEOCODING AND ADDING MARKERS FUNCTIONS
 * **************************************/
/**
 positioning farm and add markers
 @param 
 farm: a json object of farm
 **/
function geocodeAddressAndAddMarker(farm) {
    var address = farm.address;
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        // if OK/200 status, add marker to map, else throw alert.
        if (status === 'OK') {
            addMarker(farm, results);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

var markers = []
/**
 add markers to the map
 @param 
 farm: a json object of farm
 results: the return value of geocode function
 **/
 function addMarker(farm, results) {
  var marker = new google.maps.Marker({
    map: map,
    position: results[0].geometry.location,
    title: farm.name,
  });

  // data string for display tooltip
  var data = farm.name;
  // info window for tooltip, contains data
  var infowindow = new google.maps.InfoWindow({
      content: data
  });
  // add listener to map for marker to display info window
  google.maps.event.addListener(marker, 'click', function() {
      // open info window
      infowindow.open(map, marker);
  });
  markers.push(marker);
}
/**
 show markers on the map
 @param 
 results: an array of farm jsons
 **/
function showMarkers(result){
    for (var i = 0; i < result.length; i++) {
        // add marker at proper place
        geocodeAddressAndAddMarker(result[i]);
    }
}


/***********************
 *  DELETE MARKERS ON MAP *
 * *********************/

function DeleteMarkers() {
    //Loop through all the markers and remove
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
};
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
    map = new google.maps.Map(document.getElementById('farmmap'), {
        zoom: 12,
        center: grinnell
    });

    // init geocoder
    geocoder = new google.maps.Geocoder();
    
    
    //make a ajax call to show all the markers
    var call_url = "/farms/farm_json";
    callIndexApi(call_url, showMarkers)

}