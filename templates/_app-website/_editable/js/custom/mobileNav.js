$( document ).ready(function() {
   
    //Add class to disable rollovers for all mobile
    if(isMobile.any()) {
        
        $( "#mainNavC li" ).each(function( index ) {
            $(this).addClass("no-hover")
        })

    }
    
    
    
   //Hamburger Navigation
    $('#mobileBtn').click(function(e) {

        e.preventDefault()    

        //prep for animation of navigation
        $("#mobileNavC1").css({"z-index":"100","width":"100%"})

        //Add class to trigger animation
        $("#mobileNavC1").addClass("navToggleOpen");

        //remove scrollbar from page
        $('html').css('overflow','hidden');
        
        //reset navigation position
        $("#mobileNavC #mainNavC > ul").css({"left": "0px"});
        
        //reset navigation display styles by removing styles
        $("#mobileNavC #mainNavC .hasChildren ul").removeAttr("style");
        
        //reset util
        $("#mobileNavC #utilC").removeAttr("style");
        
        //reset status level
        navLevel = 0;
        
        //reset distance pos
        getNavPos = 0;
        
        //remove back button
        $("#mainNavC .backBtn").parent().remove();
        
        
    });
    
    
    //Close Function
    function closeMobileNav(){

        //Add scrollbar back to page
        $('html').css('overflow','auto');

        //Animate out the navigation
        $("#mobileNavC1").removeClass("navToggleOpen");
        
        //Delay closing mobile nav overlay
        setTimeout(function(){
            $("#mobileNavC1").css({"z-index":"0","width":"0px"})
        }, 1000);

    }
    
    
    //Close Mobile Navigation Button
    $('#menuclose').click(function(e) { e.preventDefault(); closeMobileNav(); }); 
    
    
    //Set Mobile Nav Status to help with other clicks
    $('#mobileNavC').hover(
      function() {
        $(this).addClass("hover");
      }, function() {
        $(this).removeClass("hover");
      }
    );
    
    //close from grayed out section
    $('#mobileNavC1').click(function(e) { 
                                         
        //Check for hover event over mobile nav
        if(!$("#mobileNavC").hasClass("hover")){
            e.preventDefault(); 
            closeMobileNav(); 
        }
    }); 
    
    
    //Setup sub nav levels    
    $("#mobileNavC #mainNavC ul li").each(function() {

        //find items that have levels
        if($(this).find("a").length > 1){
        //if($(this).has("ul").length){

            //add class to indicate subnav
            $(this).addClass("hasChildren")
                                    
        }
        
    });
    
    
    //get width of nav
    var getNavWidth = $("#mobileNavC").width();
    var getNavPos = 0;
    
    //store how deep we are in navigation
    var navLevel = 0;
    
    
    //next nav activation
    $(".hasChildren > a").click(function(e) {
        console.log("hit")
        e.preventDefault();
        
        //fade out utilty for any inner navs
        if(navLevel == 0){            
            $("#mobileNavC #utilC").fadeOut(300);
        }
        
        //Create back button
        var addBtns = '<li><a href="#" class="backBtn">Back</a></li>'
        
        //Get the name of the create button
        var viewBtnName = $(this).text();
        
        //Get the link
        //var viewBtnLink = $(this).attr("href")
        
        //Create View Button
        //addBtns = addBtns + '<li><a href="' + viewBtnLink + '" class="viewBtn">' + viewBtnName + '</a></li>'
        
        //Add Buttons
        $(this).parent().find("ul:first").prepend(addBtns)
        
        //hide menu btn
        $("#menuHdr").css({"display":"none"});
        
        //update menu status
        $("#mobileNavStatus").html(viewBtnName);
        
        //reveal status
        $("#mobileNavStatus").fadeIn(500);
        
        //calculate new nav position
        getNavPos = getNavPos + getNavWidth;
        
        //prep new nav into position
        $(this).parent().children().eq(1).css({"width":getNavWidth,"left": getNavWidth,"display":"block"})
        
        //slide to nav
        $("#mobileNavC #mainNavC > ul").delay(150).animate({
            left: -1 * getNavPos,
        }, 500);
        
        //update nav level
        navLevel = navLevel + 1;
        
    });
    
    
    //click back button
    $(".hasChildren").on("click", ".backBtn:first", function(e) {
        
        e.preventDefault();
        
        //Store the back btn ref
        var thisBackBtn = $(this)

        //get text for the nav status
        var updateNavStaus = $(thisBackBtn).parent().parent().parent().parent().find("li:eq(1)").text();
        $("#mobileNavStatus").html(updateNavStaus);
        
        //calculate new nav position
        getNavPos = getNavPos - getNavWidth;

        //slideNav Backwards
        $("#mobileNavC #mainNavC > ul").animate({
            left: -1 * getNavPos,
        }, 500, function(){
            
            //hide nav item
            $(thisBackBtn).parent().parent().css({"display":"none"})
            
            //remove extra nav that was added
            //$(thisBackBtn).parent().parent().find('li:lt(2)').remove();
            $(thisBackBtn).parent().parent().find('li:lt(1)').remove();

        });
        
        //update nav level
        navLevel = navLevel - 1;
        
        //if this is level 0 change the status indicator out
        if(navLevel == 0){ 
            
            //Hide status
            $("#mobileNavStatus").css({"display":"none"});
        
            //Fade In Menu Item
            $("#menuHdr").fadeIn(500);
            
            //display utility Nav
            $("#mobileNavC #utilC").delay(100).fadeIn(500);
            
        }
    })
    
});