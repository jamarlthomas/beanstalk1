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
    
    
});