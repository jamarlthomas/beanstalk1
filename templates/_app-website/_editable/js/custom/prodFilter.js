var app = angular.module('prodFilterApp', ['angularUtils.directives.dirPagination']);


app.controller('prodFilterCntl', ["$scope", "$location", "$http", "$timeout", function($scope, $location, $http, $timeout) {
    
    //function to update global varables for checkboxes when URL loads
    $scope.updateCheckboxItems = function(htmlRef, htmlRef2, urlDataIDs, checkboxesRef){

        if(typeof urlDataIDs !== "undefined" && urlDataIDs != -1 && urlDataIDs != ""){

            //build array from values found
            tempURLArray = urlDataIDs.split(",")
            
            //Update global Array of ID's
            retArrayIDs = tempURLArray;
           
            //Update global ID's in string format 
            retStringIDs = $scope.arrayToString2(tempURLArray)
            
            retArrayText = [];
             
            //loop through all the URL IDs
            for (i=0; i < tempURLArray.length; i++) { 
                
                //find checkbox in HTML and get the checkbox model
                tempModelID = $(htmlRef + " input[data-id='" + tempURLArray[i] +"']").attr("ng-model")
                
                //get just the id number
                tempModelID = tempModelID.replace(htmlRef2, "");
                tempModelID = tempModelID.replace("[", "");
                tempModelID = tempModelID.replace("]", "");
                 
                //Check the correct checkbox on the page
                checkboxesRef[tempModelID] = true;            
               
                //Find the checkbox in the html and get the text
                tempTextValue = $("#filterRegion input[data-id='" + tempURLArray[i] +"']").attr("data-text")
                
                //Update global Array of Text items   
                retArrayText.push(tempTextValue);
                
            }
            
            //Update global Text Items in text format
            var retSelected = $scope.arrayToString(retArrayText);
            
            return [ retArrayIDs, retStringIDs, retArrayText, retSelected ]

        }
        
    }
    
    
    //Watch URL
    $scope.$on('$locationChangeSuccess', function(event, next, current) { 
        
        var getURLPath = $location.path();
        var getURLPathArray = getURLPath.split("/")
        
        //*** Regional Updates
        var urlRegionsValues = getURLPathArray[2];
        
        //setup refrence to checkboxes
        $scope.region = [];
        var regionCheckboxesRef = $scope.region;
        
        //based on URL ID's make updates
        var returnVars = $scope.updateCheckboxItems("#filterRegion","region", urlRegionsValues, regionCheckboxesRef);
        
        //update global variables
        if(typeof returnVars !== "undefined"){
            $scope.regionArrayID = returnVars[0];        
            $scope.regionStringID = returnVars[1];
            $scope.regionArrayText = returnVars[2];
            $scope.regionSelected = returnVars[3];
        } 
        
        
        //*** DocType Updates
        var urlDocTypesValues = getURLPathArray[4];
        
        //setup refrence to checkboxes
        $scope.docType = [];
        var docTypeCheckboxesRef = $scope.docType;
        
        //based on URL ID's make updates
        var returnVars = $scope.updateCheckboxItems("#filterDocumentType","docType",urlDocTypesValues, docTypeCheckboxesRef);
        
        //update global variables
        if(typeof returnVars !== "undefined"){
            $scope.docTypeArrayID = returnVars[0];        
            $scope.docTypeStringID = returnVars[1];
            $scope.docTypeArrayText = returnVars[2];
            $scope.docTypeSelected = returnVars[3];
        }
        
        
        //*** Solution Updates
        var urlSolutionValues = getURLPathArray[8];
        
        //setup refrence to checkboxes
        $scope.solution = [];
        var solutionCheckboxesRef = $scope.solution;
        
        //based on URL ID's make updates
        var returnVars = $scope.updateCheckboxItems("#filterSolution","solution",urlSolutionValues, solutionCheckboxesRef);
        
        //update global variables
        if(typeof returnVars !== "undefined"){
            $scope.solutionArrayID = returnVars[0];        
            $scope.solutionStringID = returnVars[1];
            $scope.solutionArrayText = returnVars[2];
            $scope.solutionSelected = returnVars[3];
        }
        
        
        //*** Sorting Updates
        var urlSortValue = getURLPathArray[10];
        
        //update global sort value
        $scope.sortItems = urlSortValue
        
        //update the real drop down
        $("#filterSort .customSelectC ul").find("li[value='" + urlSortValue + "']").prop('selected', true);
        
        //update html drop down        
        $scope.mytimeout = $timeout(function() {
            
            $("#filterSort .customSelectC .currentItem").text(urlSortValue)
            
        }, 800);
        
        
        
        //*** Paging Updates
        var urlPageNumValue = getURLPathArray[12];
        
        $scope.pageNumber = urlPageNumValue
        
        
        //*** Search Updates
        var urlSearchValues = getURLPathArray[14];
        
        //add text to search box
        $scope.searchFilter = urlSearchValues;
        
        
        
        //run ajax request
        $scope.runQuery();
        
    });
    
    
    
    

    //convert checkbox objects into an array
    $scope.updateArray = function(array, textValue, value, orderNum) {
        
        if(value){
            array.push(textValue);
        }else {
            var itemToRemove = array.indexOf(textValue);
            array.splice(itemToRemove,1);
        }
        
        return array;
        
    }

    
    //convert to Array to string
    $scope.arrayToString = function(array) {
        
        tempString = ""
        
        tempString = array.join(", ");
        
        if(tempString == ""){
            
            tempString = "All"
        }
        
        return tempString
    }
    
    //convert to Array to string
    $scope.arrayToString2 = function(array) {
        
        tempString = ""
        
        tempString = array.join(",");
        
        if(tempString == ""){
            
            tempString = "-1"
        }
        
        return tempString
    }

    
    
    //Search Click
    $scope.searchFilter = "";
    $scope.search = function(searchItem) {
        $scope.pathUpdate();
    }
    
    
    //Region Watch
    $scope.regionArrayID = [];
    $scope.regionStringID = "-1";
    $scope.regionArrayText = [];
    $scope.regionSelected = "All";
    $scope.regionWatch = function(id, text, value){
        
        //ID Storage - for Ajax request
        $scope.regionArrayID = $scope.updateArray($scope.regionArrayID, id, value);
        $scope.regionStringID = $scope.arrayToString2($scope.regionArrayID )
        
        //Text Storage -  for display of items selected
        $scope.regionArrayText = $scope.updateArray($scope.regionArrayText, text, value);
        $scope.regionSelected = $scope.arrayToString($scope.regionArrayText);
        
        $scope.pathUpdateDebounce();
        
    }

    
    //DocType Watch    
    $scope.docTypeArrayID = [];
    $scope.docTypeStringID = "-1";
    $scope.docTypeArrayText = [];
    $scope.docTypeSelected = "All";
    $scope.docTypeWatch = function(id, text, value){

        //ID Storage - for Ajax request
        $scope.docTypeArrayID = $scope.updateArray($scope.docTypeArrayID, id, value);
        $scope.docTypeStringID = $scope.arrayToString2($scope.docTypeArrayID );
        
        //Text Storage -  for display of items selected
        $scope.docTypeArrayText = $scope.updateArray($scope.docTypeArrayText, text, value);
        $scope.docTypeSelected = $scope.arrayToString($scope.docTypeArrayText);
         
        $scope.pathUpdateDebounce();
       
    };
    
    
    //Solution Watch    
    $scope.solutionArrayID = [];
    $scope.solutionStringID = "-1";
    $scope.solutionArrayText = [];
    $scope.solutionSelected = "All";
    $scope.solutionWatch = function(id, text, value){
       
        //ID Storage - for Ajax request
        $scope.solutionArrayID = $scope.updateArray($scope.solutionArrayID, id, value);
        $scope.solutionStringID = $scope.arrayToString2($scope.solutionArrayID )
        
        //Text Storage -  for display of items selected
        $scope.solutionArrayText = $scope.updateArray($scope.solutionArrayText, text, value);
        $scope.solutionSelected = $scope.arrayToString($scope.solutionArrayText);
        
        $scope.pathUpdateDebounce();
       
    };
    

    
    //Sort Watch
    $scope.sortItems = "Newest"
    $scope.sorting = function() {
        $scope.pathUpdate();        
    }
    $("#filterSort .customSelectC").on("click", "li", function(e) {
       var itemSelected = $(this).text();
       $scope.sortItems = itemSelected       
       $scope.$apply( 
           $scope.pathUpdate()
       )        
    });

    
        
    //clear button watch
    $scope.reset = function() {
        
        $scope.searchFilter = ""
        $scope.regionArrayID = [];
        $scope.regionStringID = "-1";
        $scope.regionArrayText = [];
        $scope.regionSelected = "All"
        $scope.docTypeArrayID = [];
        $scope.docTypeStringID = "-1";
        $scope.docTypeArrayText = [];
        $scope.docTypeSelected = "All"
        $scope.solutionArrayID = [];
        $scope.solutionStringID = "-1";
        $scope.solutionArrayText = [];
        $scope.solutionSelected = "All"
        $scope.sortItems = "Newest"
        $scope.pageNumber = 1
        
        $scope.pathUpdate();
        
    };
    
    
    //Pagination Init
    $scope.total_count;
    $scope.itemsPerpage;
    $scope.pageNumber = 1;
    
    //Manage pagination links
    $scope.pageChanged = function(pageRequest) {
        
        $scope.pageNumber = pageRequest;
        
        $scope.pathUpdateDebounce();
    
    };
    

    //update URL Path
    $scope.pathUpdate = function(){
        
        //update URL
        $scope.pageURL = "/"
        $scope.pageURL = $scope.pageURL + "regions/" + $scope.regionStringID
        $scope.pageURL = $scope.pageURL + "/documents/" + $scope.docTypeStringID
        $scope.pageURL = $scope.pageURL + "/SBU/-1"
        $scope.pageURL = $scope.pageURL + "/solutions/" + $scope.solutionStringID 
        $scope.pageURL = $scope.pageURL + "/sort/" + $scope.sortItems
        $scope.pageURL = $scope.pageURL + "/page/" + $scope.pageNumber
        $scope.pageURL = $scope.pageURL + "/search/" + $scope.searchFilter
        $location.path($scope.pageURL)
        
        //updating url will trigger ajax request
        
        
    }
    
    
    //Delay requesting to reduce the number of requests
    $scope.pathUpdateDebounce = function() {  
        
        //set a delay for requesting ajax
        $timeout.cancel($scope.mytimeout);
        $scope.mytimeout = $timeout(function() {
            
            //run query
            $scope.pathUpdate();
            
        }, 800);
            
    }
    

    
    //function to handle query searches
    $scope.runQuery = function() {              

        
        //Sample URL Feed
        //$scope.ajaxRequest = "http://localhost:51872/filter/regions/-1/documents/-1/SBU/-1/solutions/-1"

        //create ajax request        
        $scope.ajaxRequest = "http://localhost:51872/filter/"
        $scope.ajaxRequest = $scope.ajaxRequest + "regions/" + $scope.regionStringID
        $scope.ajaxRequest = $scope.ajaxRequest + "/documents/" + $scope.docTypeStringID
        $scope.ajaxRequest = $scope.ajaxRequest + "/SBU/-1"
        $scope.ajaxRequest = $scope.ajaxRequest + "/solutions/" + $scope.solutionStringID 
        $scope.ajaxRequest = $scope.ajaxRequest + "/sort/" + $scope.sortItems
        $scope.ajaxRequest = $scope.ajaxRequest + "/page/" + $scope.pageNumber
        $scope.ajaxRequest = $scope.ajaxRequest + "/search/" + $scope.searchFilter 
        //console.log($scope.ajaxRequest)

        //reset display
        $scope.dataLoaded = function(){return false};
        $scope.prodfilterResults = "";


        //Run Ajax
        $http.get($scope.ajaxRequest)
            .then(function(response) {
            
              //Get Data of Items to be displayed
              $scope.prodfilterResults = response.data.results; 
              
              //Get the number of pages there are for this search
              $scope.total_count = response.data.pagecount; 
              //$scope.total_count = 100; 
              
              //Get the number of items to show per page
              $scope.itemsPerpage = response.data.itemsPerpage;
              //$scope.itemsPerpage = 2;
            
              //For preloader
              $scope.dataLoaded = function(){return true};

              //For No results
              $scope.checkForResults = function(){                  
                  console.log("test")
                //check if there are any results returned
                if($scope.prodfilterResults === null){
                  return true;
                }else{
                  return false;
                }

              }

          });

    }

    
}]);



/*
$( document ).ready(function() {

    //If checkbox is clicked in the page check it on mobile
    $("#filterC input[type='checkbox']").click(function() {
        console.log("tst")
        //get checked items name
        var getName = $(this).attr("name")
        var getValue = $(this).attr("value")
        var getStatus = $(this).is(':checked')

        //Add checked to the correct checkbox on the page
        if(getStatus){
            $("#mobileFilterNav input[name='" + getName + "'][value='" + getValue + "']").prop('checked', true);
        }else{
            $("#mobileFilterNav input[name='" + getName + "'][value='" + getValue + "']").prop('checked', false);
        }
        
    });
    
    //Reset button needs to reset all mobile items
    $("input#clearFilterB").click(function() {
        $('#mobileFilterForm')[0].reset();
        
    });
    
    
});
*/