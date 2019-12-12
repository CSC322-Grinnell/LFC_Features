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
          results[0].geometry.location["lat"]();
            addFarmMarker(farm, results);
        }
        else {
            alert('Geocode was not successful for the following reason: ' + status
            + 'Make sure all addresses are valid.');
        }
    });
}


/**
 Converts degrees of Longitude or latitude to zoom level, a google api defined term
 @param
 degrees: the number of degrees of Longitude or latitude
 latOrLng: a boolean, true of we're converting lat, false for lng
 lat: the latitude that this conversion should be taking place. this
 is important because meridians are at different distances at different
 latitudes.
 **/
function degreesToZoom(degrees, latOrLng, lat){
  var metersPerDegreeLat = 111000;
  var metersPerDegreeLngAtEquator = 111000;
  // Factor in how meridians are different degrees apart
  var metersPerDegreeLng = Math.cos(lat) * metersPerDegreeLngAtEquator;
  console.log(degrees);

  if(latOrLng){
    var meters = Math.abs(degrees * metersPerDegreeLat);
  } else {
    var meters = Math.abs(degrees * metersPerDegreeLng);
  }

  var zoomLevels = [{level: 20, distance: 1128.497220},
                    {level: 19, distance: 2256.994440},
                    {level: 18, distance: 4513.988880},
                    {level: 17, distance: 9027.977761},
                    {level: 16, distance: 18055.955520},
                    {level: 15, distance: 36111.911040},
                    {level: 14, distance: 72223.822090},
                    {level: 13, distance: 144447.644200},
                    {level: 12, distance: 288895.288400},
                    {level: 11, distance: 577790.576700},
                    {level: 10, distance: 1155581.153000},
                    {level: 9, distance: 2311162.307000},
                    {level: 8, distance: 4622324.614000},
                    {level: 7, distance: 9244649.227000},
                    {level: 6, distance: 18489298.450000},
                    {level: 5, distance: 36978596.910000},
                    {level: 4, distance: 73957193.820000},
                    {level: 3, distance: 147914387.600000},
                    {level: 2, distance: 295828775.300000},
                    {level: 1, distance: 591657550.500000}];

  // Find which zoom level corresponds with 'meters'
  for(var i = 1; i < zoomLevels.length; i++){
    if(meters < zoomLevels[i - 1].distance){
      return zoomLevels[i].level;
    }
  }

  // If we can't find a zoom level that larger than meters, return the largest
  return zoomLevels[zoomLevels.length - 1];
}


function geocodeRecenterAndAddMarker(results) {
  DeleteMarkers();

  // Used in the following API call to determine if a certain call is the last call
  counter = 0;

  // Go through the results of a farm search
  var farm;
  for (var i = 0; i < results.length; i++) {
    farm = results[i];
    var length = results.length; // Length is the number of farms to be displayed
    var address = farm.address;

    // Used to store a running sum of latitudes and Longitudes to be averaged later
    var lat = 0;
    var lng = 0;

    //Stores the largest and smallest positions for use with finding the correct zoom.
    // 91 is larger/smaller than any values.
    var outliers = {largestLat: -91, largestLng: -91,
                         smallestLat: 91, smallestLng: 91}

    geocoder.geocode({
      'address': address
    }, function(results, status) {
      // if OK/200 status, add marker to map, else throw alert.
        if (status === 'OK') {
          // Current latitude and Longitude
          var curLat = results[0].geometry.location["lat"]();
          var curLng = results[0].geometry.location["lng"]();

          // Add the the latitude and Longitude to the total
          lat += curLat;
          lng += curLng;

          //Check if this coord is the largest or smallest
          if(curLat > outliers.largestLat){
            outliers.largestLat = curLat;
          } else if (curLat < outliers.smallestLat){
            outliers.smallestLat = curLat;
          }
          if(curLng > outliers.largestLng){
            outliers.largestLng = curLng;
          } else if (curLng < outliers.smallestLng) {
            outliers.smallestLng = curLng;
          }

          addFarmMarker(farm, results);
        }
        else {
          alert('Geocode was not successful for the following reason: ' + status
          + '. \nMake sure all addresses are valid.');
        }
        // Update the counter to reflect that another marker has been geocoded
        counter += 1;

        //If this instance of the this anonymous callback function is the last...
        if(counter == length){
          //Compute the average lat and lng of the markers being added
          lat /= length;
          lng /= length;

          var coords = new google.maps.LatLng(lat,lng);
          map.setCenter(coords);

          //Find the largest distance between points on the maps
          latDifference = outliers.largestLat - outliers.smallestLat;
          lngDifference = outliers.largestLng - outliers.smallestLng;
          console.log("Lat", outliers.largestLat, "Lng", outliers.smallestLat);

          var zoomSize; // Tells us which zoom size we should zoom to
          if(latDifference > lngDifference){
            zoomSize = degreesToZoom(latDifference, true, lat);
          } else {
            zoomSize = degreesToZoom(lngDifference, false, lat);
          }
          console.log("Zoom: ", zoomSize);
          map.setZoom(zoomSize);
        }
    }); //Closes geocode API call
  } // Closes for-Loop

  // If nothing was enterd into the search bar, or no nothing is found, center the map on the iowa
  if(i == 0){
    var grinnell = {lat: 41.7434, lng: -92.7232};
    var grinnellPosition = new google.maps.LatLng(grinnell.lat, grinnell.lng);
    map.setZoom(12);
    map.setCenter(grinnellPosition);
  }
}


