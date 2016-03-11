$(document).ready(function() {

    //ellipses for megamenu items left links
    $(".megaMenu .lftCol .photoLinkRt").dotdotdot({
      ellipsis	: '... ',
      wrap		: 'word',
      fallbackToLetter: true
    });
    
    //ellipses for megamenu items - right links
    $(".megaMenu .rtColLinks  .txtC").dotdotdot({
      ellipsis	: '... ',
      wrap		: 'word',
      fallbackToLetter: true
    });
    
    //elipses should be added to megamenu, so now activate megamenu
    $( "#megaMenuC .megaMenu" ).each(function() {
        $(this).css({"display":"none"})
    });
    $("#megaMenuC").css({"opacity":1.0})
    
    
    //ellipses for Large Cards
    $(".cardsC .cards a .overlay").dotdotdot({
      ellipsis	: '... ',
      wrap		: 'word',
      fallbackToLetter: true,
      tolerance	: 2,
      watch: 'window'
    });
    

    //ellipses for large cards hover txt
    $(".cardsC .cards a .hoverOverlay").dotdotdot({
      ellipsis	: '... ',
      wrap		: 'word',
      watch: 'window'
    });
    
    
    //ellipses for small cards
    $(".cardsSM_C .cardsSM .cardHdrC").dotdotdot({
      ellipsis	: '... ',
      wrap		: 'word',
      watch: 'window'
    });
    
    
    //ellipses for small cards
    $(".cardsSM_C .cardsSM .cardTextArea").dotdotdot({
      ellipsis	: '... ',
      wrap		: 'word',
      watch: 'window'
    });
    
    
});