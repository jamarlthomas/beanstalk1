$( document ).ready(function() {
 
    //check if cookie display cookie has been set
    var cookieDisplayCheck = $.cookie('displayCookie');
    
    //if cookie hasn't been set then open cookie display
    if(!cookieDisplayCheck){
        
        $("body").css({"overflow":"hidden"})
        
        $("#cookieOverlayC").fadeIn(500);

    }
    
        
    //Allow cookie button
    $("#cookieDisplayC .allow").click(function(e) {
        
        //fade out cookies display
        $("#cookieOverlayC").fadeOut(200, function(){
            
            //display regular scroll bar again
            $("body").removeAttr('style');
            
            //set cookie
            $.cookie('displayCookie', 'cookiesAllowed', { expires: 365, path: '/' });
        })
        
    });
    
    
    //Allow cookie button
    $("#cookieDisplayC .disallow").click(function(e) {
        
        //disable Google tracking cookies
        window['ga-disable-UA-10080511-2'] = true;
        
        //disable kentico cookies
        $.cookie('CMSCookieLevel', '-100', { expires: 365, path: '/' });
        
        //fade out cookies display
        $("#cookieOverlayC").fadeOut(200, function(){
            
            //display regular scroll bar again
            $("body").removeAttr('style');
            
            //set cookie
            $.cookie('displayCookie', 'cookiesDisallowed', { expires: 365, path: '/' });
        })
        
    });
    
    
});