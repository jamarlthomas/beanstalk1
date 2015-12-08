$( document ).ready(function() {
    
    var searchStat = "closed";
    
    //function to close search
    function closeSearch() {
        
        $("#topHeaderC, #contentAreaC").animate({
                marginTop: 0 + "px"
        }, 500);
        
        $(".stickyNav-SBU").animate({
                marginTop: 0 + "px"
        }, 500 );
        
        searchStat = "closed"; 
    }
    
    //clicks for both search icons
    $("#utilityNavC .icon-search, #mobileSearch .icon-search").click(function(e) {
        e.preventDefault();
        
        //open search
        if(searchStat == "closed") {
            
            //find the height of the search box
            //var searchHeight = $("#searchC").height();
            
            $("#searchC").animate({
                marginTop: 0
            },500);
            
            /*
            $("#topHeaderC, #contentAreaC").animate({
                marginTop: searchHeight + "px"
            }, 500 );
            
            $(".stickyNav-SBU").animate({
                marginTop: searchHeight + "px"
            }, 500 );
            */
            
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
    
    //if browser moves close search
    $(window).resize(function() {
       if(searchStat == "open"){
           //closeSearch();
        }
    });
       
    
   //watch scrolling for scrolling
   $(document).scroll(function() {
       
       //if scrolling is detected close search
       if(searchStat == "open"){
           //closeSearch();
        }
       
   });
  
    
});