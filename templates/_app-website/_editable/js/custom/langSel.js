$( document ).ready(function() {
    
    var langStatus = "closed"
    
    //define break point
    var bp1 = "(max-width: 1280px)"
    
    //hide the active language from the drop down
    var activeLang = $("#selLang").attr("data-lang")
    $("#" + activeLang).css({"display":"none"})
    
    
    //function to open language
    function openLang() {
        
        //add drop shadow to languages
        $("#languageC").css({"-webkit-box-shadow":"0px 0px 13px 0px rgba(0,0,0,0.1)","-moz-box-shadow":"0px 0px 13px 0px rgba(0,0,0,0.1)","box-shadow":"0px 0px 13px 0px rgba(0,0,0,0.1)","z-index":"20"});
        
        //show available languages
        $("#langDropDown").css({"display":"block"});        
        
        //show language label for mobile
        if (window.matchMedia(bp1).matches){
          $("#selLang").css({"opacity": 1.0})
        }
        
        langStatus = "open"
    }
    
    
    //function to close language
    function closeLang() {
        
        //remove drop shadow
        //$("#languageC").css({"-webkit-box-shadow":"0px 0px 13px 0px rgba(0,0,0,0.0)","-moz-box-shadow":"0px 0px 13px 0px rgba(0,0,0,0.0)","box-shadow":"0px 0px 13px 0px rgba(0,0,0,0.0)"});
        $("#languageC").removeAttr( "style" )

        //hide drop down
        $("#langDropDown").css({"display":"none"});

        //hide language label for mobile
        if (window.matchMedia(bp1).matches){
            $("#selLang").removeAttr( "style" )
        }
        
        langStatus = "closed"
        
    }
    
    
    
    //hover language selector
    $("#languageC").hover(function() {
        //Not Mobile
        if(!isMobile.any()) {
            openLang();
        }
    }, function() {
        closeLang(); 
    });


    //prevent click
    $( "#languageC #selLang").click(function(e) {
        e.preventDefault();
    });
    
    //click (for touch)
    $( "#languageC").click(function() {
        
        //on click decide wether to open or close language
        if(langStatus == "closed"){
            openLang();            
        }else {
            closeLang();             
        }
        
    });
    

    
});