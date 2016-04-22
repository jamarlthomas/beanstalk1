$( document ).ready(function() {
    
    //on load upate selected language label 
    var findSelectedLang = $("#langDocDropDown").find(".selected a").text()
    findSelectedLang = findSelectedLang + "<span class='icon-arrow'></span>"
    $("#selDocLang").html(findSelectedLang)
    
    //on load upate selected language & download link
    var findSelectedLangLink = $("#langDocDropDown").find(".selected a").attr("data-download")
    $("#downloadDocsC .downloadBtn").attr("href", findSelectedLangLink)
    
    
    var langStatus = "closed"
    
    //function to open language
    function openLang() {
        
        $("#langDocDropDown").stop().fadeIn(500)
        
        langStatus = "open"
    }
    
    
    //function to close language
    function closeLang() {
        
        $("#langDocDropDown").stop().fadeOut(500)
        
        langStatus = "closed"
    }
    
    
    
    //hover language document selector
    $("#translate-doc").hover(function() {
        //Not Mobile
        if(!isMobile.any()) {
            openLang();
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
    
    
    
    //Click on language document
    $( "#translate-doc #langDocDropDown a").click(function(e) {
        e.preventDefault();
        
        //get the URL from document language selected
        var getURL = $(this).attr("data-download")
        
        //update download language label
        var findSelectedLang = $(this).text();
        findSelectedLang = findSelectedLang + "<span class='icon-arrow'></span>"
        $("#selDocLang").html(findSelectedLang);
        
        //update download document link
        $("#downloadDocsC .downloadBtn").attr("href", getURL)
        
        
    });
    
    
});