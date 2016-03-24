$( document ).ready(function() {
    
    storeRateID = "";
    
    //Initial Rate 
    $('.rateBtn').on('click', function(e) {
        
        e.preventDefault();
            
        var helpfulValue = $(this).val();
        
        //open popup
        $("#ratePopup").fadeIn(500, function(){
        
            //remove initial quetion                   
            $("#rateContent").css({"visibility":"hidden"})
        
        });
        
        //submit rating and store id that is returned so we can sumbit comment
        var url = "http://localhost:22062/rate-this-content"
        $.getJSON( url, { init: helpfulValue } )
          .done(function( data ) {
            storeRateID = data.Rating[0].id;            
          })
          .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            //console.log( "Request Failed: " + err ); 
        });
           
        
    });
    
    //close btn
    $("#closeSubmit").click(function(e){
        
        e.preventDefault();
        
        $("#ratePopup").fadeOut(500);
        
    });
    
    
    //submit btn
    $("#rateSubmit").click(function(e){
        
        e.preventDefault();
        
        var comment = $("#rateComment").val();
        
        $("#ratePopup").fadeOut(500);
        
        //submit comment
        $.ajax({
            type: "POST", 
            url: "http://localhost:22062/rate-this-content",                 
            data:{ "id": storeRateID, "comment": comment }, 
            success: function (response) {
                //console.log(response);
            },
            dataType: "json"
        }); 
        
        
    });
    
    
})