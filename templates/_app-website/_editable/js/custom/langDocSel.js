$( document ).ready(function() {
    
    var langStatus = "closed"
    
    
    //function to open language
    function openLang() {
        
        $("#langDocDropDown").stop().fadeIn(500)
        
        langStatus = "open"
    }
    
    
    //function to open language
    function closeLang() {
        
        $("#langDocDropDown").stop().fadeOut(500)
        
        langStatus = "closed"
    }
    
    
    
    //hover language document selector
    $("#translate-doc").hover(function() {
        //Not Mobile
        if(!isMobile.any()) {
            openLang();
        console.log("hit")
        }
    }, function() {
        closeLang(); 
    });
    
    
    //prevent click
    $( "#translate-doc #selDocLang").click(function(e) {
        e.preventDefault();
    });
    
    //click (for touch)
    $( "#translate-doc").click(function() {
        
        //on click decide wether to open or close language
        if(langStatus == "closed"){
            openLang();            
        }else {
            closeLang();             
        }
        
    });
    
    
});