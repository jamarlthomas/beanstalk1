var app = angular.module('prodFilterApp', ['ui.router','angularUtils.directives.dirPagination']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) { 

    $stateProvider    
        .state('home', {
          url: '/doc/',
          //templateUrl: 'homeContent.html', 
          controller: 'test'
        })

}]); 


app.controller('prodFilterCntl', ["$scope", "$location", "$http", "$timeout", function($scope, $location, $http, $timeout) {
    
    
    
    //Watch URL
    $scope.$on('$locationChangeSuccess', function(event, next, current) { 
        
        var getURLPath = $location.path();
        var getURLPathArray = getURLPath.split("/")
        
        //*** REGION UPDATE ****/
        var urlRegionsValues = getURLPathArray[2]
        if(typeof urlRegionsValues !== "undefined" && urlRegionsValues != -1){

            urlRegionsArray = urlRegionsValues.split(",")
            
            //store each id of item in the array
            $scope.regionArrayID = urlRegionsArray;
            
            //store the string to be displayed
            $scope.regionArrayIDString = $scope.arrayToString2(urlRegionsArray)
            
            //clear array
            $scope.regionArrayText = [];
            
            $scope.region = [];
            for (i=0; i < urlRegionsArray.length; i++) { 
                getModelID = $("#filterRegion input[data-id='" + urlRegionsArray[i] +"']").attr("ng-model")
                getModelID = getModelID.replace("region[", "");
                getModelID = getModelID.replace("]", "");
                
                //check each item
                $scope.region[getModelID] = true;
                
                //store the text in the array                
                getRegionValue = $("#filterRegion input[data-id='" + urlRegionsArray[i] +"']").attr("data-text")
                $scope.regionArrayText.push(getRegionValue);
                
            }
            
            $scope.regionCurrentSelected = $scope.arrayToString($scope.regionArrayText);
            
        }
        
        
        /*** DOCTYPE UPDATE ***
        var urlDocTypeValues = getURLPathArray[4]
        if(typeof urlDocTypeValues !== "undefined" && urlDocTypeValues != -1){

            urlRegionsArray = urlRegionsValues.split(",")
            
            //store each id of item in the array
            $scope.regionArrayID = urlRegionsArray;
            
            //store the string to be displayed
            $scope.regionArrayIDString = $scope.arrayToString2(urlRegionsArray)
            
            //clear array
            $scope.regionArrayText = [];
            
            $scope.region = [];
            for (i=0; i < urlRegionsArray.length; i++) { 
                getModelID = $("#filterRegion input[data-id='" + urlRegionsArray[i] +"']").attr("ng-model")
                getModelID = getModelID.replace("region[", "");
                getModelID = getModelID.replace("]", "");
                
                //check each item
                $scope.region[getModelID] = true;
                
                //store the text in the array                
                getRegionValue = $("#filterRegion input[data-id='" + urlRegionsArray[i] +"']").attr("data-text")
                $scope.regionArrayText.push(getRegionValue);
                
            }
            
            $scope.regionCurrentSelected = $scope.arrayToString($scope.regionArrayText);
            
        }
        */
        
        

                
               
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
    $scope.regionArrayIDString = "-1";
    $scope.regionArrayText = [];
    $scope.regionCurrentSelected = "All";
    $scope.regionWatch = function(id, text, value){
        
        //ID Storage - for Ajax request
        $scope.regionArrayID = $scope.updateArray($scope.regionArrayID, id, value);
        $scope.regionArrayIDString = $scope.arrayToString2($scope.regionArrayID )
        
        //Text Storage -  for display of items selected
        $scope.regionArrayText = $scope.updateArray($scope.regionArrayText, text, value);
        $scope.regionCurrentSelected = $scope.arrayToString($scope.regionArrayText);
        
        $scope.pathUpdateDebounce();
        
    }

    
    //DocType Watch    
    $scope.docTypeArrayID = [];
    $scope.docTypeArrayIDString = "-1";
    $scope.docTypeArrayText = [];
    $scope.docTypeCurrentSelected = "All";
    $scope.docTypeWatch = function(id, text, value){

        //ID Storage - for Ajax request
        $scope.docTypeArrayID = $scope.updateArray($scope.docTypeArrayID, id, value);
        $scope.docTypeArrayIDString = $scope.arrayToString2($scope.docTypeArrayID );
        
        //Text Storage -  for display of items selected
        $scope.docTypeArrayText = $scope.updateArray($scope.docTypeArrayText, text, value);
        $scope.docTypeCurrentSelected = $scope.arrayToString($scope.docTypeArrayText);
         
        $scope.pathUpdateDebounce();
       
    };
    
    
    
    //Solution Watch
    
    $scope.solutionArrayID = [];
    $scope.solutionArrayIDString = "-1";
    $scope.solutionArrayText = [];
    $scope.solutionCurrentSelected = "All";
    $scope.solutionWatch = function(id, text, value){
       
        //ID Storage - for Ajax request
        $scope.solutionArrayID = $scope.updateArray($scope.solutionArrayID, id, value);
        $scope.solutionArrayIDString = $scope.arrayToString2($scope.solutionArrayID )
        
        //Text Storage -  for display of items selected
        $scope.solutionArrayText = $scope.updateArray($scope.solutionArrayText, text, value);
        $scope.solutionCurrentSelected = $scope.arrayToString($scope.solutionArrayText);
        
        $scope.pathUpdateDebounce();
       
    };
    

    
    //Sort Watch
    $scope.sortItems = "Newest"
    $scope.sorting = function() {
        console.log("sort")
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
        $scope.regionArrayIDString = "-1";
        $scope.regionArrayText = [];
        $scope.regionCurrentSelected = "All"
        $scope.docTypeArrayID = [];
        $scope.docTypeArrayIDString = "-1";
        $scope.docTypeArrayText = [];
        $scope.docTypeCurrentSelected = "All"
        $scope.solutionArrayID = [];
        $scope.solutionArrayIDString = "-1";
        $scope.solutionArrayText = [];
        $scope.solutionCurrentSelected = "All"
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
        $scope.pageURL = $scope.pageURL + "regions/" + $scope.regionArrayIDString
        $scope.pageURL = $scope.pageURL + "/documents/" + $scope.docTypeArrayIDString
        $scope.pageURL = $scope.pageURL + "/SBU/-1"
        $scope.pageURL = $scope.pageURL + "/solutions/" + $scope.solutionArrayIDString 
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
        $scope.ajaxRequest = $scope.ajaxRequest + "regions/" + $scope.regionArrayIDString
        $scope.ajaxRequest = $scope.ajaxRequest + "/documents/" + $scope.docTypeArrayIDString
        $scope.ajaxRequest = $scope.ajaxRequest + "/SBU/-1"
        $scope.ajaxRequest = $scope.ajaxRequest + "/solutions/" + $scope.solutionArrayIDString 
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