$( document ).ready(function() {
    
    //define break point
    var bp1 = "(max-width: 1280px)"
    
    //hide the active language from the drop down
    var activeLang = $("#selLang").attr("data-lang")
    $("#" + activeLang).css({"display":"none"})
    
    //hover language selector
    $("#languageC").hover(
      function() {          
        
        //add drop shadow to languages
        $("#languageC").css({"-webkit-box-shadow":"0px 0px 13px 0px rgba(0,0,0,0.1)","-moz-box-shadow":"0px 0px 13px 0px rgba(0,0,0,0.1)","box-shadow":"0px 0px 13px 0px rgba(0,0,0,0.1)"});
        
          //show available languages
        $("#langDropDown").css({"display":"block"});        
        
        //show language label for mobile
        if (window.matchMedia(bp1).matches){
          $("#selLang").css({"opacity": 1.0})
        }
          
      }, function() {
        
          //remove drop shadow
          $("#languageC").css({"-webkit-box-shadow":"0px 0px 13px 0px rgba(0,0,0,0.0)","-moz-box-shadow":"0px 0px 13px 0px rgba(0,0,0,0.0)","box-shadow":"0px 0px 13px 0px rgba(0,0,0,0.0)"});
          
          //hide drop down
          $("#langDropDown").css({"display":"none"});
          
          //hide language label for mobile
          if (window.matchMedia(bp1).matches){
            $("#selLang").removeAttr( "style" )
          }
      }
    );
    

    
});