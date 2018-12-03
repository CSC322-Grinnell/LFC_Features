//Save for Recipe pages, not in use right now


/*************************
 *  RECIPE API FUNCTIONS *
 * ***********************/
function callFood2Fork(food_string, checkRecipeValues) {
    // clear the html to get rid of old recipes
    $("#recipe_grid").html("");
    var call_url = "https://api.edamam.com/search?q=" + food_string + "&app_id=" + edemam_app_id + "&app_key=" + edemam_app_key;
    var health_query = "";
    for (var i = 0; i < checkRecipeValues.length; i++) {
        if (i != checkRecipeValues.length - 1) {
            health_query += checkRecipeValues[i] + ',%20';
        }
    }
    if (checkRecipeValues.length > 0) {
        call_url += "&healthLabels=" + health_query;
    }
    // make call
    $.ajax({
        type: "GET",
        url: call_url,
        headers: {
            //   "Access-Control-Allow-Origin":"*"
            "more": true,
        },
        dataType: 'json',
        //contentType: 'text/plain;charset=UTF-8',
        crossDomain: true,
        //async: false,
        success: function(result) {
            if (result != null && result.hits.length > 0) {
                handleRecipeAPICall(result.hits);
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

function handleRecipeAPICall(recipe_list) {

    // reset recipe list
    recipes = {};

    // iterate through
    for (var i = 0; i < recipe_list.length; i++) {

        // get current recipe and id
        var current_recipe = recipe_list[i].recipe;
        var id = "recipe_" + (i + 1);

        // put in recipe list
        recipes[id] = current_recipe;

        // add html
        $('#recipe_grid').append(
            '<div id="' + id + '" class="card scrollmenu-item"> ' +
            '<img class="recipe_image" src="' + current_recipe.image + '" height="" width="100%"></img>' +
            '<div class="scrollmenu-item-section">' +
            '<h4 class="card-title">' + current_recipe.label + '</h4>' +
            '<h6 class="card-subtitle mb-2 text-muted">' + current_recipe.source + '</h6>' +
            '<a href="' + current_recipe.url + '" class="card-link">Go to recipe</a>' +
            '</div' +
            '</li>'
        );

        // on click to show modal
        $('#' + id).on('click', function() {
            var new_id = this.getAttribute('id');
            // alter html in modal
            setAndShowRecipeModal(recipes[new_id]);
        });
    }
}