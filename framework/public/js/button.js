function addListener (reference){

	$(".question-type")[reference].onchange = function () {
		changeQuestionType(this.value, reference);
	}
};
var ngAddApp = angular.module("ngAddApp", []);

		ngAddApp.controller("MainCtrl", ['$scope', function ($scope) {

			var numOfQuestions = 1; //number of origin address boxes
			var numOfAnswers = 1; //number of destination address boxes

			$scope.questions = [ {} ]; //array of origin address boxes
			$scope.newQuestion = function () {
				$scope.questions.push( {} );
				numOfQuestions++;
				setTimeout(function() {
					addListener(numOfQuestions - 1);
				}, 100)

			};

			$scope.answers = [ {} ]; //array of destination address boxes
			$scope.newAnswer = function () {
				$scope.answers.push( {} );
				numOfAnswers++;
		 }

}]);
