$( document ).ready(function() {
 
    //check if cookie display cookie has been set
    var cookieDisplayCheck = $.cookie('displayCookie');
    
    //if cookie hasn't been set then open cookie display
    if(cookieDisplayCheck != "cookieSet"){
        $("#cookiesC").css({"height":"60px"})
        $("#cookies").css({"display":"block"})
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
            
            //set cookie
            $.cookie('displayCookie', 'cookieSet', { expires: 365, path: '/' });
        })
        
    });
    
    
});