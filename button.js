//Author: Justin Yang
//        y4ng.com

//button.js

//http://github.com/justinyangusa/angelhack

//Angular JS

var ngAddApp = angular.module("ngAddApp", []);

    ngAddApp.controller("MainCtrl", ['$scope', function ($scope) {

      var numOf1 = 1; //number of origin address boxes
      var numOf2 = 1; //number of destination address boxes

      $scope.items1 = [ {} ]; //array of origin address boxes
      $scope.newItem1 = function () {
        $scope.items1.push( {} );
        numOf1++;
      }

      $scope.items2 = [ {} ]; //array of destination address boxes
      $scope.newItem2 = function () {
        $scope.items2.push( {} );
        numOf2++;
      }


      //Extracts the addresses in the text-forms and calculates all distance permutations
      //using the Google Maps API and algorithmic parsing
      //=================================================================================
      $scope.go = function() {

        distancesArray = [];
        originsArray = new Array($scope.items1.length);
        destinationsArray = new Array($scope.items2.length);

        for(var i1 in $scope.items1) {
          originsArray[i1] = $scope.items1[i1].text;
        }

        for(var i2 in $scope.items2) {
          destinationsArray[i2] = $scope.items2[i2].text;
        }


        //var centralOriginsArray = findCentroid(originsArray);
        calculateDistances(originsArray, destinationsArray);
      }

}]);


//Google Maps call
//================
function calculateDistances(originsArray, destinationsArray) {
    var service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
        {
          origins: originsArray,
          destinations: destinationsArray,
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false
        }, callback);
}







$(document).ready(function(){
  //Smooth scroll to anchor using JQuery
  //====================================
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $('html,body').animate({scrollTop: target.offset().top}, 1000);
              return false;
            }
        }
      });
  });


});
