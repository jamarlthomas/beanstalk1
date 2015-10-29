$( document ).ready(function() {
    
    //Setup Main Nav Rollover Mega Menu
    $("#mainNavC a").hover(
      function() {
        
        //turn off timer if it has been set        
        if(typeof timerControl !== "undefined"){
            clearTimeout(timerControl);
        }  
          
        //look for any open items
        var openItems  = $(".mmItemOpen")[0]
        if(typeof openItems !== 'undefined'){
            
             //turn off timer
             clearTimeout(timerControl);
            
             //close open menu 
             closeMenu();
            
            //close open item
            //$(".mmItemOpen").css({"display":"none"});
        
            //remove class indicating open status
           //$(".mmItemOpen").removeClass("mmItemOpen")
        }
          
        //get mega menu id
        var mmId = $(this).attr("data-mm")
          
        //check if this item has a mega menu
        if(typeof mmId !== 'undefined'){
            
            //add a class to for status
            $("#" + mmId).addClass("mmItemOpen")
            
            //turn on nav item
            $("#" + mmId).css({"display":"block"})
              
        };
          
      }, function() {
          
          //set timer
          closeTimer();
      }
    );
    
    
    //rollover mega menu item
    $("#megaMenuC").hover(
      function() {
          
          //turn off timer
          clearTimeout(timerControl);
          
      }, function() {
          
          //set timer
          closeTimer();
      }
    );
    

    
    //function to close open item
    function closeMenu() {
        
        //close open item
        $(".mmItemOpen").css({"display":"none"});
        
        //remove class indicating open status
        $(".mmItemOpen").removeClass("mmItemOpen")
        
    }    
    
    //timer to close open item
    function closeTimer() {
        timerControl = setTimeout(closeMenu, 200);
    }

    
    
});