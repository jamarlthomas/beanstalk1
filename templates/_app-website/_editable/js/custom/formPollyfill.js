$( document ).ready(function() {
    
    //Add Placeholder for IE9
    $('input, textarea').placeholder();

    
    //Add required form validation for Safari and IOS Devices & IE9
    var getBrowser = head.browser.name
    var getBrowserVersion = head.browser.version
    
    formRequiredSupport = false;
    if( getBrowser=="ios" || getBrowser=="safari"){
        formRequiredSupport = true;
    }
    
    if( getBrowser=="ie"){
        if( getBrowserVersion=="9"){
            formRequiredSupport = true;
        }
    }
     
    
    if (formRequiredSupport) {
        var validateNamesArray = [];
        $(document).on("submit", function(e) {
            $(this)
                .find("input, select, textarea")
                .filter("[required]")
                .filter(function() { return this.value == ''; })
                .each(function() {
                    e.preventDefault();
                    $(this).css({ "border-color":"red" });
                    validateNamesArray.push( $(this).attr('placeholder') )                    
                });
                if(validateNamesArray.length >  0){
                    alert( "The following fields are required: " + validateNamesArray.toString() );
                }
                
        });

    }
    
    //Other Validations
    $(document).on("submit", "form", function(e) {
        
        var validateFields = [];
        
        //validate email address
        $(this)
            .find("input")
            .filter("[email]")
            .each(function() {
                
                var getEmailAddress = $(this).val();
                var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
                var emailResult = pattern.test(getEmailAddress);
                
                //if email address failed
                if(!emailResult){ 
                    e.preventDefault();
                    $(this).css({ "border-color":"red" });
                    validateFields.push( "Email Address" )  
                }
                
            });
        
        //validate phone number
        $(this)
            .find("input")
            .filter("[phone]")
            .each(function() {
                
                var getPhone = $(this).val();
                var phoneResult = getPhone.replace(/\D/g, "");
                
                console.log(getPhone.replace(/\D/g, ""))
            
                //if email address failed
                if(!phoneResult){ 
                    e.preventDefault();
                    $(this).css({ "border-color":"red" });
                    validateFields.push( "Phone Number" ) 
                }
                
            });

            if(validateFields.length >  0){
                alert( "The following fields didn't validate: " + validateFields.toString() );
            }
    
    });
    
});