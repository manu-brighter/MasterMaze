// min & max valu of the sliders
const min_value = 10;
const max_value = 100;
let isDiagonalAllowed = false;
let current_block_type = null;
let current_map = [];
let mouseDown = 0;

function blockSetter(x, y) {

    let map = current_map;
    let blocktype = null;
    blocktype = current_block_type === "dirt" ? " " : blocktype;
    blocktype = current_block_type === "stone" ? "#" : blocktype;
    blocktype = current_block_type === "start" ? "&" : blocktype;
    blocktype = current_block_type === "treasure" ? "X" : blocktype;

    if (blocktype != null) {
        if (mouseDown === 1) {
            if (blocktype === " " || blocktype === "#") {
                map[y][x] = blocktype;
            } else if (blocktype === "&" || blocktype === "X") {
                let block = getBlockByType(current_map, blocktype);
                if (typeof block !== "undefined") {
                    map[block.y][block.x] = " ";
                };

                map[y][x] = blocktype;
            };
        };
    };
    loadMap(map);
    current_map = map;

};

function solveMap() {
    clearFootsteps();
    // calculate path and put it in the map
    const wayback = pathFind(current_map, isDiagonalAllowed);
    const map = getNewMap(current_map, wayback);

    loadMap(map);
    current_map = map;

};

function mouseCheck() {
    document.body.onmousedown = function () {
        if (mouseDown === 0) {
            ++mouseDown;
        };
    };
    document.body.onmouseup = function () {
        --mouseDown;
    };
};

function setMapVar(map) {
    current_map = map;
};

function setDiagonalToTrue() {
    isDiagonalAllowed = true;
};

function setDiagonalToFalse() {
    isDiagonalAllowed = false;
};


function mapSizer(valueslider1, valueslider2) {

    const width = valueslider1;
    const height = valueslider2;

    const previous_map = current_map;
    const map = [];

    for (let i = 1; i <= height; i++) {
        let row = [];
        for (let s = 1; s <= width; s++) {
            row.push(" ");
        };

        //console.log(row);
        map.push(row);
    };

    for (const i in map) {

        if (typeof previous_map[i] !== "undefined") {
            const row = map[i];

            for (const s in row) {
                if (typeof previous_map[i][s] !== "undefined") {

                    map[i][s] = previous_map[i][s];
                };
            };
        };
    };

    loadMap(map);
    current_map = map;
    return;
};

function setBorders() {
    const map = current_map;

    for (const i in map) {
        const row = map[i];
        for (const s in row) {
            if (i == 0 || i == map.length - 1 || s == 0 || s == row.length - 1) {
                map[i][s] = "#";
            };

        };
    };

    current_map = map
    loadMap(map);
};

function clearMap() {
    const map = current_map;

    for (const i in map) {
        const row = map[i];
        for (const s in row) {
            map[i][s] = " ";
        };
    };

    current_map = map
    loadMap(map);
};

function clearMapToStone() {
    const map = current_map;

    for (const i in map) {
        const row = map[i];
        for (const s in row) {
            map[i][s] = "#";
        };
    };

    current_map = map
    loadMap(map);
};

function clearFootsteps() {
    const map = current_map;

    for (const i in map) {
        const row = map[i];
        for (const s in row) {
            const column = row[s]
            if (column === "N" ||
                column === "NE" ||
                column === "E" ||
                column === "SE" ||
                column === "S" ||
                column === "SW" ||
                column === "W" ||
                column === "NW") {
                map[i][s] = " ";
            };
        };
    };

    current_map = map
    loadMap(map);
};

function changeMouse(type) {

    $('body').on("click", "#stonebutton", () => {

    });

    const body = document.body;
    body.id = (body.id) ? body.id : 'body_id'; // ffox

    const loc = window.location.pathname;
    const dir = loc.substring(0, loc.lastIndexOf('/'));
    current_block_type = type;
    let src = dir + "/assets/img/" + type + "cursor.png";

    body.style.cursor = 'url(' + src + ') 16 16, default';
};

function dirtbutton() {
    changeMouse("dirt");
};

function stonebutton() {
    changeMouse("stone");
};

function startbutton() {
    changeMouse("start");
};

function treasurebutton() {
    changeMouse("treasure");
};

function iniateSliders() {

    let valueslider1 = min_value;
    let valueslider2 = min_value;

    $(function () {
        let handle1 = $("#custom-handle1");
        $("#slider1").slider({

            max: max_value,
            min: min_value,
            change: function (event, ui) {
                valueslider1 = ui.value;
                mapSizer(valueslider1, valueslider2);
            },
            create: function () {
                handle1.text($(this).slider("value"));
            },
            slide: function (event, ui) {
                handle1.text(ui.value);
            }
        });
    });

    $(function () {
        let handle2 = $("#custom-handle2");
        $("#slider2").slider({

            max: max_value,
            min: min_value,
            change: function (event, ui) {
                valueslider2 = ui.value;
                mapSizer(valueslider1, valueslider2);
            },
            create: function () {
                handle2.text($(this).slider("value"));
            },
            slide: function (event, ui) {
                handle2.text(ui.value);
            }
        });
    });

};