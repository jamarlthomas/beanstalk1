$( document ).ready(function() {
 
    //check if cookie display cookie has been set
    var cookieDisplayCheck = $.cookie('displayCookie');
    
    //if cookie hasn't been set then open cookie display
    if(cookieDisplayCheck != "cookieSet"){
        $("#cookiesC").css({"height":"60px"})
        $("#cookies").css({"display":"block"})
        
        //Move content down now that cookie display is open
        $("body").css({"padding-top": "225px"});
    }
        
    //close cookies box
    $("#closeCookieDisplay").click(function(e) {
        
        //fade out cookies display
        $("#cookies").fadeOut(200, function(){
            
            //Close cookies Box
            $("#cookiesC").animate({
                height: 0            
            }, 500, function(){
                $(this).removeAttr("style")
            });
            
            //remove style that was used to move content down now for the cookie display
            $("body").removeAttr('style');
            
            //set cookie
            $.cookie('displayCookie', 'cookieSet', { expires: 365, path: '/' });
        })
        
    });
    
    
});