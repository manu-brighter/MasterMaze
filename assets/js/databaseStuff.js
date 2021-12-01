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
            let name = current_map.name;
            let thumb = current_map.thumb;
            $("#maplist").append('<li onclick="setMap(' + i + ')"><a href="#">' + name + '</a><img src="data:image/jpg;base64,' + thumb + '" class="map-picture"><img></li>');
        };
    }).fail((error) => {
        $("#maplist").html('<li><i class="fas fa-times fa-3x" style="color: #ff0000;" class="btn"></i></li>');
    })
};


function getMap(id) {

    $(".map").empty();
    $(".map").html('<i class="fas fa-circle-notch fa-spin fa-7x" style="color: #ddddddff;" class="btn"></i>');
    $.ajax({
        url: "assets/php/read.php",
        type: "post",
        data: {
            id: id - 1
        },
        dataType: "json"
    }).done((data) => {

        let name = data.name;
        let map = data.map;


        console.log(name, map);


    }).fail((error) => {
        $(".map").html('<i class="fas fa-times fa-7x" style="color: #ff0000;" class="btn"></i>');
    })


};
