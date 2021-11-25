// min & max valu of the sliders
const min_value = 10;
const max_value = 100;
let current_block_type = null;
let current_map = [];

function blockSetter(x, y){

    let map = current_map;
    let blocktype = null;
    blocktype = current_block_type === "dirt" ? " " : blocktype;
    blocktype = current_block_type === "stone" ? "#" : blocktype;
    blocktype = current_block_type === "start" ? "&" : blocktype;
    blocktype = current_block_type === "treasure" ? "X" : blocktype;

    if (blocktype != null){
    map[y][x] = blocktype;
    };
    loadMap(map);

};







function mapSizer(valueslider1, valueslider2){

    const width = valueslider1;
    const height = valueslider2;
    
    const map = [];

    for (var i = 1; i <= width; i++) {
        let row = [];
        for (var s = 1; s <= height; s++) {
            row.push("D");
        };

        //console.log(row);
        map.push(row);
    };

    loadMap(map);
    current_map = map;
    return;
};

function changeMouse(type){

    $('body').on("click", "#stonebutton", () => {

    });

    const body = document.body; 
    body.id = ( body.id ) ? body.id : 'body_id'; // ffox

    const loc = window.location.pathname;
    const dir = loc.substring(0, loc.lastIndexOf('/'));
    current_block_type = type;
    let src = dir + "/assets/img/" + type + "cursor.png";

    body.style.cursor = 'url(' + src + ') 16 16, default';
};

function dirtbutton(){
    changeMouse("dirt");
};
function stonebutton(){
    changeMouse("stone");
};
function startbutton(){
    changeMouse("start");
};
function treasurebutton(){
    changeMouse("treasure");
};

function iniateSliders(){

    let valueslider1 = min_value;
    let valueslider2 = min_value;

    $(function () {
        var handle1 = $("#custom-handle1");
        $("#slider1").slider(
        {

            max: max_value,
            min: min_value,
            change: function(event, ui){
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
        var handle2 = $("#custom-handle2");
        $("#slider2").slider(   
        {

            max: max_value,
            min: min_value,
            change: function(event, ui){
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