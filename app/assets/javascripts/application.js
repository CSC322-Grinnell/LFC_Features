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




/********
 * INIT *
 ********/
$(window).on('load',function() {
    init();
});

/**
 Set up on_click for search farm and search recipe
 **/
function init() {

    // set up farm search
    $('#search-button-home').on('click', function()  {
         var farms = [];
        var text = $('#search-text-home').val();
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
    })
    callIndexApi()
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




