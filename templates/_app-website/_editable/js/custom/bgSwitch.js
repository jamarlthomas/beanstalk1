$(document).ready(function() {
    
    function bgSwitcher() {
        
        //define break point
        var bp1 = "(max-width: 1280px)"

        //check break point
        if (window.matchMedia(bp1).matches){

            //for each slide change bg
            $(".slide").each(function(index) {

                //get mobile bg 
                var mobileBgImg = $(this).attr('data-mobileBG');
                    
                //store desktop bg
                //var desktopbg = $(this).css('background-image');
                //desktopbg = desktopbg.replace('url(','').replace(')','');
                //$(this).attr('data-desktopBG', desktopbg);

                //change bg               
                $(this).css({"background-image":"url(" + mobileBgImg + ")"});  
                

            })
            
        }else{
            
            //for each slide change bg
            $(".slide").each(function(index) {

                //get mobile bg 
                var desktopBgImg = $(this).attr('data-desktopBG');

                //change bg               
                $(this).css({"background-image":"url(" + desktopBgImg + ")"});  
                

            })
            
        }
        
    }
    bgSwitcher();
    
    
    //fire on resize complete
    var resizeId;
    $(window).resize(function() {
        clearTimeout(resizeId);
        resizeId = setTimeout(doneResizing, 100);
    });
 
    function doneResizing(){
        bgSwitcher();
    }
    
    
});