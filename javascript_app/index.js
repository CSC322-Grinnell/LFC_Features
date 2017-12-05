var map;
var geocoder;
var farms = {};
var recipes = {};
// api keys
var edemam_app_id = "c1a85afb";
var edemam_app_key = "0bf8d80e45004f66c8d4a9e6a523f14f";
var lfc_key = "YAS0sY2rbi";

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

 //   callFood2Fork(["peas","carrots"]);
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

    var iconCow = '../icons/64cow.png'


// create marker object
    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.BOUNCE,
        position: results[0].geometry.location,
        title: farm.name,
        icon: iconCow
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

    var call_url = "http://localhost:3000/farms/farm_json";
    $.ajax({
        type: "GET",
        url: call_url,
        headers: {
            'X-Auth-Token' : lfc_key
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
            console.log(new_id);
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
    var call_url = "https://api.edamam.com/search?q=" + food_string
                    + "&app_id=" + edemam_app_id
                    + "&app_key=" + edemam_app_key;

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

function handleRecipeAPICall(recipe_list) {

    // reset recipe list
    recipes = {};

    // iterate through
    for (var i = 0; i < recipe_list.length; i++) {

        // get current recipe and id
        var current_recipe = recipe_list[i].recipe;
        var id = "recipe_" + (i + 1);

        // put in recipe list
        recipes[id] = current_recipe;

        // add html
        $('#recipe_grid').append(
            '<div id="' + id + '" class="card scrollmenu-item"> ' +
                '<img class="recipe_image" src="' + current_recipe.image + '" height="" width="100%"></img>' +
                '<div class="scrollmenu-item-section">' +
                    '<h4 class="card-title">' + current_recipe.label + '</h4>' +
                    '<h6 class="card-subtitle mb-2 text-muted">' + current_recipe.source + '</h6>' +
                    '<a href="' + current_recipe.url + '" class="card-link">Go to recipe</a>' +
                '</div' +
            '</li>'
        );

        // on click to show modal
        $('#' + id).on('click', function() {
            var new_id = this.getAttribute('id');
            // alter html in modal
            setAndShowRecipeModal(recipes[new_id]);
        });
    }
}

/********************
 *  MODAL FUNCTIONS *
 * ******************/

function setAndShowFarmModal(farm) {

    // set modal header html
    $('#modal_header').html('<h1 align="center">' + farm.name + '</h1>');

    // set modal tab 1 html
    $('#tab_1_title').html('Home');
    $('#tab_1').html(
        '<h3>HOME</h3>' +
        '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>'
    );

    // set modal tab 2 html
    $('#tab_2_title').html('Contact');
    $('#tab_2').html(
      '<h4 align="center"><span class="glyphicon glyphicon-home"></span>  ' + farm.address + '</h4>' +
      '<h4 align="center"><span class="glyphicon glyphicon-earphone"></span>  ' + farm.phone + '</h4>' +
      '<div style="text-align: center">' +
      '<a href="' + farm.url + '"> Visit our webpage | </a>' +
      '<a href="' + farm.facebook + '">Facebook | </a>' +
      '<a href="' + farm.twitter + '">Twitter</a>' +
      '</div>'
    );

    // set modal tab 3 html
    $('#tab_3_title').html('Menu 3');
    $('#tab_3').html(
        '<h3>  MENU2</h3>' +
<<<<<<< HEAD
        '<p>  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>'

        );
=======
        '<p>  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>'
    );
>>>>>>> 8d821533f6036c1ccabacf906420f10ecd34ce51

    // set modal tab 4 html
    $('#tab_4_title').html('Menu 4');
    $('#tab_4').html(
        '<h3>MENU3</h3>' +
        '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>'
<<<<<<< HEAD

        );

=======
    );
>>>>>>> 8d821533f6036c1ccabacf906420f10ecd34ce51

    // show button
    $('#contact_button').show();
    $('#recipe_link_button').hide();

    // show modal
    $("#generic_modal").modal()
}

function setAndShowRecipeModal(recipe) {

    // set modal header html
    $('#modal_header').html(
        '<h1 align="center">' + recipe.label + '</h1>' +
        '<p align="center">' + recipe.source + '</p>'
    );

    // compile tab 1 data
    var ingredient_list = '<ul style="padding:15px;">';
    for(var i = 0; i < recipe.ingredients.length; i++) {
        ingredient_list += "<li>" + recipe.ingredients[i].text + "</li>";
    }
    ingredient_list += "</ul>";

    // compile tab 2 data
    var health_list = '<ul style="padding:15px;">';
    for(var i = 0; i < recipe.digest.length; i++) {
        health_list += "<li>"
            + recipe.digest[i].label
            + '<span class="pull-right">'
            + Math.round(recipe.digest[i].total * 10) / 10
            + recipe.digest[i].unit
            + "</span></li>";
    }
    health_list += "</ul>";

    // compile tab 3 data
    var nutrient_list = '<ul style="padding:15px;">';
    for(var key in recipe.totalDaily) {
        //if (!recipe.totalDaily.hasOwnProperty(key)) continue;

        nutrient_list += '<li>'
            + recipe.totalDaily[key].label
            + '<span class="pull-right">'
            + Math.round(recipe.totalNutrients[key].quantity * 10) / 10
            + recipe.totalNutrients[key].unit + ' ('
            + Math.round(recipe.totalDaily[key].quantity * 10) / 10
            + recipe.totalDaily[key].unit
            + ")</span></li>";
    }
    nutrient_list += "</ul>";
    // compile tab 4 data

    // set all modal tabs html content
    $('#tab_1_title').html('Ingredients');
    $('#tab_1').html(ingredient_list);
    $('#tab_2_title').html('Health Information');
    $('#tab_2').html(health_list);
    $('#tab_3_title').html("Nutrients");
    $('#tab_3').html(nutrient_list);

    // hide button
    $('#contact_button').hide();
    $('#recipe_link_button').show();
    $('#recipe_link_tag').attr("href", recipe.url);


    // show modal
<<<<<<< HEAD
    $("#generic_modal").modal()
=======
    $("#generic_modal").modal();
>>>>>>> 8d821533f6036c1ccabacf906420f10ecd34ce51
}
