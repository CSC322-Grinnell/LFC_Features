function handlesearch(result, text) {
    farms = [];

    if(text==null){
        handlesearch(result);
        return;
    }
    for (var i = 0; i < result.length; i++) {
        // create id
        var farm_string = JSON.stringify(result[i]);
        // add to map
        if ((farm_string.toLowerCase()).includes(text.toLowerCase())) {
            farms.push(result[i]);
        }


    }
    handleIndexCall(farms);
    return farms;


}