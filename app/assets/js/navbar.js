$(document).ready(function () {

  let i = 1;

  $("#menu-left-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("menuDisplayed");

    i = i === 0 ? 1 : 0;
    if (i === 0){ getMaplist(); };

    let padding = i === 0 ? 230 : 0;
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

    updateMapinDB(map);
  });

  $("#trash").click(function (e) {
    deleteMapinDB();
  });

  $("#add").click(function (e) {
    clearFootsteps();
    let map = current_map;
    let mapexists = false;

    createMapinDB(map);
  });

});
