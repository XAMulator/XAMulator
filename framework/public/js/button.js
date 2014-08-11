//Author: Justin Yang
//        y4ng.com

//button.js

//http://github.com/justinyangusa/angelhack

//Angular JS
function addListener (reference){
	console.log(reference);

	$(".question-type")[reference].onchange = function () {
		console.log(this.value);
		changeQuestionType(this.value, reference + 2);
	}
};
var ngAddApp = angular.module("ngAddApp", []);

ngAddApp.controller("MainCtrl", ['$scope', function ($scope) {

	var numOfQuestions = 1;
	var numOfAnswers = 1;

	$scope.questions = [ {} ];
	$scope.newQuestion = function () {
		$scope.questions.push( {} );
		numOfQuestions++;
		setTimeout(function() {
			addListener(numOfQuestions - 1);
		}, 100)
	};

	$scope.removeQuestion = function (i) {
		$scope.questions.remove( {i} );
		numOfQuestions--;
	}

	$scope.answers = [ {} ];
	$scope.newAnswer = function () {
		$scope.answers.push( {} );
		numOfAnswers++;
	}

}]);