var markers = []

// markerLastClicked and markerLastClickedwasFarm help track the previous marker to change the icon
var markerLastClicked
var markerLastClickedwasFarm

/**
 add markers to the map
 @param
 farm: a json object of farm
 results: the return value of geocode function
 **/
function addFarmMarker(farm, results) {
    // making a dictionary to store the information about the farm to print on sidebar
    var farmInfoDict = {}

    // keys for dictionary
    farmInfoDict["name"] = farm.name;
    farmInfoDict["address"] = farm.address;
    farmInfoDict["phone"] = farm.phone;
    farmInfoDict["email"] = farm.email;
    farmInfoDict["facebook"] = farm.facebook;
    farmInfoDict["instagram"] = farm.instagram;
    farmInfoDict["twitter"] = farm.twitter;

    // for growing_methods, markets, operations, and selling methods iterate through the appropriate and collect relevant information
    var growing_methods = "";
    for (var index = 0; index < farm.growing_methods.length; ++index) {
        growing_methods = growing_methods.concat(", ", farm.growing_methods[index].grow_method);
    }

    var markets = "";
    for (var index = 0; index < farm.markets.length; ++index) {
        markets = markets.concat(", ", farm.markets[index].location);
    }

    var operations = "";
    for (var index = 0; index < farm.operations.length; ++index) {
        operations = operations.concat(", ", farm.operations[index].food);
    }

    var selling_methods = "";
    for (var index = 0; index < farm.selling_methods.length; ++index) {
        selling_methods = selling_methods.concat(", ", farm.selling_methods[index].sell_method);
    }

    // keys for dictionary. str.slice(2) removes the ", " at the beginning of the string
    farmInfoDict["growing_methods"] = growing_methods.slice(2);
    farmInfoDict["markets"] = markets.slice(2);
    farmInfoDict["operations"] = operations.slice(2);
    farmInfoDict["selling_methods"] = selling_methods.slice(2);

    var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        // icon: "https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png"
        icon: "/assets/farm_icon.png"
    });

    // add listener to map for marker to display info window
    google.maps.event.addListener(marker, 'click', function() {
        // open info window
        openSidebar("farmSidebar");
        addFarminfotoSidebar(farmInfoDict);
        // if there is a marker that's clicked previously set the icon back to farm_icon
        if (markerLastClicked) {
            if (markerLastClickedwasFarm){
                markerLastClicked.setIcon("/assets/farm_icon.png");
            } else {
                markerLastClicked.setIcon("/assets/event_icon.png");
            }

        }
        // change the marker icon to highlighted_farm_icon and store current marker to markerLastClicked
        marker.setIcon("/assets/highlighted_farm_icon.png");
        markerLastClicked = marker;
        markerLastClickedwasFarm = true;
    });
    markers.push(marker);
}


/**
 * open sidebar to show farm information
 * @params
 * sidebarType: type of sidebar, either eventSidebar or farmSidebar
 **/

function openSidebar(sidebarType) {
    // Close all sidebars first
    var sidebarArray = document.getElementsByClassName("col-md-3");
    for (var i = 0; i < sidebarArray.length; i++) {
        sidebarArray[i].style.display = "none";
    }
    // To open the sidebar resize the map, then make the sidebar visible
    document.getElementById("mapContainer").classList.remove("col-md-12");
    document.getElementById("mapContainer").classList.add("col-md-9");
    sidebarArray = document.getElementsByClassName("col-md-3");
    for (var i = 0; i < sidebarArray.length; i++) {
        if (sidebarArray[i].id == sidebarType) {
            sidebarArray[i].style.display = "block";
        }
    }
}

/**
 * close the sidebar
 * @params
 * sidebarType: type of sidebar, either eventSidebar or farmSidebar
 **/

function closeSidebar(sidebarType) {
    document.getElementById("mapContainer").classList.remove("col-md-9");
    document.getElementById("mapContainer").classList.add("col-md-12");
    var sidebarArray = document.getElementsByClassName("col-md-3");
    for (var i = 0; i < sidebarArray.length; i++) {
        if (sidebarArray[i].id == sidebarType) {
            sidebarArray[i].style.display = "none";
        }
    }
    if (markerLastClickedwasFarm) {
        markerLastClicked.setIcon("/assets/farm_icon.png");
    }
    else {
        markerLastClicked.setIcon("/assets/event_icon.png");
    }
}
/**
 * add the farm information to the sidebar
 * @param
 * farmInfoDict: dictionary that holds the farm information
 **/

function addFarminfotoSidebar(farmInfoDict) {
    // iterate through the key-value pairs
    for (var key in farmInfoDict) {
        var value = farmInfoDict[key];
        // if there is something stored in value (i.e. neither null nor empty) then make sure that the element will display and add information
        if (value) {
            document.getElementById(key).style.display = '';
            document.getElementById(key.concat("-info")).textContent = value;
        }
        // if there's nothing to show make it invisible
        else {
            document.getElementById(key).style.display = 'none';
        }
    }
}

/**
 show markers on the map
 @param
 results: an array of farm jsons
 **/
function showFarmMarkers(result) {
    DeleteMarkers();
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

    // init map - GLOBAL
    map = new google.maps.Map(document.getElementById('farmmap'), {
        zoom: 12,
        center: grinnell
    });

    // init geocoder - GLOBAL
    geocoder = new google.maps.Geocoder();


    //make a ajax call to show all of the markers
    callIndexApi(FARMS_API_URL, geocodeRecenterAndAddMarker);
}
