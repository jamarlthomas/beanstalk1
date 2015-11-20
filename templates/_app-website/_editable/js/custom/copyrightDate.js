$( document ).ready(function() {
    
    var getDate = new Date();
    var getYear = getDate.getFullYear();
    
    $("#disclaimer #dateYear").html(getYear)
    
});