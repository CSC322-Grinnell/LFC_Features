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
            addFarmMarker(farm, results);
        }
        else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

/**
positioning event and add markers
@param 
event: a json object of event
**/
function geocodeAddressAndAddEventMarker(event) {
   var address = event.location;
   geocoder.geocode({
       'address': address
   }, function(results, status) {
       // if OK/200 status, add marker to map, else throw alert.
       if (status === 'OK') {
           addEventMarker(event, results);
       }
       else {
           alert('Geocode was not successful for the following reason: ' + status);
       }
   });
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

// Array for the recurring events 
var eventArray = []
var rawEvents = []
$.ajaxSetup({async: false});
$.get("/eventJson", function(data) {rawEvents = data;});
for (var i = 0; i < rawEvents.length; i++) {
    eventDate = new Date(rawEvents[i].start.date_time);
    eventArray.push({
        eventName: rawEvents[i].summary, 
        time: eventDate.toDateString() + " at " + eventDate.toLocaleTimeString([], {timeStyle: 'short'}),
        location: rawEvents[i].location})
}

/**
 * add the events marker to the map
 * @params
 * event: event to be added
 **/


function addEventMarker(event, results) {

    var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        // icon: "https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png"
        icon: "/assets/event_icon.png"
    });


    // add listener to map for marker to display info window
    google.maps.event.addListener(marker, 'click', function() {
        // open info window
        openSidebar("eventSidebar");
        console.log(event);
        addEventinfotoSidebar(event);
        // if there is a marker that's clicked previously set the icon back to farm_icon
        if (markerLastClicked) {
            // if the marker clicked before was a farm then set the appropriate icon
            if (markerLastClickedwasFarm) {
                markerLastClicked.setIcon("/assets/farm_icon.png");
            }
            else {
                markerLastClicked.setIcon("/assets/event_icon.png");
            }
        }
        //change the marker icon to highlighted_farm_icon and store current marker to markerLastClicked
        marker.setIcon("/assets/highlighted_event_icon.png");
        markerLastClicked = marker;
        markerLastClickedwasFarm = false;
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
 * add the event information to the sidebar
 * @param
 * eventInfoDict: dictionary that holds the event information
 **/

function addEventinfotoSidebar(eventInfoDict) {
    // iterate through the key-value pairs
    for (var key in eventInfoDict) {
        // ignore the position key - this is not shown on the sidebar
        if (key == "position"){
            continue;
        }
        var value = eventInfoDict[key];
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
function showMarkers(result) {
    for (var i = 0; i < result.length; i++) {
        // add marker at proper place
        geocodeAddressAndAddMarker(result[i]);
    }
    for (var i = 0; i < eventArray.length; i++) {
        // add marker at proper place
        geocodeAddressAndAddEventMarker(eventArray[i]);
        //addEventMarker(eventArray[i]);
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
    callIndexApi(FARMS_API_URL, showMarkers)

    var legend = document.getElementById('legend');
    var lengend_farm_string = "Farm";
    var farm_icon = "/assets/small_farm_icon.png";
    var farm_div = document.createElement('div');
    farm_div.innerHTML = '<img src="' + farm_icon + '"> ' + lengend_farm_string;
    var lengend_event_string = "Event";
    var event_icon = "/assets/small_event_icon.png";
    var event_div = document.createElement('div');
    event_div.innerHTML = '<img src="' + event_icon + '"> ' + lengend_event_string;
    legend.appendChild(farm_div);
    legend.appendChild(event_div);

    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(legend);

}