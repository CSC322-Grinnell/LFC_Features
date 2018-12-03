/****************************************
 * API CALLS functions
 * **************************************/
/**
 make a api call 
 @param 
 call_url: the url to retrieve messages from
 callback: a callback function for the returned message
 params: other parameters may be included in the callback functions
 **/
function callIndexApi(call_url, callback,params) {
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
                callback(result,params);
            } 
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        }
    });

}