$(document).ready(function() {
   
    
    //function that handles redirecting
    loadPage = function(cat, sortOrder) {
        
        if(typeof cat === 'undefined'){
            
            //get the default category value
            cat = $("#categoriesDD .orgSelect select").val();

        }
        
        window.location = "?sortorder=" + sortOrder + "&Category=" + cat + "&page=1";
        
    }
    
    
    //For cat list item click for desktop
    $('#categoriesDD .dropDownItemsC').on("click", "li", function(e) {
        
        var getCat = $(this).attr("value");
        
        loadPage(getCat, "DESC");
        
    });    
    
    //For cat list mobile drop down
    $('#categoriesDD .orgSelect select').change(function(){
        
        var getCat = $(this).val();
        
        loadPage(getCat, "DESC");
        
    });
    
    
    //Function to get parmaters from the URL
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };
    
    
    //For sort list item click for desktip
    $('#sortDD .dropDownItemsC').on("click", "li", function(e) {
        
        var selectedSort = $(this).attr("value");
        
        var getCat = getUrlParameter('Category');
        
        loadPage(getCat, selectedSort);
        
     });    
    
    //For sort list mobile drop down
    $('#sortDD .orgSelect select').change(function(){

        var selectedSort = $(this).val();
        
        var getCat = getUrlParameter('Category');

        loadPage(getCat, selectedSort);

    });
    
    
    //Updating selected Cat Drop Down for both desktop and mobile
    var findCat = getUrlParameter('Category');
    if(typeof findCat != 'undefined'){
        
        //find element drop down with catagory found in the URL and get the text
        var textOfSelectedDD = $("#categoriesDD .orgSelect select option[value='" + findCat + "']").text();
        
        //desktop update text label
        $('#categoriesDD .customSelectC .currentItem').text(textOfSelectedDD);
        
        //mobile update selected
        $("#categoriesDD .orgSelect select option[value='" + findCat + "']").attr('selected', true);
    }
    
    //Updating selected sort Drop Down for both desktop and mobile
    var findSort = getUrlParameter('sortorder');
    if(typeof findSort != 'undefined'){   
    
        //find element drop down with catagory found in the URL and get the text
        var textOfSelectedDD = $("#sortDD .orgSelect select option[value='" + findSort + "']").text();
        
        //desktop update text label
        $('#sortDD .customSelectC .currentItem').text(textOfSelectedDD);
        
        //mobile update selected
        $("#sortDD .orgSelect select option[value='" + findSort + "']").attr('selected', true);
        
    }
    
    
});