var app = angular.module('prodFilterApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) { 

    $stateProvider    
        .state('home', {
          url: '/doc/{}',
          //templateUrl: 'homeContent.html', 
          controller: 'prodFilterCntl'
        })

}]); 



app.controller('prodFilterCntl', ["$scope", "$location", "$http", "$timeout", "$q", function($scope, $location, $http, $timeout, $q) {
    

    //convert checkbox objects into an array
    $scope.objToArray = function(obj, type) {
        
        $scope.tempArray = [];
        
        angular.forEach(obj, function(element,key) {
            
            if(!element){
                //remove if false
                $scope.tempArray.splice(key, temp[1]);
            }else {//add if checked
                
                //get string values
                if(type=="string"){
                    //break Out Strings
                    temp = element.split("|")                    
                    $scope.tempArray.push(temp[0]);
                }
                //
                if(type=="id"){
                    //break Out Ids
                    temp = element.split("|")                    
                    $scope.tempArray.push(temp[1]);
                }
            }
        });
        
        return $scope.tempArray;
        
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
    
    
    //Search Click
    $scope.searchFilter = ""
    $scope.search = function(searchItem) {
        $scope.runQuery();
    }
    
    
    //Region Watch
    $scope.regionArrayID = [];
    $scope.regionArrayString = [];
    $scope.regionCurrentSelected = "All"
    $scope.$watchCollection('region',  function(newVal, oldVal) {
        
        //prevent from firing on load 
        if(!newVal) return; 
        //console.log($scope.region)

        $scope.regionArrayID = $scope.objToArray($scope.region, "id");
        //console.log($scope.regionArrayID);
        
        $scope.regionArrayString = $scope.objToArray($scope.region, "string");
        $scope.regionCurrentSelected = $scope.arrayToString($scope.regionArrayString);
                
        $scope.runQueryDebounce();
        
    });
    
    
    //DocType Watch
    $scope.docTypeArrayID = [];
    $scope.docTypeArrayString = [];
    $scope.docTypeCurrentSelected = "All"
    $scope.$watchCollection('docType',  function(newVal, oldVal) {
        
        //prevent from firing on load 
        if(!newVal) return; 
        //console.log($scope.docType)

        $scope.docTypeArrayID = $scope.objToArray($scope.docType, "id");
        //console.log($scope.docTypeArrayID);
        
        $scope.docTypeArrayString = $scope.objToArray($scope.docType, "string");
        $scope.docTypeCurrentSelected = $scope.arrayToString($scope.docTypeArrayString);
        
        $scope.runQueryDebounce();
        
    });
    
    
    //Solution Watch
    $scope.solutionArrayID = [];
    $scope.solutionArrayString = [];
    $scope.solutionCurrentSelected = "All"
    $scope.$watchCollection('solution',  function(newVal, oldVal) {
        
        //prevent from firing on load 
        if(!newVal) return;         
        //console.log($scope.solution)
        
        $scope.solutionArrayID = $scope.objToArray($scope.solution, "id");
        //console.log($scope.solutionArrayID);
        
        $scope.solutionArrayString = $scope.objToArray($scope.solution, "string");
        $scope.solutionCurrentSelected = $scope.arrayToString($scope.solutionArrayString);
        
        $scope.runQueryDebounce();
        
    });
    

    
    //Sort Watch
    $scope.sortItems = "Newest"
    $scope.sorting = function() {
        
        $scope.runQuery();
        
    }
    $("#filterSort .customSelectC").on("click", "li", function(e) {
       var itemSelected = $(this).text();
       $scope.sortItems = itemSelected
       $scope.runQuery();
    });
    
    
        
    //clear button watch
    $scope.reset = function() {
        
        $scope.searchFilter = ""
        $scope.regionArrayID = [];
        $scope.regionArrayString = [];
        $scope.regionCurrentSelected = "All"
        $scope.docTypeArrayID = [];
        $scope.docTypeArrayString = [];
        $scope.docTypeCurrentSelected = "All"
        $scope.solutionArrayID = [];
        $scope.solutionArrayString = [];
        $scope.solutionCurrentSelected = "All"
        $scope.sortItems = "Newest"
        $scope.pageNum = 1
        
        $scope.runQuery();
        
    };
    
    
    //Page Number
    $scope.pageNum = 1;
    
    
    
    //Delay requesting ajax to reduce the number of requests
    $scope.runQueryDebounce = function() {  
        
        //set a delay for requesting ajax
        $timeout.cancel($scope.mytimeout);
        $scope.mytimeout = $timeout(function() {
            
            //run query
            $scope.runQuery();
            
        }, 1000);
            
    }
    
                  
    //function to handle query searches
    $scope.runQuery = function() {              
        
        
        regionParam = $scope.regionArrayID.join(",");
        if(regionParam == ""){
            regionParam = -1
        }
        
        docTypeParam = $scope.docTypeArrayID.join(",");
        if(docTypeParam == ""){
            docTypeParam = -1
        }
        
        solutionParam = $scope.solutionArrayID.join(",");
        if(solutionParam == ""){
            solutionParam = -1
        }
        
        //sortParam = $scope.sortItems;
        //console.log(sortParam)
        /*
        if(solutionParam == ""){
            solutionParam = -1
        }
        */
        
        //$scope.ajaxRequest = "http://localhost:51872/filter/regions/-1/documents/-1/SBU/-1/solutions/-1"
        //$scope.ajaxRequest = "http://localhost:51872/filter/regions/-1/documents/1/SBU/26/solutions/510"

        //create ajax request
        $scope.ajaxRequest = "http://localhost:51872/filter/"
        $scope.ajaxRequest = $scope.ajaxRequest + "regions/" + regionParam
        $scope.ajaxRequest = $scope.ajaxRequest + "/documents/" + docTypeParam
        $scope.ajaxRequest = $scope.ajaxRequest + "/SBU/-1"
        $scope.ajaxRequest = $scope.ajaxRequest + "/solutions/" + solutionParam 
        $scope.ajaxRequest = $scope.ajaxRequest + "/sort/" + $scope.sortItems
        $scope.ajaxRequest = $scope.ajaxRequest + "/page/" + $scope.pageNum
        $scope.ajaxRequest = $scope.ajaxRequest + "/search/" + $scope.searchFilter 
        console.log($scope.ajaxRequest)
        
        
        //reset display
        $scope.dataLoaded = function(){return false};
        $scope.prodfilterResults = "";

        //Run Ajax
        $http.get($scope.ajaxRequest)
            .then(function(response) {
            
              //Get Data of Items to be displayed
              $scope.prodfilterResults = response.data.results; 
              //console.log($scope.prodfilterResults)

              //For preloader
              $scope.dataLoaded = function(){return true};

              //For No results
              $scope.checkForResults = function(){                  

                //check if there are any results returned
                if($scope.prodfilterResults === null){
                  return true;
                }else{
                  return false;
                }

              }

          });

    }
    $scope.runQuery();
    
    
    
                  
                  
    //console.log($location.path())
    
    //$location.path("/test")
    
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