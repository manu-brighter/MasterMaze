$(document).ready(function () {

  let i = 1;

  $("#menu-left-toggle").click(function (e) {
    e.preventDefault();
    //getMaplist();
    $("#wrapper").toggleClass("menuDisplayed");

    i = i === 0 ? 1 : 0;
    let padding = i === 0 ? 250 : 0;

    document.getElementById("page-content-wrapper").style.paddingLeft = padding + "px";
  });

  $("#menu-right-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper-right").toggleClass("menuDisplayed");
  });
});
