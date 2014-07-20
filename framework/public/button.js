//Author: Justin Yang
//        y4ng.com

//button.js

//http://github.com/justinyangusa/angelhack

//Angular JS

var ngAddApp = angular.module("ngAddApp", []);

    ngAddApp.controller("MainCtrl", ['$scope', function ($scope) {

      var numOfQuestions = 1; //number of origin address boxes
      var numOfAnswers = 1; //number of destination address boxes

      $scope.questions = [ {} ]; //array of origin address boxes
      $scope.newQuestion = function () {
        $scope.questions.push( {} );
        numOfQuestions++;
      }

      $scope.answers = [ {} ]; //array of destination address boxes
      $scope.newAnswer = function () {
        $scope.answers.push( {} );
        numOfAnswers++;
      }

}]);
