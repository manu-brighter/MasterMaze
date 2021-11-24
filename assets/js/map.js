// Test Maps
// Clean Testmap
const GAME_MAP1 = [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", " ", " ", " ", " ", " ", "#", " ", " ", "#"],
    ["#", " ", "#", " ", " ", "#", "#", "#", " ", "#"],
    ["#", " ", "#", " ", "#", "#", " ", " ", " ", "#"],
    ["#", " ", "#", " ", " ", " ", " ", "#", " ", "#"],
    ["#", " ", "#", "#", "#", "#", "#", "#", " ", "#"],
    ["#", " ", " ", " ", " ", "#", " ", " ", " ", "#"],
    ["#", " ", "#", "#", " ", "#", " ", "#", "#", "#"],
    ["#", " ", "#", "X", " ", "#", " ", " ", "&", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
];
// Update Problem Test Map 1
const GAME_MAP2 = [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "&", " ", " ", " ", " ", "#", " ", " ", "#"],
    ["#", " ", " ", " ", "#", " ", "#", " ", " ", "#"],
    ["#", " ", " ", " ", "#", " ", "#", " ", " ", "#"],
    ["#", "#", "#", "#", "#", " ", "#", "#", " ", "#"],
    ["#", " ", "#", " ", " ", " ", " ", "#", " ", "#"],
    ["#", " ", " ", " ", "#", "#", " ", " ", " ", "#"],
    ["#", " ", " ", " ", "#", "#", "#", "#", " ", "#"],
    ["#", " ", "#", " ", " ", "#", " ", " ", "X", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
];

// Update Problem Test Map 2 (Video)
const GAME_MAP3 = [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", " ", " ", " ", " ", " ", " ", " ", "#", "#"],
    ["#", " ", " ", " ", "#", "#", " ", "X", "#", "#"],
    ["#", " ", " ", " ", " ", "#", " ", " ", "#", "#"],
    ["#", " ", "&", " ", " ", " ", " ", " ", "#", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", " ", " ", " ", "#", "#", " ", " ", " ", "#"],
    ["#", " ", " ", " ", "#", "#", "#", "#", " ", "#"],
    ["#", " ", "#", " ", " ", "#", " ", " ", " ", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
];


$(() => {

    const choosemap = GAME_MAP1;

    loadMap(choosemap);

    mapSizer(min_value, min_value);

    /*
    const wayback = pathFind(choosemap, false);
    const map = getNewMap(choosemap, wayback);
    loadMap(map);

    */
});



function renderMap() {
    $(".map").find(".block").each((index, el) => {
        const blockX = $(el).data("x");
        const blockY = $(el).data("y");
        const posX = blockX * 50;
        const posY = blockY * 50;
        $(el).css({
            left: posX + "px",
            top: posY + "px"
        })
    });
}

function loadMap(data) {
    // Clear Old Map
    $('.map').empty();

    // Block Map
    const blocks = {
        "D": "default",
        "#": "stone",
        " ": "dirt",
        "X": "treasure",
        "&": "start",
        "N": "walk north",
        "NE": "diagonalwalk west",
        "E": "walk east",
        "SE": "diagonalwalk north",
        "S": "walk south",
        "SW": "diagonalwalk east",
        "W": "walk west",
        "NW": "diagonalwalk south"
    }

    // Build Map from Array
    for (let y in data) {
        const col = data[y];
        for (let x in col) {
            const block = col[x];
            $(".map").append('<div class="block ' + blocks[block] + '" data-x="' + x + '" data-y="' + y + '"></div>')
        }
    }

    // Render Map
    renderMap();
}