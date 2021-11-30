$(() => {

    // variables
    const startermap = GAME_MAP4;

    // init
    iniateSliders();
    setMapVar(startermap);
    mouseCheck();

    // display map
    loadMap(startermap);

    // generate map
    //generateNewMap(startermap);

    // size map
    mapSizer(min_value, min_value);

});