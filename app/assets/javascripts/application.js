// To enable jquery for rails
//= require jquery
//= require jquery_ujs
//= require_tree .
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


// $(document).ready(function() {
//     $(".dropdown-menu li a").click(function() {
//         $("#category_button").text($(this).text());
//     });
// });


/********
 * INIT *
 ********/
// $(window).on('load',function() {
//     init();
// });

/**
 Set up on_click for search farm and search recipe
 **/
function init() {


    // set up recipe search
    // document.getElementById("search_recipes").onclick = function() {
    //     // Get checked values for dietary choises
    //     var checkedDietaryOptionsList = [];
    //     $('input[name=recipeCheckboxList]:checked').each(function() {
    //         checkedDietaryOptionsList.push($(this).val());
    //     });
    //     var text = $('#recipe_search_text').val();
    //     text = text.split(' ').join('%20')
    //     if (text != "") {
    //         callFood2Fork(text, checkedDietaryOptionsList);
    //     }
    // };

    // set up farm search
    document.getElementById("search_farm").onclick = function() {
        DeleteMarkers();
        var farms = [];
        var text = $('#search_farm_text').val();
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
                    handlesearch(result, text);
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

/*************
 *  INIT MAP *
 * ***********/
// function initMap() {
//     // set location set to grinnell as center of map
//     var grinnell = {
//         lat: 41.7434,
//         lng: -92.7232
//     };

//     // init map
//     map = new google.maps.Map(document.getElementById('maptest'), {
//         zoom: 13.7,
//         center: grinnell
//     });

//     // init geocoder
//     geocoder = new google.maps.Geocoder();

//     // call index function for API to load all farms
//     //callIndexApi();
// }




