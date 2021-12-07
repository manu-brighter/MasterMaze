$(() => {

    // init
    iniateSliders();
    getMap(null, (map) => {
        loadMap(map);
        current_map = map;
        
        mouseCheck();
        getMaplist();

        mapSizer(min_value, min_value);
    });
    

    // generate map
    //generateNewMap(startermap);

    // size map


});
