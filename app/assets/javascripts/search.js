// check if a string is empty, null or undefined
function isEmpty(str) {
  return (!str || 0 === str.length);
}
 // check if a string is blank
function isBlank(str) {
    return (/^\s*$/.test(str));
}
 // return true if a string is not empty and contains more than whitespace
function containsChars(str) {
  if (!isEmpty(str)) {
    return true;
  }
  else if (!isBlank(str)) {
    return true;
  }
  else {
    return false;
  }
}

/**
 Handle the search for farms
 @params 
 farms: result of ajax call, supposed to be a json array
 text: the search text
 **/
function handlesearch(result, text) {
    var farms = [];
    if(text==null){
        Visualize_Farm(farms);
        return;
    }
    for (var i = 0; i < result.length; i++) {
        // create id
        var farm_string = JSON.stringify(result[i]);
        // add to map
        if ((farm_string.toLowerCase()).includes(text.toLowerCase())) {
            farms.push(farms[i]);
        }


    }
    Visualize_Farm(farms);
    return farms;


}

/**
 visualize the farms cards in the front page
 @params 
 farms: result or filtered result of ajax call, supposed to be a json array
 **/
function Visualize_Farm(farms) {
  console.log(farms)
  /*global $*/
  // clear contents of card-grid before displaying results of search
  document.getElementById("card-grid").innerHTML = "";

  for (var i = 0; i < farms.length; i++) {

    var cur_farm = farms[i];
    var id = "farm_" + cur_farm.id; // create id

    var farm_name = cur_farm.name;
    var farm_address = cur_farm.address;
    var farm_phone = cur_farm.phone;
    var farm_url =  cur_farm.url;

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
        card_phone.append(" "+ farm_phone);
        $(card_phone).attr("href", 'tel:'+farm_phone); // add and format phone link
        card_info.append(card_phone);
      }

      // if the farm has a url, add it to card_info
      if (farm_url.length > 0) {
        var card_url = document.createElement("a");
        card_url.append(" "+farm_url);
        $(card_url).attr("href", "http://"+farm_url);
        card_info.append(card_url);
      }

      // add card_info to the farm_card
      farm_card.append(card_info);
    }

    // add the farm_card to the card-grid
    $('#card-grid').append(farm_card);
  }
}
