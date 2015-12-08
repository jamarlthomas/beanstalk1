$( document ).ready(function() {

  //define break point
  var bp1 = "(max-width: 1270px)"
  
  //initial check for sticky nav
  var scrollDist = $(document).scrollTop();
  stickyNavDetect();
   
   //fuction to detect sticky nav
   function stickyNavDetect() {
       
       //find the height of the header nav
       //var navStickyHeigth = $("#topHeaderC").height()
       var navStickyHeigth = 165;
       if (window.matchMedia(bp1).matches){
           navStickyHeigth = 78;
       }
       
       
       //find the height of the page header image
       var navStickyDist = $("#sbuLandingHdrC").height();
       
       //if searchbox is open recalc
       if($("#searchC").hasClass("searchOpen")){
           navStickyHeigth = navStickyHeigth + $("#searchC").height();
       }
       
       if(scrollDist > navStickyDist){
           
           //addclase
           $("#sbuLandingNavC").addClass("stickyNav-SBU")
           
           //make sticky
           $("#sbuLandingNavC").css({"position":"fixed","top":navStickyHeigth + "px","width":"100%","z-index":"40"});
           
           //add some padding to the welcome text area
           $(".twoColmnC").css({"paddingTop":"80px"})
           
       }else {
           
           //remove class
           $("#sbuLandingNavC").removeClass("stickyNav-SBU")
           
           //remove styling from sticky nav
           $("#sbuLandingNavC").removeAttr('style');
           
           //add some padding to the welcome text area
           $(".twoColmnC").removeAttr("style");
       }
   }
    

    
   /*
   
   //check distance scrolled
   $(document).scroll(function() {
       scrollDist = $(document).scrollTop();
       stickyNavDetect();
   })
   
   
   //if browser moves recalc -fire on resize complete
    var resizeId;
    $(window).resize(function() {
        clearTimeout(resizeId);
        resizeId = setTimeout(doneResizing, 300);
    });
 
    function doneResizing(){
        stickyNavDetect();
    }
    
    */
    
});