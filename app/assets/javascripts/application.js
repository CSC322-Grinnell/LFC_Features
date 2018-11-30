// To enable jquery for rails
//= require jquery
//= require jquery_ujs
//= require_tree .
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
    init();
});

/**
 Set up on_click for search farm
 **/
function init() {
    
    var input = document.getElementById("search-text-home");
      input.addEventListener("keypress", function(event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("search-button-home").click();
        }
      }, false);

    // set up farm search
    $('#search-button-home').on('click', function()  {
        var farms = [];
        var text = $('#search-text-home').val();
        var call_url = "/farms/farm_json";
        //Make an ajax call to retrieve information about farms
         callIndexApi(call_url, handlesearch, text)
    })
    initialize_farms()
}

/**
 Set up farm cards
 **/
function initialize_farms() {

    var call_url = "/farms/farm_json";
    callIndexApi(call_url, Visualize_Farm)
}




