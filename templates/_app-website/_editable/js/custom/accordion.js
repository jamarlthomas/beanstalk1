$(document).ready(function() {
    
    $(".accordC a").click(function(e) {
       
        e.preventDefault();
        
        //open item
        if(!$(this).hasClass("accordItemOpen")){
            
            $(this).before().attr("content","")
            
            //get height of div that's open
            var linkHeight = $(".accordC .accordItemOpen").find("span").height();
            
            //fade out any open text
            $(".accordC .accordItemOpen").find(".reveal").fadeOut(100);
            
            //close container for reveal
            $(".accordC .accordItemOpen").animate({
                height: linkHeight
            }, 50,function(){
                
                setTimeout(function(){
                    $(this).removeAttr("style"); 
                }, 100);
                
            });
            
            //remove from open item class
            $(".accordC .accordItemOpen").removeClass("accordItemOpen"); 
            
            //get height of div
            var linkHeight = $(this).actual('height');
            var revealHeight = $(this).find(".reveal").actual('height');
            var accordHeight = linkHeight + revealHeight + 10

            //open container for reveal
            $(this).animate({
                height: accordHeight
            }, 50);

            //fade in text
            $(this).find(".reveal").delay(300).fadeIn(800);

            //add class
            $(this).addClass("accordItemOpen");
            
        }else {
            
            //get height of div
            var linkHeight = $(this).find("span").height();
            
            //fade out in text
            $(this).find(".reveal").fadeOut(100);
            
            //close container for reveal
            $(this).animate({
                height: linkHeight
            }, 50,function(){
                
                setTimeout(function(){
                    $(this).removeAttr("style"); 
                }, 100);
                
            });
               
            //remove class
            $(this).removeClass("accordItemOpen");
            
        }
        
        
        
    });
    
});