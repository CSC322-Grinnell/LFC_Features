// return true if a string is empty or only contains whitespace
function isEmpty(str) {
  return (!str || str.length === 0 || !str.trim());
}


// return true if a string is not empty and contains more than whitespace
function containsChars(str) {
  return !isEmpty(str);
}


/**
 Set up on_click for search farm
 **/
function set_up_search() {
    var input = document.getElementById("search-text-home");
    if(input != null){
      /* Use the enter key to click the search button */
      input.addEventListener("keypress", function(event) {
      if (event.keyCode == 13) { // 13 is the ascii key-code for 'enter'
        event.preventDefault();
        document.getElementById("search-button-home").click();
        }
      }, false);
    }

    // set up farm search
    $('#search-button-home').on('click', function()  {
        var farms = [];
        var text = $('#search-text-home').val();
        var call_url = "/farms/farm_json";
        //Make an ajax call to retrieve information about farms
        callIndexApi(FARMS_API_URL, handlesearch, text);
    })
}

/**
 Handle the search for farms
 @params
 result: result of ajax call, supposed to be a json array
 text: the search text
 **/
function handlesearch(result, text) {
    var farms = [];
    if(text==null){
        Visualize_Farm(result);
        return;
    }
    for (var i = 0; i < result.length; i++) {
      // Convert the json into a string
      var farm_string = JSON.stringify(result[i]);
        var farm_id = result[i]["id"];
        // search whether the string include the text
        if ((farm_string.toLowerCase()).includes(text.toLowerCase())) {
            farms.push(result[i]);
        }
    }
    Visualize_Farm(farms);
    geocodeRecenterAndAddMarker(farms);
    return farms;

}

/**
 visualize the farms cards in the front page
 @params
 result: result or filtered result of ajax call, supposed to be a json array
 **/
function Visualize_Farm(result) {
  /*global $*/
  // clear contents of card-grid before displaying results of search
  document.getElementById("card-grid").innerHTML = "";

  for (var i = 0; i < result.length; i++) {

    var cur_farm = result[i];
    var id = "farm_" + cur_farm.id; // create id

    var farm_name = cur_farm.name;
    var farm_address = cur_farm.address;
    var farm_phone = cur_farm.phone;
    var farm_url = cur_farm.url;
    let farm_id = cur_farm.id;



    // create the farm card for the current farm
    var farm_card = document.createElement("div");
    $(farm_card).addClass("card");
    //var card_link = document.createElement("a");
    //$(farm_card).attr("href", BASE_URL+'map'); // add and format website link
    $(farm_card).attr('id', id);



    // if the farm has a name, add it to the card
    if (containsChars(farm_name)) {
      var card_name = document.createElement("h3");
      $(card_name).addClass("card-name");
      card_name.append(farm_name);
      farm_card.append(card_name);
    }

    // if the farm has an address phone or url...
    if (containsChars(farm_address) || containsChars(farm_phone) || containsChars(farm_url) ) {

      // if the farm has an address, add it to the card
      if (containsChars(farm_address)) {
        var card_address = document.createElement("p");
        card_address.append(farm_address);
        farm_card.append(card_address);
      }

      // if the farm has a phone and a url, add them to the card with a pipe between them
      if (containsChars(farm_phone) && containsChars(farm_url)) {
        var card_contact_info = document.createElement("p");
        var card_phone_link = document.createElement("a");
        var card_url_link = document.createElement("a");

        card_phone_link.append(farm_phone);
        $(card_phone_link).attr("href", 'tel:'+farm_phone); // add and format phone link

        card_url_link.append(farm_url);
        $(card_url_link).attr("href", 'http://'+farm_url); // add and format website link

        card_contact_info.append(card_phone_link);
        card_contact_info.append(" | "); // spacer between phone and url
        card_contact_info.append(card_url_link);
        farm_card.append(card_contact_info);
      }

      else if (containsChars(farm_phone)) {
        var card_phone = document.createElement("p");
        var card_phone_link = document.createElement("a");

        card_phone_link.append(farm_phone);
        $(card_phone_link).attr("href", 'tel:'+farm_phone); // add and format phone link

        card_phone.append(card_phone_link);
        farm_card.append(card_phone);
      }

      else if (containsChars(farm_url)) {
        var card_url = document.createElement("p");
        var card_url_link = document.createElement("a");

        card_url_link.append(farm_url);
        $(card_url_link).attr("href", 'http://'+farm_url); // add and format website link

        card_url.append(card_url_link);
        farm_card.append(card_url);
      }
    }

    // add the farm_card to the card-grid
    $('#card-grid').append(farm_card);

    //Add the link to each farmers own page
    $('#' + id).on('click', function() {
      window.location.href = BASE_URL+'farms/'+farm_id
    });

  }
}
