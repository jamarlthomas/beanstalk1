$(document).ready(function() {
   
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
    
    
    
    //function that handles redirecting
    loadPage = function(cat, sortOrder, selDate, author) {
        
        if(typeof cat === 'undefined'){
            
            //get the default category value
            cat = $("#categoriesDD .orgSelect select").val();

        }
        
        if(typeof selDate === 'undefined'){
            //get the default category value
            selDate = $("#monthDD .orgSelect select").val();

        }
        
        if(typeof author === 'undefined'){
            //get the default category value
            author = $("#authorsDD .orgSelect select").val();

        }
        
        window.location = "?sortorder=" + sortOrder + "&Category=" + cat + "&Author=" + author + "&DateFilter=" + selDate + "&page=1";
        
    }
    
    
    
    //For cat list item click for desktop
    $('#categoriesDD .dropDownItemsC').on("click", "li", function(e) {
        
        var getCat = $(this).attr("value");
        
        var getDate = getUrlParameter('DateFilter');
        
        var getAuthor = getUrlParameter('Author');
        
        loadPage(getCat, "DESC", getDate, getAuthor);
        
    });    
    
    //For cat list mobile drop down
    $('#categoriesDD .orgSelect select').change(function(){
        
        var getCat = $(this).val();
        
        var getDate = getUrlParameter('DateFilter');
        
        var getAuthor = getUrlParameter('Author');
        
        loadPage(getCat, "DESC", getDate, getAuthor);
        
    });
    
    
    //For date list item click for desktop
    $('#monthDD .dropDownItemsC').on("click", "li", function(e) {
        
        var getDate = $(this).attr("value");
        
        var getAuthor = getUrlParameter('Author');
        
        var getCat = getUrlParameter('Category');
        
        loadPage(getCat, "DESC", getDate, getAuthor);
        
    });
    
    //For date list mobile drop down
    $('#monthDD .orgSelect select').change(function(){
        
        var getDate = $(this).val();
        
        var getAuthor = getUrlParameter('Author');
        
        var getCat = getUrlParameter('Category');
        
        loadPage(getCat, "DESC", getDate, getAuthor);
        
    });
    
    
    //For author list item click for desktop
    $('#authorsDD .dropDownItemsC').on("click", "li", function(e) {
        
        var getAuthor = $(this).attr("value");
        
        var getDate = getUrlParameter('DateFilter');
        
        var getCat = getUrlParameter('Category');
        
        loadPage(getCat, "DESC", getDate, getAuthor);
        
    });    
    
    //For author list mobile drop down
    $('#authorsDD .orgSelect select').change(function(){
        
        var getAuthor = $(this).val();
        
        var getDate = getUrlParameter('DateFilter');
        
        var getCat = getUrlParameter('Category');
        
        loadPage(getCat, "DESC", getDate, getAuthor);
        
    });
    
    
    
    //For sort list item click for desktop
    $('#sortDD .dropDownItemsC').on("click", "li", function(e) {
        
        var selectedSort = $(this).attr("value");
        
        var getCat = getUrlParameter('Category');
        
        var getDate = getUrlParameter('DateFilter');
        
        var getAuthor = getUrlParameter('Author');
        
        loadPage(getCat, selectedSort, getDate, getAuthor);
        
     });    
    
    //For sort list mobile drop down
    $('#sortDD .orgSelect select').change(function(){

        var selectedSort = $(this).val();
        
        var getCat = getUrlParameter('Category');
        
        var getDate = getUrlParameter('DateFilter');
        
        var getAuthor = getUrlParameter('Author');

        loadPage(getCat, selectedSort, getDate, getAuthor);

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
    
    //Updating date Drop Down for both desktop and mobile
    var findDate = getUrlParameter('DateFilter');
    if(typeof findDate != 'undefined'){
        
        //find element drop down with catagory found in the URL and get the text
        var textOfSelectedDD = $("#monthDD .orgSelect select option[value='" + findDate + "']").text();
        
        //desktop update text label
        $('#monthDD .customSelectC .currentItem').text(textOfSelectedDD);
        
        //mobile update selected
        $("#monthDD .orgSelect select option[value='" + findDate + "']").attr('selected', true);
    }
    
    //Updating author Drop Down for both desktop and mobile
    var findAuthor = getUrlParameter('Author');
    if(typeof findAuthor != 'undefined'){
        
        //find element drop down with catagory found in the URL and get the text
        var textOfSelectedDD = $("#authorsDD .orgSelect select option[value='" + findAuthor + "']").text();
        
        //desktop update text label
        $('#authorsDD .customSelectC .currentItem').text(textOfSelectedDD);
        
        //mobile update selected
        $("#authorsDD .orgSelect select option[value='" + findAuthor + "']").attr('selected', true);
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