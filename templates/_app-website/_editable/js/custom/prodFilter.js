$( document ).ready(function() {
    
    var prodFilter = "open";
    
    //Mangage the Desktop Display    
    $("#hideFilterC").click(function(e) {
        
        e.preventDefault();
        
        //check status
        if(prodFilter == "open"){
        
            $( "#filterC" ).animate({
                height: "toggle"
            }, 1300, function(){
               
                $("#hideFilterC a .txt").text("Show Filter Options")
                
                $("#hideFilterC a .icon-arrow").css({"transform": "rotate(90deg)"})
  
            });
            
            prodFilter = "closed";
        
        }else {
            
            $( "#filterC" ).animate({
                height: "toggle"
            }, 1300, function(){
                
                $("#hideFilterC a .txt").text("Hide Filter Options")
                
                $("#hideFilterC a .icon-arrow").css({"transform": "rotate(-90deg)"})
                
                $(this).removeAttr( 'style' );
            });
                        
            prodFilter = "open";
        }

    });
    
    
    //If checkbox is clicked in the page check it on mobile
    $("#filterC input[type='checkbox']").click(function() {
        
        //get checked items name
        var getName = $(this).attr("name")
        var getValue = $(this).attr("value")
        var getStatus = $(this).is(':checked')

        //Add checked to the correct checkbox on the page
        if(getStatus){
            $("#mobileFilterNav input[name='" + getName + "'][value='" + getValue + "']").prop('checked', true);
        }else{
            $("#mobileFilterNav input[name='" + getName + "'][value='" + getValue + "']").prop('checked', false);
        }
        
    });
    
    //Reset button needs to reset all mobile items
    $("#filterC #clearFilterB input").click(function() {
        
        $('#mobileFilterForm')[0].reset();
        
    });
    
    
});