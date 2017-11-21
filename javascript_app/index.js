var map;

init();

function init() {
    // set up on click
    document.getElementById("searchButton").onclick = callApi;
}

function initMap() {
    var grinnell = {
        lat: 41.7434,
        lng: -92.7232 };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: grinnell
    });

    var marker = new google.maps.Marker({
        position: grinnell,
        map: map
    });

    callApi();
}

function callApi() {

    document.getElementById("farmList").innerHTML = "";

    var call_url = "http://localhost:3000/farms/farm_json"
	$.ajax({
    	type: "GET",
        url: call_url,
        headers: {
            //'Access-Control-Allow-Origin': 'true',
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

        $('#farmList').append('<li class="list-group-item justify-content-between"> ' +
            '<h4 class="card-title">' + result[i].name + '</h4>' +
            '<h6 class="card-subtitle mb-2 text-muted">' + result[i].address + '</h6>' +
            '<p class="card-text">CSA, Wholesale, and Farmers Market</p>' +
            '<a href="#" class="card-link">' + result[i].url + '</a> | ' +
            '<a href="#" class="card-link">' + result[i].phone + '</a>' +
            '</li>'
        );

        new google.maps.Marker({
            position: {lat: 41.7434 + i*2, lng: -92.7232 + i*2 },
            title: result[i].name,
            map: map
        });
    }
}
