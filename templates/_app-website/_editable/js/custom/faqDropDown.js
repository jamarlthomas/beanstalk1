$( document ).ready(function() {
    
    //on drop down change navigate to a new url
    $('#faqsHdrC .selectC select').on('change', function () {
        
        //get path without page name
        var newPath = location.href.substring(0, location.href.lastIndexOf("/")+1)

        //find item selected value
        var faqReq = $(this).val();
        
        //if not view all
        if(faqReq != "View-All" ){
            
            newPath = newPath + faqReq
            
        }
        
        window.location = newPath;
        
      }); 
    
});