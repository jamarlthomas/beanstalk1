$( document ).ready(function() {

    var storeTrendingPos;
    
    //fire on resize complete
    var resizeId;
    $(window).resize(function() {
        clearTimeout(resizeId);
        resizeId = setTimeout(doneResizing, 100);
    });

    function doneResizing(){        
        //clear manual positioned trending header
        $(".cardsC .cards a.trending .trendIndicator").removeAttr( 'style' );
    }

   
    var cardHeight
    var cardTxtBoxHeight
    var distanceToTrav
    var storeTrendingPos
    
    
   $('.cardsC .cards a').hover(
      function() {
         
          //Not Mobile
          if(!isMobile.any()) {
          
              //get the height of the card
              cardHeight = $(this).height();
              cardTxtBoxHeight = $(this).find(".overlayC").height();
              distanceToTrav = cardHeight - cardTxtBoxHeight
              storeTrendingPos = cardTxtBoxHeight + 15;


              $(this).find(".overlayC").stop().animate({
                 bottom: distanceToTrav - 15
              }, 500);

              $(this).find(".hoverOverlayC").stop().animate({
                 height: distanceToTrav,
                 opacity: 1.0
              }, 500);

              $(this).find(".trendIndicator").stop().animate({
                 opacity: 0.0,
                 bottom: cardHeight - 43
              }, 500);
           
          }
          
          
      }, function() {
        
          $(this).find(".overlayC").stop().animate({
             bottom: "0" 
          }, 500);
          
          $(this).find(".hoverOverlayC").stop().animate({
             height: "0px" 
          }, 500, function(){              
              $(this).css({"opacity":0.0})
              
          });
 
          $(this).find(".trendIndicator").stop().animate({
             opacity: 1.0,
             bottom: storeTrendingPos
          }, 500);
          
      }
    );
    
});