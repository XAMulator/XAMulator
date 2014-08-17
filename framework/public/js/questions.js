var questionHTML = {

		"mtpl": '../partials/multipleChoice.html',
		"shrt": '../partials/shortAnswer.html',
		"mtch": '../partials/matching.html',
		"othr": '../partials/other.html'
	};
function changeQuestionType(value, index){
			if (document.readyState == "complete"){
				$(".question-block").eq(index).load(questionHTML[value]);
				setTimeout(function () {
					$(".question-block").eq(index).find(".question-type")[0].onchange = function () {
						changeQuestionType(this.value,  index);
				};
			}, 100);
		};

	};

(function() {
	document.onreadystatechange = function() {
		if (document.readyState == "complete") {
		for (var i = 0; i < document.getElementsByClassName("question-type").length; i++) {
			var placement = i;
			document.getElementsByClassName("question-type")[placement].onchange = function() {
				changeQuestionType(this.value, placement);
		};
	}
	}}
})();
