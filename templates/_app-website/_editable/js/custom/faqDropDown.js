$( document ).ready(function() {
    
    //function that handles updating FAQs for desktop an mobile
    updateFAQ = function(sectedFAQ) {
        
        if(sectedFAQ == "View-All-FAQs"){
        
            //reveal all faqs
            $('#faqItems .faqGroup').fadeIn(300);    
            
        }else {
        
            //hide all faq groups
            $('#faqItems .faqGroup').css({"display":"none"})

            //reveal correct faq 
            $("#" + sectedFAQ).fadeIn(300);
            
        }
        
    }
    
    
    //For list item click for desktop
    $('#faqDD .dropDownItemsC').on("click", "li", function(e) {
        
        var selFaq = $(this).text();
        selFaq = selFaq.replace(/ |_/g,"-")
        
        //update FAQs
        updateFAQ(selFaq);
        
    });
    
    //For mobile drop down
    $('#faqDD .orgSelect select').change(function(){
        
        var selFaq = $(this).find(":selected").val();
        
        //update FAQs
        updateFAQ(selFaq);
        
    })
    
});