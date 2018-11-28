function handleIndexCall(result) {
    document.getElementById("card-grid").innerHTML = "";
    // set to new map
    farms = {};
    for (var i = 0; i < result.length; i++) {
        // create id
        var id = "farm_" + result[i].id;

        // add to map
        //farms[id] = result[i];
        // append card
        $('#card-grid').append('<div class="card">' +
            '<h3 class="card-name">' + result[i].name + '</h3><p>' +
            '<span class="card-address">' + result[i].address + '</br>' +
            //'<p class="card-text">CSA, Wholesale, and Farmers Market</p>' +
            '<a href=tel:'+ result[i].phone + ' class="card-phone">' + result[i].phone + '</a> | ' +
            '<a href=http://'+ result[i].url + ' class="card-website">' + result[i].url + '</a> ' +
            '</p></div>'
        );
        // on click to show modal
        //var isignore = false;

        $('#' + id).on('click', function() {

            var new_id = this.getAttribute('id');

            // alter html in modal
            //setAndShowFarmModal(farms[new_id]);
        });

        $('.card-link').on('click', function(e) {
            e.stopPropagation();
        });

        // add marker at proper placec
        //geocodeAddressAndAddMarker(result[i]);
    }
}

function callIndexApi() {
    document.getElementById("card-grid").innerHTML = "";

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
                console.log(result)
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
function showMarkers(result){
    for (var i = 0; i < result.length; i++) {
        // add marker at proper placec
        geocodeAddressAndAddMarker(result[i]);
    }
}