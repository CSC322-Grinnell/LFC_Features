
// To enable jquery for rails
//= require jquery

var map;
var geocoder;
var farms = {};
var recipes = {};

/***********
 * API_KEYS *
 ***********/
 var edemam_app_id = "0649d198";
 var edemam_app_key = "77bd12dd099e7f2c02338006ef659724";
 var lfc_key = "YAS0sY2rbi";


 $(document).ready(function() {
    $(".dropdown-menu li a").click(function() {
        $("#category_button").text($(this).text());
    });
});


/********
 * INIT *
 ********/
 $(window).load(function() {
    init();
});

/**
    Set up on_click for search farm and search recipe
    **/
    function init() {

        var checkboxesList = document.getElementsByName("checkboxList");

        for(var i = 0; i < checkboxesList.length; i++){
            checkboxesList[i].checked = true;
        }
    // set up recipe search
    document.getElementById("search_recipes").onclick = function() {
        // Get checked values for dietary choises
        var checkedDietaryOptionsList = [];
        $('input[name=recipeCheckboxList]:checked').each(function() {
            checkedDietaryOptionsList.push($(this).val());
        });
        var text = $('#recipe_search_text').val();
        text = text.split(' ').join('%20')
        if (text != "") {
            callFood2Fork(text, checkedDietaryOptionsList);
        }
    };

    // set up farm search
    document.getElementById("search_farm").onclick = function() {
        // Delete old markers on map
        DeleteMarkers();

        var search_by = $('#category_button').text();
        // Get checked values for operations
        var checkedOperations = [];
        $('input[name=checkboxList]:checked').each(function() {
            if ($(this).val() == "meat")
                checkedOperations.push("lamb", "beef", "chicken", "pork", "turkey");
            else if ($(this).val() == "agritourism")
                checkedOperations.push("agritourism", "hay", "row crop");
            else
                checkedOperations.push($(this).val());

        });

        // Get searech option
        var text = $('#search_farm_text').val();
        var search_by = $('#category_button').text();
        // Get farm by filtered operation
        var farms_operations;
        farms_operations = callIndexApi2(checkedOperations);
        if (search_by != "Address" && text.length == 0) {
            handleIndexCall2(farms_operations);
        }

        // Search by Address
        if (search_by == "Address") {
            // Set up map positions
            if (text != "") {
                geocoder.geocode({
                    'address': text
                }, function(results, status) {
                    if (status == 'OK') {
                        map.setCenter(results[0].geometry.location);
                        map.setZoom(17);
                        //map.panTo(curmarker.position);
                        var marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location
                        });
                        markers.push(marker);
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });

            }
        // Search by Farm's Name
    } else if (search_by == "Farm's Name" && text != "") {
        var farms = [];
        var call_url ="/farms/farm_json";
            // Get all farms
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
                        farms = handleAddressCall(result, text);
                        if (checkedOperations.length == 0) {
                            handleIndexCall3(farms);
                        } else {
                            var results = [];
                            if(!farms_operations[0].id) {
                                farms_operations = farms_operations[0];
                            }

                            if (farms_operations.length > farms.length) {
                                for (var i = 0; i < farms_operations.length; i++) {
                                    for (farm of farms) {
                                        if (farm.id == farms_operations[i].id) {
                                            results.push(farms_operations[i]);
                                        }
                                    }
                                }
                            } else {
                                for (var i = 0; i < farms.length; i++) {
                                    for (farm of farms_operations) {
                                        if (farm.id == farms[i].id) {
                                            results.push(farms[i]);
                                        }
                                    }
                                }
                            }
                            handleIndexCall3(results);

                        }
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
            //animation: google.maps.Animation.BOUNCE,
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
        animation: google.maps.Animation.BOUNCE,
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


/***********************
 *  FARM API FUNCTIONS *
 * *********************/
 function callIndexApi() {
    document.getElementById("farmList").innerHTML = "";

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
            '<a href=http://'+ result[i].url +' class="card-link">' + result[i].url + '</a> | ' +
            '<a href="#" class="card-link">' + result[i].phone + '</a>' +
            '</li>'
            );
        // on click to show modal
        //var isignore = false;

        $('#' + id).on('click', function() {

            var new_id = this.getAttribute('id');

            // alter html in modal
            setAndShowFarmModal(farms[new_id]);
        });

        $('.card-link').on('click', function(e) {
            e.stopPropagation();
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
        if ((name.toLowerCase()).includes(addressSearch.toLowerCase())) {
            farms.push(result[i]);
        }


    }

    return farms;


}

/*************************
 *  RECIPE API FUNCTIONS *
 * ***********************/

 function callFood2Fork(food_string, checkRecipeValues) {
    // clear the html to get rid of old recipes
    $("#recipe_grid").html("");
    var call_url = "https://api.edamam.com/search?q=" + food_string + "&app_id=" + edemam_app_id + "&app_key=" + edemam_app_key;
    var health_query = "";
    for (var i = 0; i < checkRecipeValues.length; i++) {
        if (i != checkRecipeValues.length - 1) {
            health_query += checkRecipeValues[i] + ',%20';
        }
    }
    if (checkRecipeValues.length > 0) {
        call_url += "&healthLabels=" + health_query;
    }
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
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
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
    if (!farm.operations) {
        farm = farm[0];
    }
    var primary_operation;
    var farm_operations = farm.operations;
    var primary_operation_id = farm.primary_operation_id;
    for (var operation of farm_operations) {
        if (operation.id == primary_operation_id) {
            primary_operation = operation.food;
        }
    }
    // set modal header html
    if (!farm.name) {
        farm = farm[0];
    }

    if (!primary_operation) {
        primary_operation = "N/A";
    } else {
        primary_operation = capitalize_words(primary_operation);
    }


    $('#modal_header').html('<h1 align="center">' + farm.name + '</h1>');

    // set modal tab 1 html
    $('#tab_1_title').html('Home');
    $('#tab_1').html(
        '<h3>Basic Information:' + '</h3>' +
        '<h4>Growing Method: ' + getGrowingMethod(farm) + '</h4>' +
        '<h4>Operation: ' + getOperation(farm) + '</h4>' +
        '<h4>Selling Method: ' + getSellingMethod(farm) + '</h4>' +
        '<h4>Primary Operation: ' + primary_operation + '</h4>'
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
    $('#tab_3_title').html('Media');
    $('#tab_3').html(
        '<h3>  Pictures/Video</h3>' +
        '<p>  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>'
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
    var return_value;
    document.getElementById("farmList").innerHTML = "";
    var call_url = "/api/v1/farms/farm_by_operation";
    $.ajax({
        type: "POST",
        url: call_url,
        data: JSON.stringify({
            "farms": {
                "operations": operations
            }
        }),
        headers: {
            'X-Auth-Token': lfc_key
        },
        dataType: 'json',
        contentType: 'application/json',
        crossDomain: true,
        async: false,
        success: function(result) {
            if (result != null || result.length > 0) {
                return_value = result;
                // handleIndexCall2(result);
            } else {
                alert("Your search query returned no results . . . ")
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);


        }
    });
    return return_value;

}



function handleIndexCall2(result) {
    // set to new map
    farms = {};
    var farm;
    for (var i = 0; i < result.length; i++) {
        var farm = result[i];

        // create id
        if (!farm) {
            continue;
        }
        var id = "farm_" + farm.id;
        // add to map
        farms[id] = result[i];
        // append card
        $('#farmList').append('<li id="' + id + '" class="list-group-item justify-content-between"> ' +
            '<h4 class="card-title">' + farm.name + '</h4>' +
            '<h6 class="card-subtitle mb-2 text-muted">' + farm.address + '</h6>' +
            '<p class="card-text">CSA, Wholesale, and Farmers Market</p>' +
            '<a href=http://'+ farm.url +' class="card-link">' + farm.url + '</a> | ' +
            '<a href="#" class="card-link">' + farm.phone + '</a>' +
            '</li>'
            );
         // on click to show modal

        $('#' + id).on('click', function() {

            var new_id = this.getAttribute('id');
            setAndShowFarmModal(farms[new_id]);
        });
        $('.card-link').on('click', function(e) {
            e.stopPropagation();

        });



         // add marker at proper placec
         geocodeAddressAndAddMarker(farm);
     }
 }


 function handleIndexCall3(result) {
    // set to new map
    farms = {};
    var farm;
    for (var i = 0; i < result.length; i++) {
        farm = result[i];
        // create id
        if (!farm) {
            continue;
        }
        var id = "farm_" + farm.id;

        // add to map
        farms[id] = result[i];
        //     // append card
        $('#farmList').append('<li id="' + id + '" class="list-group-item justify-content-between"> ' +
            '<h4 class="card-title">' + farm.name + '</h4>' +
            '<h6 class="card-subtitle mb-2 text-muted">' + farm.address + '</h6>' +
            '<p class="card-text">CSA, Wholesale, and Farmers Market</p>' +
            '<a href=http://'+ farm.url +' class="card-link">' + farm.url + '</a> | ' +
            '<a href="#" class="card-link">' + farm.phone + '</a>' +
            '</li>'
            );
        //     // on click to show modal


        $('#' + id).on('click', function() {

            var new_id = this.getAttribute('id');
            setAndShowFarmModal(farms[new_id]);
        });

        $('.card-link').on('click', function(e) {
            e.stopPropagation();
        });



        //     // add marker at proper placec
        geocodeAddressAndAddMarker(farm);
    }
}