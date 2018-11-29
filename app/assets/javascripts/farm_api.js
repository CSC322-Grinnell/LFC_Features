function handleIndexCall(result) {
  // clear contents of card-grid before displaying results of search
  document.getElementById("card-grid").innerHTML = "";
  /*global $*/

  for (var i = 0; i < result.length; i++) {

    var cur_farm = result[i];
    var id = "farm_" + cur_farm.id; // create id

    var farm_name = cur_farm.name;
    var farm_address = cur_farm.address;
    var farm_phone = cur_farm.phone;
    var farm_url = cur_farm.url;

    // create the farm card for the current farm
    var farm_card = document.createElement("div");
    $(farm_card).addClass("card");

    // if the farm has a name, add it to the card
    if (farm_name.length > 0) {
      var card_name = document.createElement("h3");
      $(card_name).addClass("card-name");
      card_name.append(farm_name);
      farm_card.append(card_name);
    }

    // if the farm has an address phone or url...
    if (farm_address.length > 0 || farm_phone.length > 0 || farm_url.length > 0 ) {
      // create a p element: card_info
      var card_info = document.createElement("p");
      $(card_info).addClass("card-info");

      // if the farm has an address, add it to card_info
      if (farm_address.length > 0) {
        card_info.append(farm_address);
      }

      // if the farm has a phone, add it to card_info
      if (farm_phone.length > 0) {
        var card_phone = document.createElement("a");
        card_phone.append(farm_phone);
        $(card_phone).attr("href", 'tel:'+farm_phone); // add and format phone link to element
        card_info.append(card_phone);
      }

      // if the farm has a url, add it to card_info
      if (farm_url.length > 0) {
        var card_url = document.createElement("a");
        card_url.append(farm_url);
        $(card_url).attr("href", farm_url);
        card_info.append(card_url);
      }

      // add card_info to the farm_card
      farm_card.append(card_info);
    }

    // add the farm_card to the grid
    $('#card-grid').append(farm_card);
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