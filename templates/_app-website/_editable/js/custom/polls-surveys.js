$( document ).ready(function() {
   
    $('.pole').on('submit', function(e) {
        
        e.preventDefault();
        
        var $$  = $(this)
        
        var surveyAnswer = $$.find('input[name="question"]:checked').val();

        //if an answer is selectd
        if( typeof surveyAnswer != 'undefined'){
            
            var form_data = 'surveyAnswered=' + surveyAnswer;
            
            //submit results
            $.ajax({
                //type: "POST", 
                url: "?" + form_data,                 
                data: form_data,
                success: function (response) {
                    console.log(form_data);
                    
                    //receive databack from the sever
                    
                    //process and add results to the page
                    //Need Questions
                    //Need percentages of vote for each question
                    //Need the highest rated question
                    
                    
                    //hide poll
                    $$.hide(500)
            
                    //show results
                    $$.parent().find(".voteResults").show(500)
                    
                }
            }); 
            
            
            
            
        }
        
    });

    
});