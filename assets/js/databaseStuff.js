let current_map_id = null;
let maplist = [];

function getMaplist() {
    $("#maplist").html('<li><i class="fas fa-circle-notch fa-spin fa-3x" style="color: #ffffff;" class="btn"></i></li>');
    $.ajax({
        url: "assets/php/list.php",
        type: "get",
        dataType: "json"
    }).done((data) => {
        $("#maplist").empty();
        for (const i in data) {
            const current_map = data[i];

            maplist.push(data.id);
            let id = current_map.id;
            let name = current_map.name;
            let thumb = current_map.thumb;
            $("#maplist").append('<li onclick="setMap(' + id + ')"><a href="#">' + name + '</a><img src="data:image/jpg;base64,' + thumb + '" class="map-picture"><img></li>');
        };
    }).fail((error) => {
        $("#maplist").html('<li><i class="fas fa-times fa-3x" style="color: #ff0000;" class="btn"></i></li>');
    })
};

function getMap(id, callback) {

    $(".map").empty();
    $(".map").html('<i class="fas fa-circle-notch fa-spin fa-7x" style="color: #48284aff; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);" class="btn"></i>');
    $.ajax({
        url: "assets/php/read.php?id=" + id,
        type: "get",
        dataType: "json"
    }).done((data) => {

        current_map_id = data.id;
        let map = JSON.parse(data.map);
        $('#MapNameTextBox').val(data.name)

        if(typeof callback === 'function') {
            callback(map);
        }

    }).fail((error) => {
        $(".map").html('<i class="fas fa-times fa-7x" style="color: #ff0000;" class="btn"></i>');
    })
};

function deleteMapinDB(){

    $.ajax({
        url: "assets/php/delete.php",
        type: "POST",
        data: {
            id: current_map_id
        }
    }).done((data) => {

        getMaplist();

    }).fail((error) => {
        alert("wrong Map ID")
    })
};

function createMapinDB(map){

    $.ajax({
        url: "assets/php/create.php",
        type: "POST",
        data: {
            map: JSON.stringify(map),
            mapname: $('#MapNameTextBox').val()
        }
    }).done((data) => {

        getMaplist();

    }).fail((error) => {
        alert("cant access db")
    })
};


function updateMapinDB(map){

    $.ajax({
        url: "assets/php/delete.php",
        type: "POST",
        data: {
            id: current_map_id,
            mapname: $('#MapNameTextBox').val(),
            map: current_map_id,
        }
    }).done((data) => {

        getMaplist();

    }).fail((error) => {
        alert("wrong Map ID")
    })
};