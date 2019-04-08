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
        }
        else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

var markers = []
var markerLastClicked

/**
 add markers to the map
 @param 
 farm: a json object of farm
 results: the return value of geocode function
 **/
function addMarker(farm, results) {
    // making a dictionary to store the information about the farm to print on sidebar
    var infoDict = {}
    
    // keys for dictionary
    infoDict["name"]=farm.name;
    infoDict["address"] = farm.address;
    infoDict["phone"] = farm.phone;
    infoDict["email"] = farm.email;
    infoDict["facebook"] = farm.facebook;
    infoDict["instagram"] = farm.instagram;
    infoDict["twitter"] = farm.twitter;

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
    infoDict["growing_methods"] = growing_methods.slice(2);
    infoDict["markets"] = markets.slice(2);
    infoDict["operations"] = operations.slice(2);
    infoDict["selling_methods"] = selling_methods.slice(2);
    

    var farmAddress = farm.address
    var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        title: farm.name,
        // icon: "https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png"
        icon: "/assets/farm_icon.png"
    });
    
   
    
    // add listener to map for marker to display info window
    google.maps.event.addListener(marker, 'click', function() {
        // open info window
        openSidebar();
        addFarminfotoSidebar(infoDict);
        // if there is a marker that's clicked previously set the icon back to farm_icon
        if (markerLastClicked) {
            markerLastClicked.setIcon("/assets/farm_icon.png");
        }
        // change the marker icon to highlighted_farm_icon and store current marker to markerLastClicked
        marker.setIcon("/assets/highlighted_farm_icon.png");
        markerLastClicked = marker;
    });
    markers.push(marker);
}
/**
 * open sidebar to show farm information
 **/
 
function openSidebar() {
    // To open the sidebar resize the map, then make the sidebar visible
    document.getElementById("mapContainer").classList.remove("col-md-12");
    document.getElementById("mapContainer").classList.add("col-md-9");
    document.getElementById("sidebar").style.display = "block";
}
/**
 * add the farm information to the sidebar
 * @param
 * infoDict: dictionary that holds the farm information
 **/
 
function addFarminfotoSidebar(infoDict) {
    // iterate through the key-value pairs
    for (var key in infoDict) {
        var value = infoDict[key];
        // if there is something stored in value (i.e. neither null nor empty) then make sure that the element will display and add information
        if (value){
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
 * close the sidebar
 **/
 
function closeSidebar() {
    document.getElementById("mapContainer").classList.remove("col-md-9");
    document.getElementById("mapContainer").classList.add("col-md-12");
    document.getElementById("sidebar").style.display = "none";
    markerLastClicked.setIcon("/assets/farm_icon.png");
}

/**
 show markers on the map
 @param 
 results: an array of farm jsons
 **/
function showMarkers(result) {
    console.log(result);
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


    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Grinnell, IA</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Grinnell</b> is a city in Poweshiek County, Iowa, United States.' +
        'The population was 9,218 at the 2010 census.</p>' +
        '<p>Attribution: Grinnell, <a href="https://en.wikipedia.org/wiki/Grinnell,_Iowa">' +
        'https://en.wikipedia.org/wiki/Grinnell,_Iowa</a> ' +
        '(last visited Feb 25, 2019).</p>' +
        '</div>' +
        '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var marker = new google.maps.Marker({
        position: grinnell,
        map: map,
        title: 'Grinnell (Jewel of the Prairie)'
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });

    var community_meal = { lat: 41.737665, lng: -92.725401 };

    var content_cm = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h2>Community Meal</h2>' + '<p><b>Time:</b> Every Tuesday</p>' +
        '<p><b>Where:</b> Davis Elementary School</p>' +
        '</div>';

    var infowindow_cm = new google.maps.InfoWindow({
        content: content_cm
    });

    var marker_cm = new google.maps.Marker({
        position: community_meal,
        map: map,
        title: 'Community Meal'
    });
    marker_cm.addListener('click', function() {
        infowindow_cm.open(map, marker_cm);
    });

    var farm_to_table = { lat: 41.745446, lng: -92.721348 };

    var content_ft = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h2>Grinnell Farm to Table</h2>' + '<p><b>Time:</b> Every Thursday</p>' +
        '<p><b>Where:</b> First Presbyterian Church</p>' +
        '</div>';

    var infowindow_ft = new google.maps.InfoWindow({
        content: content_ft
    });

    var marker_ft = new google.maps.Marker({
        position: farm_to_table,
        map: map,
        title: 'Grinnell Farm to Table'
    });
    marker_ft.addListener('click', function() {
        infowindow_ft.open(map, marker_ft);
    });

}