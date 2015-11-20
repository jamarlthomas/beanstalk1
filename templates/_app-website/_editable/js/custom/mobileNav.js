$( document ).ready(function() {
   
   //Hamburger Navigation
    $('#mobileBtn').click(function(e) {

        e.preventDefault()    

        //prep for animation of navigation
        $("#mobileNavC1").css({"z-index":"100","width":"100%"})

        //Add class to trigger animation
        $("#mobileNavC1").addClass("navToggleOpen");

        //remove scrollbar from page
        $('html').css('overflow','hidden');
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
    
    //next nav activation
    $(".hasChildren a").click(function(e) {
        
        e.preventDefault();

        //Create back button
        var addBtns = '<li><a href="#" class="backBtn">back</a></li>'
        
        //Get the name of the create button
        var viewBtnName = $(this).text();
        viewBtnName = viewBtnName.replace(">", "")  
        
        //Get the link
        var viewBtnLink = $(this).attr("href")
        
        //Create View Button
        addBtns = addBtns + '<li><a href="' + viewBtnLink + '" class="viewBtn">' + viewBtnName + '</a></li>'
        
        //Add Buttons
        $(this).parent().find("ul:first").prepend(addBtns)
        
        //calculate new position
        getNavPos = getNavPos + getNavWidth;
        
        //prep new nav into position
        $(this).parent().children().eq(1).css({"width":getNavWidth,"left": getNavWidth,"display":"block"})
        
        //slide to nav and reset height
        $("#mobileNavC #mainNavC > ul").delay(100).animate({
            left: -1 * getNavPos,
        }, 500);
        
        
    });
    
    
});