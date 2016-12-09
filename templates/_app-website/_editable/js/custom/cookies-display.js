$( document ).ready(function() {
    
    //function to get query string prameters
    function getParameterByName(name, url) {
        if (!url) { url = window.location.href; }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    
    
    //init and disable cookie popup
    var disableCookiePopup = false;

    
    //check if cookie display dispable is on the page on the body tag
    if($("body").find('[data-disable="cookiePopup"]').length > 0){ 
        
        disableCookiePopup = true;
    }
    
    //check if a query string has been set to disable the cookie display
    if(getParameterByName('disableCookiePopup') == "true"){
        disableCookiePopup = true;
    }
    
    
    //check if cookie display cookie has been set
    var cookieDisplayCheck = $.cookie('displayCookie');
    
    
    //display cookie popup if cookie page disable is not activated
    if(disableCookiePopup == false){
    
        //if cookie hasn't been set then open cookie display
        if(!cookieDisplayCheck){

            $("body").css({"overflow":"hidden"})

            $("#cookieOverlayC").fadeIn(500);

        }
        
    }//cookieDisplayPopu
    
               
    //Accept cookie button
    $("#cookieDisplayC .accept").click(function(e) {
        
        //fade out cookies display
        $("#cookieOverlayC").fadeOut(200, function(){
            
            //display regular scroll bar again
            $("body").removeAttr('style');
            
            //set cookie
            $.cookie('displayCookie', 'cookiesAccepted', { expires: 365, path: '/' });
        })
        
    });
    
    
    //Decline cookie button
    $("#cookieDisplayC .decline").click(function(e) {
        
        //disable Google tracking cookies
        window['ga-disable-UA-10080511-2'] = true;
        
        //disable kentico cookies
        $.cookie('CMSCookieLevel', '-100', { expires: 365, path: '/' });
        
        //fade out cookies display
        $("#cookieOverlayC").fadeOut(200, function(){
            
            //display regular scroll bar again
            $("body").removeAttr('style');
            
            //set cookie
            $.cookie('displayCookie', 'cookiesDeclined', { expires: 365, path: '/' });
        })
        
    });
    
    
    //check cookie status
    if (cookieDisplayCheck == "cookiesDeclined"){
        
        //cookies have been disabled uncheck everything
        $('#cookiePrefC input:checkbox').removeAttr('checked');
        
    }
    
    //check preference cookie status
    if($.cookie('preferenceCookie') == "false"){
        
        //Uncheck Preference Cookie
        $('#cookiePrefC #preferenceCookies').removeAttr('checked');
        
    }
    
    if($.cookie('performanceCookie') == "false"){
        
        //Uncheck Preference Cookie
        $('#cookiePrefC #performanceCookies').removeAttr('checked');
        
    }
    

    if($.cookie('personalCookie') == "false"){
        
        //Uncheck Preference Cookie
        $('#cookiePrefC #personalCookies').removeAttr('checked');
        
    }
    
    
    
    //Preference Cookies
    $("#preferenceCookies").click(function(e) {
        
        //modified cookiedisplay status
        $.cookie('displayCookie', 'modified', { expires: 365, path: '/' });
        
        var thisCurrentStatus = $(this).prop('checked')
        
         //if true/checked
        if(thisCurrentStatus){
            
            //reset kentico cookies
            $.cookie('CMSCookieLevel', '1000', { expires: 365, path: '/' });
            
            //set preference cookie
            $.cookie('preferenceCookie', 'true', { expires: 365, path: '/' });
            
            //set personal cookie
            $.cookie('personalCookie', 'true', { expires: 365, path: '/' });
            
            //update the personal checkbox
            $("#cookiePrefC #personalCookies").prop('checked', true);
            
        }else{//false/unchecked
            
            //reset kentico cookies
            $.cookie('CMSCookieLevel', '-100', { expires: 365, path: '/' });
            
            //set preference cookie
            $.cookie('preferenceCookie', 'false', { expires: 365, path: '/' });
            
            //set personal cookie
            $.cookie('personalCookie', 'false', { expires: 365, path: '/' });
            
            //update the personal checkbox
            $("#cookiePrefC #personalCookies").removeAttr('checked');
        }
        
        
    });    
    
    //performance Cookies
    $("#performanceCookies").click(function(e) {
        
        //modified cookiedisplay status
        $.cookie('displayCookie', 'modified', { expires: 365, path: '/' });
        
        var thisCurrentStatus = $(this).prop('checked')
        
        //if true/checked
        if(thisCurrentStatus){
            
            //reset GA cookie
            window['ga-disable-UA-10080511-2'] = false;
            
            //set performance cookie
            $.cookie('performanceCookie', 'true', { expires: 365, path: '/' });
            
        }else{//false/unchecked
            
            //reset GA cookie
            window['ga-disable-UA-10080511-2'] = true;
            
            //set performance cookie
            $.cookie('performanceCookie', 'false', { expires: 365, path: '/' });
            
        }
    });
    
    //personal Cookies
    $("#personalCookies").click(function(e) {
        
        //modified cookiedisplay status
        $.cookie('displayCookie', 'modified', { expires: 365, path: '/' });
        
        var thisCurrentStatus = $(this).prop('checked')
        
        //if true/checked
        if(thisCurrentStatus){
            
            //reset kentico cookies
            $.cookie('CMSCookieLevel', '1000', { expires: 365, path: '/' });
            
            //set personal cookie
            $.cookie('personalCookie', 'true', { expires: 365, path: '/' });
            
        }else{//false/unchecked
            
            //reset kentico cookies
            $.cookie('CMSCookieLevel', '0', { expires: 365, path: '/' });
            
            //set personal cookie
            $.cookie('personalCookie', 'false', { expires: 365, path: '/' });
            
        }
        
    });
    
});