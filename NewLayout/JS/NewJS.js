$(document).ready(function(){
    $("#menu-left-toggle").click(function(e){
      e.preventDefault();
      getMaplist();
      $("#wrapper").toggleClass("menuDisplayed");
    });

    $("#menu-right-toggle").click(function(e){
        e.preventDefault();
        $("#wrapper-right").toggleClass("menuDisplayed");
      });
});
