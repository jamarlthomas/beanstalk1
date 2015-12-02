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
    
    //elipses should be added, so activate megamenu
    $( "#megaMenuC .megaMenu" ).each(function() {
        $(this).css({"display":"none"})
    });
    $("#megaMenuC").css({"opacity":1.0})
    
    
    //ellipses for cards
    $(".cardsC .cards a .overlay").dotdotdot({
      ellipsis	: '... ',
      wrap		: 'word',
      fallbackToLetter: true,
      tolerance	: 2,
      watch: 'window'
    });
    

    //ellipses for cards hover txt
    $(".cardsC .cards a .hoverOverlay").dotdotdot({
      ellipsis	: '... ',
      wrap		: 'word',
      watch: 'window'
    });
    
});