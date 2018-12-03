//Used for modal, disgarded right now, may be used later

/********************
 *  MODAL FUNCTIONS *
 * ******************/
function capitalize_words(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function getOperation(farm) {
    var result = "";
    if (!farm.operations) {
        farm = farm[0];
    }
    for (var i = 0; i < farm.operations.length; i++) {
        result += capitalize_words(farm.operations[i].food);
        if (i != farm.operations.length - 1) {
            result += ', ';
        }
    }

    if (result == "") {
        return "N/A"
    }
    return result;
}

function getGrowingMethod(farm) {
    var result = "";
    if (!farm.growing_methods) {
        farm = farm[0];
    }
    for (var i = 0; i < farm.growing_methods.length; i++) {
        result += capitalize_words(farm.growing_methods[i].grow_method);
        if (i != farm.growing_methods.length - 1) {
            result += ', ';
        }
    }
    if (result == "") {
        return "N/A"
    }
    return result
}

function getSellingMethod(farm) {
    var result = "";
    if (!farm.selling_methods) {
        farm = farm[0];
    }
    for (var i = 0; i < farm.selling_methods.length; i++) {
        result += capitalize_words(farm.selling_methods[i].sell_method);
        if (i != farm.selling_methods.length - 1) {
            result += ', ';
        }
    }

    if (result == "") {
        return "N/A"
    }
    return result;
}

function setAndShowFarmModal(farm) {
    if (!farm.operations) {
        farm = farm[0];
    }
    var primary_operation;
    var farm_operations = farm.operations;
    var primary_operation_id = farm.primary_operation_id;
    for (var operation of farm_operations) {
        if (operation.id == primary_operation_id) {
            primary_operation = operation.food;
        }
    }
    // set modal header html
    if (!farm.name) {
        farm = farm[0];
    }

    if (!primary_operation) {
        primary_operation = "N/A";
    } else {
        primary_operation = capitalize_words(primary_operation);
    }


    $('#modal_header').html('<h1 align="center">' + farm.name + '</h1>');

    // set modal tab 1 html
    $('#tab_1_title').html('Home');
    $('#tab_1').html(
        '<h3>Basic Information:' + '</h3>' +
        '<h4>Growing Method: ' + getGrowingMethod(farm) + '</h4>' +
        '<h4>Operation: ' + getOperation(farm) + '</h4>' +
        '<h4>Selling Method: ' + getSellingMethod(farm) + '</h4>' +
        '<h4>Primary Operation: ' + primary_operation + '</h4>'
    );

    // set modal tab 2 html
    $('#tab_2_title').html('Contact');
    var tab_2_html = '';
    if(farm.address){
        tab_2_html = tab_2_html + '<h4 align="center"><span class="glyphicon glyphicon-home"></span>  ' + farm.address + '</h4>';
    }
    if(farm.phone){
        tab_2_html = tab_2_html + '<h4 align="center"><span class="glyphicon glyphicon-earphone"></span>  ' + farm.phone + '</h4>';
    }
    tab_2_html = tab_2_html+'<div style="text-align: center">' ;
    if(farm.url){
        tab_2_html = tab_2_html + '<a href="http://' + farm.url + '"> Visit our webpage </a>';
    }
    if(farm.facebook){
        tab_2_html = tab_2_html + '<a href="http://' + farm.facebook + '">| Facebook </a>';
    }
    if(farm.twitter){
        tab_2_html = tab_2_html + '<a href="http://' + farm.twitter + '">| Twitter</a>';
    }
    tab_2_html += '</div>';


    $('#tab_2').html(
        tab_2_html
    );

    // set modal tab 3 html
    $('#tab_3_title').html('Media');
    $('#tab_3').html(
        '<h3>  Pictures/Video</h3>' +
        '<p>  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>'
    );


    // show button
    $('#contact_button').show();
    $('#recipe_link_button').hide();

    // show modal
    $("#generic_modal").modal()
}

function setAndShowRecipeModal(recipe) {
    // set modal header html
    $('#modal_header').html(
        '<h1 align="center">' + recipe.label + '</h1>' +
        '<p align="center">' + recipe.source + '</p>'
    );
    // compile tab 1 data
    var ingredient_list = '<ul style="padding:15px;">';
    for (var i = 0; i < recipe.ingredients.length; i++) {
        ingredient_list += "<li>" + recipe.ingredients[i].text + "</li>";
    }
    ingredient_list += "</ul>";
    // compile tab 2 data
    var health_list = '<ul style="padding:15px;">';
    for (var i = 0; i < recipe.digest.length; i++) {
        health_list += "<li>" +
            recipe.digest[i].label +
            '<span class="pull-right">' +
            Math.round(recipe.digest[i].total * 10) / 10 +
            recipe.digest[i].unit +
            "</span></li>";
    }
    health_list += "</ul>";
    // compile tab 3 data
    var nutrient_list = '<ul style="padding:15px;">';
    for (var key in recipe.totalDaily) {
        //if (!recipe.totalDaily.hasOwnProperty(key)) continue;
        nutrient_list += '<li>' +
            recipe.totalDaily[key].label +
            '<span class="pull-right">' +
            Math.round(recipe.totalNutrients[key].quantity * 10) / 10 +
            recipe.totalNutrients[key].unit + ' (' +
            Math.round(recipe.totalDaily[key].quantity * 10) / 10 +
            recipe.totalDaily[key].unit +
            ")</span></li>";
    }
    nutrient_list += "</ul>";
    // compile tab 4 data
    // set all modal tabs html content
    $('#tab_1_title').html('Ingredients');
    $('#tab_1').html(ingredient_list);
    $('#tab_2_title').html('Health Information');
    $('#tab_2').html(health_list);
    $('#tab_3_title').html("Nutrients");
    $('#tab_3').html(nutrient_list);
    // hide button
    $('#contact_button').hide();
    $('#recipe_link_button').show();
    $('#recipe_link_tag').attr("href", recipe.url);
    // show modal
    $("#generic_modal").modal()
}