$( document ).ready(function() {

    //capture height of each mega menu
    $(".megaMenu").each(function(index) {
        
        //Get the height of each mega menu
        var mmHeight = $(this).height();
        
        //store height
        $(this).attr("data-mmHeight",mmHeight)  
            
    });
    
    
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

        }
          
        //get mega menu id
        var mmId = $(this).attr("data-mm")
          
        //check if this item has a mega menu
        if(typeof mmId !== 'undefined'){
            
            //hide SBU sticky nav
            $("#stickySBU-navC").css({"display":"none"});
            
            //add a class to for status
            $("#" + mmId).addClass("mmItemOpen")
            
            //get this mm stored height
            var mmHeight = $("#" + mmId).attr("data-mmHeight") 
                        
            //turn on nav item
            $("#" + mmId).css({"display":"block"})
            $("#" + mmId).css({"height":0})
            $("#" + mmId).css({"opacity":0.0})
             
            $("#" + mmId).stop().animate({
                height: mmHeight,
                opacity: 1.0
            }, 800);
            
            //turn on overlay
            $("#topHeaderC").css({"height":"100%"})
            $("#topHeaderC").stop().animate({
                backgroundColor: "rgba(0, 0, 0, 0.5)"
            }, 600);
              
        };
          
      }, function() {
          
          //set timer
          closeTimer();
      }
    );
    
    
    //rollover mega menu item
    $("#megaMenuC").hover(
      function() {
          
          //find item on
          var mmItem = $(".mmItemOpen").attr("id");
          
          //activate nav highlight
          $("#mainNavC a[data-mm='" + mmItem + "']").addClass("active");

          //turn off timer
          clearTimeout(timerControl);
          
      }, function() {
          
          //clear any active states
          $("#mainNavC a.active").removeClass("active");
          
          //set timer
          closeTimer();
      }
    );
    

    
    //function to close open item
    function closeMenu() {

        //close open item
        //$(".mmItemOpen").css({"display":"none"});
        $(".mmItemOpen").stop().animate({
            height: 0,
            opacity: 0.0
        }, 400);
        
        //remove class indicating open status
        $(".mmItemOpen").removeClass("mmItemOpen")
        
        //turn off overlay
        //$("#topHeaderC").css({"height":"auto"})
        $("#topHeaderC").stop().animate({
            backgroundColor: "rgba(0, 0, 0, 0.0)"
        }, 300, function(){            
            $(this).css({"height":"auto"})
            
            //if sticky nav should be on show it
            if($("#stickySBU-navC").hasClass("navDisplay")){
                
                $("#stickySBU-navC").css({"display":"block"});
                
            }
                
            
            //remove left over styles that were created    
            //$("#topHeaderC").removeAttr('style');
        });
        
    }    
    
    //timer to close open item
    function closeTimer() {
        timerControl = setTimeout(closeMenu, 200);
    }

    
    
});