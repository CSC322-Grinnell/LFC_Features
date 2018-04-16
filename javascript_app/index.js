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

$(document).ready(function() {
    $(".dropdown-menu li a").click(function() {
        $("#category_button").text($(this).text());
    });
});


function init() {

    // set up recipe search
    document.getElementById("search_recipes").onclick = function() {
        var text = $('#recipe_search_text').val();
        text = text.split(' ').join('%20')
        if (text != "") {
            callFood2Fork(text);
        }
    };

// set up farm search
    document.getElementById("search_farm").onclick = function() {
        var checkValues = [];
        $('input[name=checkboxList]:checked').each(function() {
            console.log($(this).val());
            checkValues.push($(this).val());
        });
        callIndexApi2(checkValues);

        var text = $('#search_farm_text').val();
        var search_by = $('#category_button').text();
        // Search by Address
        if (search_by == "Address") {
            if (text != "") {
                geocoder.geocode({ 'address': text }, function(results, status) {
                    if (status == 'OK') {
                        map.setCenter(results[0].geometry.location);
                        map.setZoom(17);
                        //map.panTo(curmarker.position);
                        var marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location
                        });
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            }
        // Search by Farm's Name
        } else if (search_by == "Farm's Name") {

            var farms = [];
            var call_url = "http://localhost:3000/farms/farm_json";
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
                       farms  = handleAddressCall(result, text);
                       handleIndexCall3(farms);
                       // text += "Iowa, 50112"; // this is temporary
                    } else {
                        alert("Your search query returned no results . . . ")
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log("Status: " + textStatus);
                    console.log("Error: " + errorThrown);
                }
            });
            if (text != "") {
                geocoder.geocode({ 'address': text }, function(results, status) {
                    if (status == 'OK') {
                        map.setCenter(results[0].geometry.location);
                        map.setZoom(17);
                        //map.panTo(curmarker.position); ??
                        var marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location
                        });
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            }
        } else{
            document.getElementById("search_farm_text").text = "You must enter a username";
        }
    }
}

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
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13.7,
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
    geocoder.geocode({ 'address': address }, function(results, status) {
        // if OK/200 status, add marker to map, else throw alert.
        if (status === 'OK') {
            addMarker(farm, results);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function addMarker(farm, results) {

    var iconCow = '../javascript_app/icons/64cow.png'
    var iconPig = '../javascript_app/icons/24pig.png'


    // create marker object
    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.BOUNCE,
        position: results[0].geometry.location,
        title: farm.name,
        icon: iconCow
    });

    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.BOUNCE,
        position: results[0].geometry.location,
        title: farm.name,
        icon: iconPig
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
            'X-Auth-Token': lfc_key
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
            //  console.log(new_id);
            // alter html in modal
            setAndShowFarmModal(farms[new_id]);
        });

        // add marker at proper placec
        geocodeAddressAndAddMarker(result[i]);
    }
}

function handleAddressCall(result, addressSearch) {
    farms = [];


    for (var i = 0; i < result.length; i++) {
        // create id
        var name = result[i].name;
        var id = "farm_" + result[i].id;
        // add to map
        //farms[id] = result[i];
        console.log("name is " + name);
        if (name.includes(addressSearch)) {
            console.log("name is " + name);
          //  return result[i].address;
           farms.push(result[i]);
        }


    }
    console.log("Address call to farms");
    console.log(farms);


    return farms;


}

/*************************
 *  RECIPE API FUNCTIONS *
 * ***********************/

