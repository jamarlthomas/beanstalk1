$( document ).ready(function() {

  //if landing page drop down exists
  if($(".sbuLandingNavC").length){
      
      
      var ddStatus = "closed"
      
      //remove selected drop to current
      //var currDD = $(".sbuLandingDropNav").find(".sbuSelect").text()
      //$(".DropNav [data-sbudd='" + currDD + "']").parent().css({"display":"none"})    
      
      //grab html
      var stickyNavHTML = $(".sbuLandingNavC").html()

      //add html into the sticky header
      $("#stickySBU-navC").html(stickyNavHTML)  

      //initial check for sticky nav
      var scrollDist = $(document).scrollTop();
      stickyNavDetect();


       //fuction to detect sticky nav
       function stickyNavDetect() {

           //find the height of the page header image
           var navStickyDist = $("#sbuLandingHdrC").height();


           if(scrollDist > navStickyDist){

               //find the height of the sub nav
               var navStickyHeigth = $("#sbuLandingNavC").height();

               //hide subnav
               $("#sbuLandingNavC").css({"display":"none"})

               //turn on sticky
               $("#stickySBU-navC").css({"display":"block"})

               //addclase
               $("#stickySBU-navC").addClass("navDisplay")

               //add some padding to the welcome text area
               $(".twoColmnC").css({"paddingTop": navStickyHeigth + "px"})


           }else {

               //display subnav
               $("#sbuLandingNavC").css({"display":"block"})

               //turn off sticky
               $("#stickySBU-navC").css({"display":"none"})

               //addclase
               $("#stickySBU-navC").removeClass("navDisplay")

               //add some padding to the welcome text area
               $(".twoColmnC").removeAttr("style");

           }
           

           //activate nav based on where we are scrolled to
           $(".anchorTag").each(function () {
             
               var $$ = $(this);
               var thisId = $$.attr("id");
               var headerHeight = $("#topHeaderC").height()
               
               //get the heights of each section
               console.log($$.offset().top)
               
               //calculate button bars in viewable page
               //var screenDisplay = $$.offset().top - scrollDist
               var secDisplay = scrollDist - headerHeight
               
               /*
               if (screenDisplay <= 100 && screenDisplay >= -40) {
                   
                   //reset any active states
                   $(".sbuLandingNav a").removeAttr("style");
                   
                   //activate nav item
                   $(".sbuLandingNav a[href=#" + thisId + "]").css("background","#0c419a");
                   
                   //set dropdown status
                   var linkText = $(".sbuLandingNavC .sbuLandingNav a[href=#" + thisId + "]").text();
                   $(".sbuSelect").text(linkText)
                   
               }
               */
               
           })

           
       }



       //check distance scrolled
       $(document).scroll(function() {
           scrollDist = $(document).scrollTop();
           stickyNavDetect();
       })

       
       //drop down hover
       $(".sbuLandingDropNav").hover(
         function() {
             if(!isMobile.any()) {
                 //$(".DropNav").css({"display":"block"})            
                 $(".DropNav").fadeIn(500);
                 ddStatus = "open"
             }
       }, function() {
            //$(".DropNav").css({"display":"none"})
            $(".DropNav").fadeOut(100);
            ddStatus = "closed"
       });
      
       
      //click (for touch)
      $(".sbuLandingDropNav").click(function() {
        
        //on click decide wether to open or close language
        if(ddStatus == "closed"){
            $(".DropNav").fadeIn(500);
            ddStatus = "open"
        }else {
            $(".DropNav").fadeOut(100);
            ddStatus = "closed"
        }
        
      });
      
      
      //dispable active nav item
      $(".sbuSelect").click(function(e) {
        e.preventDefault();
      });

       
  }//close if
    
});