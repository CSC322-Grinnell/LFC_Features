function handleIndexCall(result) {
    document.getElementById("farmList").innerHTML = "";
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
            '<a href=http://'+ result[i].url + ' class="card-link">' + result[i].url + '</a> | ' +
            '<a href=tel:'+ result[i].phone + ' class="card-link">' + result[i].phone + '</a>' +
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