function callFood2Fork(food_string) {

    // clear the html to get rid of old recipes
    $("#recipe_grid").html("");

    // set new url to access
    var call_url = "https://api.edamam.com/search?q=" + food_string +
        "&app_id=" + edemam_app_id +
        "&app_key=" + edemam_app_key;

    // make call
    $.ajax({
        type: "GET",
        url: call_url,
        headers: {
            //   "Access-Control-Allow-Origin":"*"
            "more": true,
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
function capitalize_words(str) {
    return str.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

function getOperation(farm) {
    var result = "";
    if (!farm.operations) {
        farm = farm[0];
    }
    for (var i = 0; i < farm.operations.length; i++) {
        result += capitalize_words(farm.operations[i].food);
        if (i != farm.operations.length - 1) {
            result += ', ';
        }
    }

    if (result == "") {
        return "N/A"
    }
    return result;
}

function getGrowingMethod(farm) {
    var result = "";
    if (!farm.growing_methods) {
        farm = farm[0];
    }
    for (var i = 0; i < farm.growing_methods.length; i++) {
        result += capitalize_words(farm.growing_methods[i].grow_method);
        if (i != farm.growing_methods.length - 1) {
            result += ', ';
        }
    }
    if (result == "") {
        return "N/A"
    }
    return result
}

function getSellingMethod(farm) {
    var result = "";
     if (!farm.selling_methods) {
        farm = farm[0];
    }
    for (var i = 0; i < farm.selling_methods.length; i++) {
        result += capitalize_words(farm.selling_methods[i].sell_method);
        if (i != farm.selling_methods.length - 1) {
            result += ', ';
        }
    }

    if (result == "") {
        return "N/A"
    }
    return result;
}

function setAndShowFarmModal(farm) {

    // set modal header html
    console.log(farm);
    $('#modal_header').html('<h1 align="center">' + farm.name + '</h1>');

    // set modal tab 1 html
    $('#tab_1_title').html('Home');
    $('#tab_1').html(
        '<h3>Basic Information:' + '</h3>' +
        '<h4>Growing Method: ' + getGrowingMethod(farm) + '</h4>' +
        '<h4>Operation: ' + getOperation(farm) + '</h4>' +
        '<h4>Selling Method: ' + getSellingMethod(farm) + '</h4>'
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
        '<p>  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>'
    );

    // set modal tab 4 html
    $('#tab_4_title').html('Menu 4');
    $('#tab_4').html(
        '<h3>MENU3</h3>' +
        '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>'
    );

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
    for (var i = 0; i < recipe.ingredients.length; i++) {
    ingredient_list += "<li>" + recipe.ingredients[i].text + "</li>";
    }
ingredient_list += "</ul>";
// compile tab 2 data
var health_list = '<ul style="padding:15px;">';
    for (var i = 0; i < recipe.digest.length; i++) {
    health_list += "<li>" +
        recipe.digest[i].label +
        '<span class="pull-right">' +
            Math.round(recipe.digest[i].total * 10) / 10 +
            recipe.digest[i].unit +
        "</span></li>";
        }
    health_list += "</ul>";
    // compile tab 3 data
    var nutrient_list = '<ul style="padding:15px;">';
        for (var key in recipe.totalDaily) {
        //if (!recipe.totalDaily.hasOwnProperty(key)) continue;
        nutrient_list += '<li>' +
            recipe.totalDaily[key].label +
            '<span class="pull-right">' +
                Math.round(recipe.totalNutrients[key].quantity * 10) / 10 +
                recipe.totalNutrients[key].unit + ' (' +
                Math.round(recipe.totalDaily[key].quantity * 10) / 10 +
                recipe.totalDaily[key].unit +
            ")</span></li>";
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
        $("#generic_modal").modal()
        }

function callIndexApi2(operations) {
    document.getElementById("farmList").innerHTML = "";
    // var test = ["lamb", "duck"];
    var call_url = "http://localhost:3000/api/v1/farms/farm_by_operation";
    $.ajax({
        type: "POST",
        url: call_url,
        data: JSON.stringify({"farms": {"operations": operations}}),
        headers: {
            'X-Auth-Token': lfc_key
        },
        dataType: 'json',
        contentType: 'application/json',
        crossDomain: true,
        async: false,
        success: function(result) {
            if (result != null || result.length > 0) {
                console.log("LENGTH" + result.length);
                handleIndexCall2(result);
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

function handleIndexCall2(result) {
    // set to new map
    farms = {};
    var farm;
    for (var i = 0; i < result.length; i++) {
        console.log(result[i]);
        farm = result[i][0];
        // create id
        if (!farm) {
            continue;
        }
        var id = "farm_" + farm.id;
        console.log(farm.id);

        // add to map
        farms[id] = result[i];
    //     // append card
        $('#farmList').append('<li id="' + id + '" class="list-group-item justify-content-between"> ' +
            '<h4 class="card-title">' + farm.name + '</h4>' +
            '<h6 class="card-subtitle mb-2 text-muted">' + farm.address + '</h6>' +
            '<p class="card-text">CSA, Wholesale, and Farmers Market</p>' +
            '<a href="#" class="card-link">' + farm.url + '</a> | ' +
            '<a href="#" class="card-link">' + farm.phone + '</a>' +
            '</li>'
        );
    //     // on click to show modal
        $('#' + id).on('click', function() {
            var new_id = this.getAttribute('id');
            setAndShowFarmModal(farms[new_id]);
        });

    //     // add marker at proper placec
        geocodeAddressAndAddMarker(farm);
    }
}


function handleIndexCall3(result) {
    // set to new map
    farms = {};
    var farm;
    console.log("In IndexCall3");
    for (var i = 0; i < result.length; i++) {
        console.log(result[i]);
        farm = result[i];
        // create id
        if (!farm) {
            continue;
        }
        var id = "farm_" + farm.id;
        console.log("ID" + farm.id);

        // add to map
        farms[id] = result[i];
    //     // append card
        $('#farmList').append('<li id="' + id + '" class="list-group-item justify-content-between"> ' +
            '<h4 class="card-title">' + farm.name + '</h4>' +
            '<h6 class="card-subtitle mb-2 text-muted">' + farm.address + '</h6>' +
            '<p class="card-text">CSA, Wholesale, and Farmers Market</p>' +
            '<a href="#" class="card-link">' + farm.url + '</a> | ' +
            '<a href="#" class="card-link">' + farm.phone + '</a>' +
            '</li>'
        );
    //     // on click to show modal
        $('#' + id).on('click', function() {
            var new_id = this.getAttribute('id');
            setAndShowFarmModal(farms[new_id]);
        });

    //     // add marker at proper placec
        geocodeAddressAndAddMarker(farm);
    }
}

