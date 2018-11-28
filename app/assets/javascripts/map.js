/****************************************
 * GEOCODING AND ADDING MARKERS FUNCTIONS
 * **************************************/

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

function addMarker(farm, results) {
    var operation_icon;
    if (farm.operations.length == 0) {
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            title: farm.name,
        });

    } else {
        var primary_operation;
        var farm_operations = farm.operations;
        var primary_operation_id = farm.primary_operation_id;

        for (var operation of farm_operations) {
            if (operation.id == primary_operation_id) {
                primary_operation = operation.food;
            }
        }
        if (primary_operation == "cow" || primary_operation == "pork" || primary_operation == "chicken" ||
            primary_operation == "turkey" || primary_operation == "lamb" || primary_operation == "duck" ||
            primary_operation == "beef") {
            operation_icon = '/assets/64cow.png';
        } else if (primary_operation == "fruit") {
            operation_icon = '/assets/24apple.png';
        } else if (primary_operation == "vegetables") {
            operation_icon = '/assets/24broccoli.png';
        } else if (primary_operation == "dairy") {
            operation_icon = '/assets/24dairy.png';
        } else if (primary_operation == "agritourism" || primary_operation == "hay" || primary_operation == "row crop") {
            operation_icon = '/assets/agricultural.png';
        } else if (primary_operation == "egg") {
            operation_icon = '/assets/egg.png';
        }

        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            title: farm.name,
            icon: operation_icon
        });
    }

    var iconCow = '/assets/64cow.png'
    var iconPig = '/assets/24pig.png'


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
        zoom: 13.7,
        center: grinnell
    });

    // init geocoder
    geocoder = new google.maps.Geocoder();
    
    var call_url = "/farms/farm_json";
    $.ajax({
        type: "GET",
        url: call_url,
        headers: {
            'X-Auth-Token': lfc_key
        },
        dataType: 'json',
        contentType: 'application/json',
        crossDomain: true,
        async: false,
        success: function(result) {
            if (result != null || result.length > 0) {
                showMarkers(result);
            } else {
                alert("errors")
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        }
    });

}