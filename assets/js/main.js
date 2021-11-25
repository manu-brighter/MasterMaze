$(() => {

    // variables
    const choosemap = GAME_MAP1;
    const isDiagonalAllowed = false;

    // init
    iniateSliders();

    // display map
    loadMap(choosemap);
    
    // size map
    mapSizer(min_value, min_value);

    // calculate path and put it in the map
    //const wayback = pathFind(choosemap, isDiagonalAllowed);
    //const map = getNewMap(choosemap, wayback);
});