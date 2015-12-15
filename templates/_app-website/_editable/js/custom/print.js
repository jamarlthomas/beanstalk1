 $(".icon-print").click(function(e) {
    e.preventDefault()
    
    //add print class to assist in hiding all the content
    $("body").addClass("printPage");
    
    //get the div that contains all the printable content
    var getPrintContent = $("#rtCol-contentArea").html();
    
     //add the content to the print container
     $("#printArea").html(getPrintContent);
    
     //trigger print 
     window.print();
     
     //delay changing display back
     setTimeout(function(){ 
        
         //clear print area
         $("#printArea").html("");
     
         //remove print class
         $("body").removeClass("printPage")
     
     }, 100);
     
     
     
});
