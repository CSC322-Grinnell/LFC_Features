// To enable jquery for rails
//= require jquery
//= require jquery_ujs
//= require_tree .
//= require moment

var map;
var geocoder;

var FARMS_API_URL = "/api/v2/farms"

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
     if(window.location.pathname == '/') {
        set_up_search();
        initialize_farms();
    }
});

/**
 Set up farm cards
 **/
function initialize_farms() {
    callIndexApi(FARMS_API_URL, Visualize_Farm)
}
