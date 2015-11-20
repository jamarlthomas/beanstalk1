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
    
    //elipses should be added activate megamenu
    $( "#megaMenuC .megaMenu" ).each(function() {
        $(this).css({"display":"none"})
    });
    $("#megaMenuC").css({"opacity":1.0})
    
    //ellipses card mode
    $(".overlay").dotdotdot({
      ellipsis	: '... ',
      wrap		: 'word',
      fallbackToLetter: true,
      tolerance	: 2,
      watch: 'window'
    });
    
    
    
});