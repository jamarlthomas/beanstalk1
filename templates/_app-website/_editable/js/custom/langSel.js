$( document ).ready(function() {
    
    //hide the active language from the drop down
    var activeLang = $("#selLang").attr("data-lang")
    $("#" + activeLang).css({"display":"none"})
    
    //hover language selector
    $("#languageC").hover(
      function() {          
        $("#langDropDown").css({"display":"block"});
      }, function() {
          $("#langDropDown").css({"display":"none"});
      }
    );
    

    
});