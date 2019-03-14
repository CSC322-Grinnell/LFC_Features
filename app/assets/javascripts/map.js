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
/**
 add markers to the map
 @param 
 farm: a json object of farm
 results: the return value of geocode function
 **/

function addMarker(farm, results) {
    var infoDict = {}
    infoDict["address"] = farm.address;
    infoDict["phone"] = farm.phone;
    infoDict["email"] = farm.email;
    infoDict["facebook"] = farm.facebook;
    infoDict["instagram"] = farm.instagram;
    infoDict["twitter"] = farm.twitter;

    /*var growing_methods = "";
    for (var index = 0; index < farm.growing_methods.length; ++index) {
        console.log("test".concat(farm.growing_methods[index].grow_method));
        growing_methods = growing_methods.concat(", ", farm.growing_methods[index].grow_method);
        console.log("test again ".concat(growing_methods))
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
    
    infoDict["growing_methods"] = growing_methods;
    infoDict["markets"] = markets;
    infoDict["operations"] = operations;
    infoDict["selling_methods"] = selling_methods;*/
    

    var farmAddress = farm.address
    var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        title: farm.name,
        // icon: "https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png"
        icon: "/assets/farm_icon.png"
    });

    // data string for display tooltip
    /*var data = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h2 id="firstHeading" class="firstHeading">' + farm.name + '</h2>' +
        '<div id="bodyContent">' +
        '<p>' + farm.address + '</p>' + '<p>' + farm.phone + '</p>' +
        '<p><a href="http://' + farm.url + '" target="_blank">' + farm.url +
        '</a> ' + '</p>' +
        '</div>' +
        '</div>';
    // info window for tooltip, contains data
    var infowindow = new google.maps.InfoWindow({
        content: data
    });*/
    // add listener to map for marker to display info window
    google.maps.event.addListener(marker, 'click', function() {
        // open info window

        //infowindow.open(map, marker);
         console.log(growing_methods);
        openSidebar();
        addFarminfotoSidebar(infoDict);
    });
    markers.push(marker);
}

function openSidebar() {
    document.getElementById("mapContainer").classList.remove("col-md-12");
    document.getElementById("mapContainer").classList.add("col-md-9");
    document.getElementById("sidebar").classList.remove("invisible");
   
    //var node = document.createElement("P");
    //node.appendChild(document.createTextNode("test"))

}

function addFarminfotoSidebar(infoDict) {
    for (var key in infoDict) {
        var value = infoDict[key];
        if (!value){
            document.getElementById(key).style.display = 'none';
        }
        document.getElementById(key.concat("-info")).textContent = value;
    }
}

function closeSidebar() {
    document.getElementById("mapContainer").classList.remove("col-md-3");
    document.getElementById("mapContainer").classList.add("col-md-12");
    document.getElementById("sidebar").classList.add("invisible");
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