$( document ).ready(function() {
    
    //Load Filters from the page into mobile naviagion
    var getRegionFilter = $("#filterRegion").clone();
    getRegionFilter.find(".filterHdr").remove();
    //getRegionFilter.find("[ng-model]").removeAttr("ng-model");
    getRegionFilter.find("[ng-click]").removeAttr("ng-click");
    $("#mFilterRegion").append(getRegionFilter);
    
    var getDocTypeFilter = $("#filterDocumentType").clone();
    getDocTypeFilter.find(".filterHdr").remove();
    $("#mFilterDocumentType").append(getDocTypeFilter);

    var getDocTypeFilter = $("#filterSolution").clone();
    getDocTypeFilter.find(".filterHdr").remove();
    getDocTypeFilter.find("#clearFilterB").remove();    
    $("#mFilterSolution").append(getDocTypeFilter);
    


   //Open Filter Navigation
    $('#mobileFilterBtn').click(function(e) {

        e.preventDefault()    

        //prep for animation of navigation
        $("#mobileFilterNavC1").css({"z-index":"100","width":"100%"})

        //Add class to trigger animation
        $("#mobileFilterNavC1").addClass("navFilterToggleOpen");

        //remove scrollbar from page
        $('html').css('overflow','hidden');
    });
    
    
    //Close Mobile Filter Function
    function closeMobileFilterNav(){

        //Add scrollbar back to page
        $('html').css('overflow','auto');

        //Animate out the navigation
        $("#mobileFilterNavC1").removeClass("navFilterToggleOpen");

        //Delay closing mobile nav overlay
        setTimeout(function(){
            $("#mobileFilterNavC1").css({"z-index":"0","width":"0px"})
        }, 1000);

    }
    
    //Close Mobile Filter Navigation Button
    $('#menuFilterclose').click(function(e) { e.preventDefault(); closeMobileFilterNav(); }); 
    
    
    //Set Mobile Filter Nav Status to help with other clicks
    $('#mobileFilterNavC').hover(
      function() {
        $(this).addClass("hover");
      }, function() {
        $(this).removeClass("hover");
      }
    );
    
    
    //close from grayed out section of the mobile filter
    $('#mobileFilterNavC1').click(function() { 
                                         
        //Check for hover event over mobile nav
        if(!$("#mobileFilterNavC").hasClass("hover")){
            closeMobileFilterNav(); 
        }
    });
    
    
    //accodion navigation for filter navigation
    $("#mobileFilterNav li a").click(function(e) {
        
        $(this).parent().find(".mobileFilterNavItems").animate({
            height: "toggle"
        }, 500);
        
    });
    
    
    //** Note control of the checkboxes are handled in product-filter.js
    
    
    //Reset button needs to reset all desktop items
    $("#mobileFilterForm #mobileClearFilterB input").click(function() {
        $('#filterC')[0].reset();
        
    });
    
});