$( document ).ready(function() {
  
  
  //Initialize Custom Design Select Replacement
  $(".customSelectC").each(function(index) {
    
    //var buildDD = "<div class='customSelect'>"
     var buildDD = "<div class='currentItem'></div>"
    buildDD = buildDD + "<div class='dropDownItemsC'>"
    buildDD = buildDD + "<ul>";
     
    //loop and build select box
    var optSelectedTxt = "";
    var firstOptTxt = "";
    $(this).find("option").each(function(){      
      if(firstOptTxt == ""){
        firstOptTxt = $(this).text();
      }
      
      var addClass = false;
      var optSelected = false;
      var optDisabled = false;
      
      if($(this).is("[selected]")){
        optSelectedTxt = $(this).text();
        optSelected = true;
        addClass = true;
      }
      
      if($(this).is("[disabled]")){
        optDisabled = true;
        addClass = true;
      }
      
      buildDD = buildDD + "<li";
      buildDD = buildDD + " value='" + $(this).val() +"'";
      
      if(addClass){
        buildDD = buildDD + " class='";
        
        if(optSelected){
          buildDD = buildDD + "selected";
        }
        
        if(optDisabled){
          buildDD = buildDD + " disabled";
        }
        
        buildDD = buildDD + "'";
      }
      
      buildDD = buildDD + ">"
      buildDD = buildDD + $(this).text();      
      buildDD = buildDD + "</li>";
      
    });
    
    buildDD = buildDD + "</ul>";
    buildDD = buildDD + "</div>";
    //buildDD = buildDD + "</div>";
    
    //write list to the page
    $(this).prepend(buildDD)
    
    //adjust current view
    if(optSelectedTxt != ""){
      $(this).find(".currentItem").text(optSelectedTxt)
    }else {
      $(this).find(".currentItem").text(firstOptTxt);
    }
    
      
    //adjust the width if needed
    //var widthOfItemsC = $(this).find(".dropDownItemsC").outerWidth() + 20;
    //$(this).find(".currentItem").css({"min-width": widthOfItemsC})
    //$(this).find(".dropDownItemsC").css({"min-width": widthOfItemsC})
    
    
    //open & close list
    $(this).on("click", ".currentItem", function(e) {
      e.stopPropagation();

      //close
      if($(this).parent().hasClass("openSelect")){
          $(this).parent().removeClass("openSelect")
          $(this).parent().find(".dropDownItemsC").fadeOut(200);
        
      }else { //open        
        
        //close all item to fix multiple opens
        $(".customSelectC .dropDownItemsC").fadeOut(200);
        $(".customSelectC").removeClass("openSelect");
        
        //detrmine openning position
        var windowHeight = $(window).height();
        var selectTopPos = $(this).offset().top;
        var scrollPos = $(window).scrollTop();
        var selectHeight = $(this).outerHeight();
        var distFromBtm = windowHeight - selectTopPos + scrollPos - selectHeight;
        var selectDropHeight = $(this).parent().find(".dropDownItemsC").height();
        var selectDropMove = (selectDropHeight + selectHeight) * -1;
        //check if there is room at the bottom to open
        if(distFromBtm < selectDropHeight){
          //add style to position to open above
          $(this).parent().find(".dropDownItemsC").css({"margin-top": selectDropMove})
        }else{
          //remove styles for default open to below
          $(this).parent().find(".dropDownItemsC").css({"margin-top": "-1px"})
        }
        
        //now open the on selected
        $(this).parent().addClass("openSelect")
        $(this).parent().find(".dropDownItemsC").fadeIn(200);
        
      }

      
    });
    
    
    //add selected item & update real select
    $(this).on("click", "li", function(e) {
      e.stopPropagation();
      
      //check if this has been disabled
      var isDisabled = $(this).hasClass("disabled")
      
      if(!isDisabled){
        
        //which item was clicked
        var listItem = $(this).prevAll().length;       
        $(this).parent().parent().parent().find("option:eq(" + listItem + ")").prop('selected', true)      
        
        //update selected display text
        var selectedItemText = $(this).text();
        $(this).parent().parent().parent().find(".currentItem").text(selectedItemText);
        
        //close the drop down
        $(this).parent().parent().parent().removeClass("openSelect")
        $(this).parent().parent().fadeOut(200);
      }
      
    });
    
  });
  
    
  //Need to change body cursor for ios for click register
  if (/ip(hone|od)|ipad/i.test(navigator.userAgent)) {
    $("body").css("cursor", "pointer");
  }
  //outside click close any open items 
  $("body").on("click",  function() {
    $(".customSelectC").removeClass("openSelect")
    $(".customSelectC .dropDownItemsC").fadeOut(200);
  });

    
    
  //Submit check
  /*
  $("#test").submit(function(e) {
    e.preventDefault();
    console.log( $("select[name='movies']").val() );
  });
  */ 
  
});

