$( document ).ready(function() {
    
    //Load Filters from the page into mobile naviagion
    var getRegionFilter = $("#filterRegion").clone();
    getRegionFilter.find(".filterHdr").remove();
    $("#mFilterRegion").append(getRegionFilter);
    
    var getDocTypeFilter = $("#filterDocumentType").clone();
    getDocTypeFilter.find(".filterHdr").remove();
    $("#mFilterDocumentType").append(getDocTypeFilter);

    var getDocTypeFilter = $("#filterSolution").clone();
    getDocTypeFilter.find(".filterHdr").remove();
    getDocTypeFilter.find("#clearFilterB").remove();    
    $("#mFilterSolution").append(getDocTypeFilter);
    
    
    /*
    var getSolutionFilter = "";
    if($("#filterSolution-Driveline").html()!== undefined){   
        getSolutionFilter = $("#filterSolution-Driveline").html();
    }
    if($("#filterSolution-Fuel").html()!== undefined){   
        getSolutionFilter = getSolutionFilter + $("#filterSolution-Fuel").html();
    }
    if($("#filterSolution-EngineOil").html()!== undefined){   
        getSolutionFilter = getSolutionFilter + $("#filterSolution-EngineOil").html();
    }
    if($("#filterSolution-Industrial").html()!== undefined){   
        getSolutionFilter = getSolutionFilter + $("#filterSolution-Industrial").html();
    }
    if($("#filterSolution-LubricantComponentsl").html()!== undefined){   
        getSolutionFilter = getSolutionFilter + $("#filterSolution-LubricantComponents").html();
    }
    $("#mFilterSolution").append(getSolutionFilter);
    if(getSolutionFilter==""){
        $("#mobileFilterNav li:eq(2)").css({"display": "none"});
    }
    */

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
    
    
    //If checkbox is clicked in mobile check it on page
    $("#mobileFilterNav input[type='checkbox']").click(function() {
        
        //get checked items name
        var getName = $(this).attr("name")
        var getValue = $(this).attr("value")
        var getStatus = $(this).is(':checked')

        //Add checked to the correct checkbox on the page
        if(getStatus){
            $("#filterC input[name='" + getName + "'][value='" + getValue + "']").prop('checked', true);
        }else{
            $("#filterC input[name='" + getName + "'][value='" + getValue + "']").prop('checked', false);
        }
        
    });
    
    
    //Reset button needs to reset all desktop items
    $("#mobileFilterForm #mobileClearFilterB input").click(function() {
        $('#filterC')[0].reset();
        
    });
    
});