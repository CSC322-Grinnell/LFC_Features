var map;
var geocoder;
var farms = {};

init();

/********
 * INIT *
 ********/ 

function init() {

    // set up recipe search 
    document.getElementById("search_recipes").onclick = function() {
        var text = $('#recipe_search_text').val();
        text = text.split(' ').join('%20')
        if (text != "") {
            callFood2Fork(text);
        }
    }

    // set up farm search
    document.getElementById("search_farm").onclick = function() {
        var text = $('#search_farm_text').val();
        if (text != "") {
            // call search api here
        }
    }

    callFood2Fork(["peas","carrots"]);
}

/*************
 *  INIT MAP *
 * ***********/ 

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

    // call index function for API to load all farms
    callIndexApi();
}

/****************************************
 * GEOCODING AND ADDING MARKERS FUNCTIONS
 * **************************************/

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
    });
}

/***********************
 *  FARM API FUNCTIONS *
 * *********************/ 

function callIndexApi() {
    document.getElementById("farmList").innerHTML = "";
   
    var call_url = "https://lfc-aleksandarhr.c9users.io/farms";
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

    // set to new map 
    farms = {};

    for (var i = 0; i < result.length; i++) {
        // create id 
        var id = "farm_" + result[i].id;
        // add to map 
        farms[id] = result[i];
        // append card 
        $('#farmList').append('<li id="' + id + '" class="list-group-item justify-content-between"> ' +
            '<h4 class="card-title">' + result[i].name + '</h4>' +
            '<h6 class="card-subtitle mb-2 text-muted">' + result[i].address + '</h6>' +
            '<p class="card-text">CSA, Wholesale, and Farmers Market</p>' +
            '<a href="#" class="card-link">' + result[i].url + '</a> | ' +
            '<a href="#" class="card-link">' + result[i].phone + '</a>' +
            '</li>'
        );
        // on click to show modal
        $('#' + id).on('click', function() {
            var new_id = this.getAttribute('id');
            // alter html in modal      
            setAndShowFarmModal(farms[new_id]);
        });

        // add marker at proper placec 
        geocodeAddressAndAddMarker(result[i]);
    }
}

/*************************
 *  RECIPE API FUNCTIONS *
 * ***********************/ 

function callFood2Fork(food_string) {

    // clear the html to get rid of old recipes 
    $("#recipe_grid").html("");

    // set new url to access
    var call_url = "https://api.edamam.com/search?q=" + food_string + "&app_id=c1a85afb&app_key=0bf8d80e45004f66c8d4a9e6a523f14f";

    // make call
	$.ajax({
    	type: "GET",
        url: call_url,
        headers: {
        //   "Access-Control-Allow-Origin":"*"
            "more" : true,
        },
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
    for (var i = 0; i < recipes.length; i++) {
        var id = "recipe_" + (i + 1);
        $('#recipe_grid').append(
            '<div id="' + id + '" class="card scrollmenu-item"> ' +
                '<img class="recipe_image" src="' + recipes[i].recipe.image + '" height="" width="100%"></img>' + 
                '<div class="scrollmenu-item-section">' + 
                    '<h4 class="card-title">' + recipes[i].recipe.label + '</h4>' +
                    '<h6 class="card-subtitle mb-2 text-muted">' + recipes[i].recipe.source + '</h6>' +
                    '<a href="' + recipes[i].recipe.url + '" class="card-link">Go to recipe</a>' +
                '</div' +
            '</li>'
        );
    }
}

/********************
 *  MODAL FUNCTIONS *
 * ******************/ 

function setAndShowFarmModal(farm) {
    
    // set modal html
    $('#modal_header').html("<h1>" + farms[new_id].name + "</h1>");
    $('#modal_body').html("<h4>" + farms[new_id].address + "</h4>");

    // show modal
    $("#generic_modal").modal()
}