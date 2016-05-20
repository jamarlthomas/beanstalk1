$( document ).ready(function() {
    
    var searchStat = "closed";
    
    //function to close search
    function closeSearch() {
        
        //fade out search display
        $("#search").fadeOut(200, function(){
            
            //Close Search Box
            $("#searchC").animate({
                height: 0            
            }, 500, function(){
                $(this).removeAttr("style")
            });
        })
        
        searchStat = "closed"; 
    }
    
    //clicks for both search icons
    $("#utilityNavC .icon-search, #mobileSearch .icon-search").click(function(e) {
        e.preventDefault();
        
        //open search
        if(searchStat == "closed") {
            
            //open up search box
            $("#searchC").animate({
                height: 100            
            }, 500, function(){
                
                //fade in search display
                $("#search").fadeIn(500)
            
            });
            
            $("#searchC #search input").focus();
            
            searchStat = "open";   
            
        }else {
            
            closeSearch();
        }
        
    });
    
    //click close on main close btn on search box
    $("#searchC #closeSearch a").click(function(e) {
        e.preventDefault();
        
        closeSearch();
    });
    

    
});