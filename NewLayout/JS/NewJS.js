$(document).ready(function(){
    $("#menu-left-toggle").click(function(e){
      e.preventDefault();
      $("#wrapper").toggleClass("menuDisplayed");
    });

    $("#menu-right-toggle").click(function(e){
        e.preventDefault();
        $("#wrapper-right").toggleClass("menuDisplayed");
      });




      
  });
