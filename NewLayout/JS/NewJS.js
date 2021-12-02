$(document).ready(function () {

  let i = 1;

  $("#menu-left-toggle").click(function (e) {
    e.preventDefault();
    getMaplist();
    $("#wrapper").toggleClass("menuDisplayed");

    i = i === 0 ? 1 : 0;
    let padding = i === 0 ? 250 : 0;
    document.getElementById("page-content-wrapper").style.paddingLeft = padding + "px";
  });

  $("#menu-right-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper-right").toggleClass("menuDisplayed");
  });
  
  $("#title_reload").click(function (e) {
    location.reload(true);
  });

  $("#save").click(function (e) {
    clearFootsteps();
    let map = current_map;
    let mapexists = false;

    

    for (const i in maplist) {
      const mapid = maplist[i];
        mapexists = mapid === current_map_id ? true : mapexists;
    }

    console.log(mapexists, maplist, current_map_id);

    if (mapexists){
    updateMapinDB(map);
  } else {
    createMapinDB(map);
  };


    
  });

$("#trash").click(function (e) {
  deleteMapinDB();
});


});
