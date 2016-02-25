var app2 = angular.module('termsAcronymsApp', ['angularUtils.directives.dirPagination']);

app2.controller('termsAcronymFilterCntl', ["$scope", "$http", function($scope, $http) {
    
    //turn on loading indicator
    $scope.dataLoaded = function(){return false};
    
    //Ajax Request JSON Results
    $http.get("page-assets/acronymsTerms.json").then(function(response) {
          
          //Get the results data
          $scope.data = response.data.results; 
          //console.log($scope.data)
        
          //when data is loaded remove loading indicator
          $scope.dataLoaded = function(){return true};
        
          //Get the itemsPerPage for pagination
          $scope.itemsPerpage = response.data.itemsPerPage; 
        
        }).catch(function(response){
          console.log("ajax error", response.status, response.data)
          
    });  
    

    
    //default sort order
    $scope.acronymTermSort = 'name';

    //To handle front end sort button
    $("#acronymsTermSortDD .customSelectC").on("click", "li", function(e) {
        
        var sortValue = $(this).attr("value")
        
        $scope.$apply(            
           $scope.acronymTermSort = sortValue
       )
        
    });
    
    

    
}]);
