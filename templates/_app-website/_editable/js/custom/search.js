$( document ).ready(function() {
    
    var searchStat = "closed";
    
    //function to close search
    function closeSearch() {
        
        //find the height of the search box
        var searchHeight = $("#searchC").height();
        searchHeight = -1 * searchHeight
        
        $("#searchC").animate({
                marginTop: searchHeight
        }, 500, function(){
            $(this).removeAttr("style")
        });
        
        
        searchStat = "closed"; 
    }
    
    //clicks for both search icons
    $("#utilityNavC .icon-search, #mobileSearch .icon-search").click(function(e) {
        e.preventDefault();
        
        //open search
        if(searchStat == "closed") {
            
            $("#searchC").animate({
                marginTop: 0
            },500);
            
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