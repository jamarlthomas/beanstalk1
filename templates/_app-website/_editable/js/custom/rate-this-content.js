$( document ).ready(function() {
 
    
    //Initial Rate 
    $('.rateBtn').on('click', function(e) {
        
        e.preventDefault();
        
        var helpfulValue = $(this).val();
        
        //open popup
        $("#ratePopup").fadeIn(500, function(){
        
            //remove initial quetion                   
            $("#rateContent").css({"visibility":"hidden"})
        
        });
        
        var form_data = 'answer=' + helpfulValue;
        
        //submit helpfulValue server
        $.ajax({
            //type: "POST", 
            url: "?" + form_data,                 
            data: form_data,
            success: function (response) {
                console.log(form_data);
            }
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
        
        var form_data = 'comment=' + comment;
        
        //submit comment
        $.ajax({
            //type: "POST", 
            url: "?" + form_data,                 
            data: form_data,
            success: function (response) {
                console.log(form_data);
            }
        }); 
        
        
    });
    
    
})