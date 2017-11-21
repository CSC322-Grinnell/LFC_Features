var map;
var geocoder;

init();

function init() {
    // set up on click
    document.getElementById("searchButton").onclick = callApi;

    callFood2Fork(["peas","carrots"]);

}

function initMap() {
    // set location set to grinnell as center of map
    var grinnell = {
        lat: 41.7434, 
        lng: -92.7232 };

    // init map 
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: grinnell
    });

    // init geocoder
    geocoder = new google.maps.Geocoder();

    //var marker = new google.maps.Marker({
    //    position: grinnell,
    //    map: map
    //});

    callApi();
}

function callApi() {
    
    document.getElementById("farmList").innerHTML = "";
   
    var call_url = "https://lfc-features-.c9users.io/farms";
	$.ajax({
    	type: "GET",
        url: call_url,
        headers: {
            'X-Auth-Token' : 'YAS0sY2rbi'
        },
        dataType: 'json',
        contentType: 'application/json',
        crossDomain: true,
        async: false,
        success: function(result) {
            if (result != null || result.length > 0) {
                handleIndexCall(result);
            } else {
                alert("Your search query returned no results . . . ")
            }
		},
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown); 
        }
    });
}

function handleIndexCall(result) {
    console.log(result);

    for (var i = 0; i < result.length; i++) {

        var id = "farm_" + result[i].id;
        // append card 
        $('#farmList').append('<li id="' + id + '" class="list-group-item justify-content-between"> ' +
            '<h4 class="card-title">' + result[i].name + '</h4>' +
            '<h6 class="card-subtitle mb-2 text-muted">' + result[i].address + '</h6>' +
            '<p class="card-text">CSA, Wholesale, and Farmers Market</p>' +
            '<a href="#" class="card-link">' + result[i].url + '</a> | ' +
            '<a href="#" class="card-link">' + result[i].phone + '</a>' +
            '</li>'
        );

        // add marker at proper placec 
        geocodeAddressAndAddMarker(result[i]);
    }
}

function geocodeAddressAndAddMarker(farm) {
    var address = farm.address + ", Iowa, 50112"
    geocoder.geocode({'address': address}, function(results, status) {
        // if OK/200 status, add marker to map, else throw alert.
        if (status === 'OK') {
            addMarker(farm, results);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function addMarker(farm, results) {
// create marker object 
    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: results[0].geometry.location,
        title: farm.name
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
        infowindow.open(map,marker);
        // begin animation
        //marker.setAnimation(google.maps.Animation.BOUNCE);
        // end animation after 1000 milliseconds
        //setTimeout(function(){ 
        //    marker.setAnimation(null);
        //}, 1000);
    });

    // when we mouseover the card we want to emphasize the marker it is linked to
    //console.log('#farms_' + farm.id);
        //$('#farms_' + farm.id).click(function() {
        //    marker.setAnimation(google.maps.Animation.BOUNCE);
        //    console.log("Jumping!");
    //});
}

function callFood2Fork(foods) {
    var call_url = "https://api.edamam.com/search?q=brussel%20sprouts%20peanut&app_id=c1a85afb&app_key=0bf8d80e45004f66c8d4a9e6a523f14f";

    //for (var i = 0; i < foods.length; i++) {
    //    call_url += foods[i];
    //    if(i != foods.length - 1) {
    //        call_url += "%20";
    //  }
    //}

    console.log(call_url)
	$.ajax({
    	type: "GET",
        url: call_url,
        //headers: {
        //   "Access-Control-Allow-Origin":"*"
        //},
        dataType: 'json',
        //contentType: 'text/plain;charset=UTF-8',
        crossDomain: true,
        //async: false,
        success: function(result) {
            if (result != null && result.hits.length > 0) {
                console.log(result);
                handleRecipeAPICall(result.hits);
            } else {
                alert("Your search query returned no results . . . ")
            }
		},
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown); 
        }
    });
}

function handleRecipeAPICall(recipes) {
    console.log(recipes);
    for (var i = 0; i < recipes.length; i++) {

        var id = "recipe_" + (i + 1);

        $('#recipe_grid').append('<div id="' + id + '" class="card scrollmenu-item"> ' +
            '<img class="recipe_image" src="' + recipes[i].recipe.image + '" height="150" width="150"></img>' + 
            '<h4 class="card-title">' + recipes[i].recipe.label + '</h4>' +
            '<h6 class="card-subtitle mb-2 text-muted">' + recipes[i].recipe.source + '</h6>' +
            '<a href="' + recipes[i].recipe.url + '" class="card-link">Go to recipe</a>' +
            '</li>'
        );
    }
}