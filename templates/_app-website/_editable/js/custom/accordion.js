$(document).ready(function() {
    
    $(".accordC a.accordTrigger").click(function(e) {
       
        e.preventDefault();
        
        //open item
        if(!$(this).parent().hasClass("accordItemOpen")){
            
            
            //$(this).before().attr("content","")
            
            //get height of div that's open
            var linkHeight = $(".accordC .accordItemOpen a").height();
            
            //fade out any open text
            $(".accordC .accordItemOpen").find(".reveal").fadeOut(100);
            
            //close container for reveal
            $(".accordC .accordItemOpen").animate({
                height: linkHeight
            }, 300,function(){
                
                setTimeout(function(){
                    $(this).removeAttr("style"); 
                }, 100);
                
            });
                        
            //remove from open item class
            $(".accordC .accordItemOpen").removeClass("accordItemOpen"); 
            
            
            
            //get height of div
            var linkHeight = $(this).height();
            var revealHeight = $(this).parent().find(".reveal").actual('height');
            var accordHeight = linkHeight + revealHeight + 20
            //var accordHeight = $(this).parent().actual('height') + 10;
            
            
            //open container for reveal
            $(this).parent().animate({
                height: accordHeight
            }, 400);

            //fade in text
            $(this).parent().find(".reveal").delay(400).fadeIn(800);

            //add class
            $(this).parent().addClass("accordItemOpen");
            
        }else {
            
            //get height of div
            var linkHeight = $(this).height();
            
            //fade out in text
            $(this).parent().find(".reveal").fadeOut(100);
            
            //close container for reveal
            $(this).parent().animate({
                height: linkHeight
            }, 300,function(){
                
                setTimeout(function(){
                    $(this).removeAttr("style"); 
                }, 100);
                
            });
               
            //remove class
            $(this).parent().removeClass("accordItemOpen");
            
        }
        
        
        
    });
    
});