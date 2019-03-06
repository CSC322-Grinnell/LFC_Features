// To enable jquery for rails
//= require jquery
//= require jquery_ujs
//= require_tree .
//= require moment 
//= require fullcalendar
//= require fullcalendar/locale-all

var map;
var geocoder;

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
    var call_url = "/farms/farm_json";
    callIndexApi(call_url, Visualize_Farm)
}



