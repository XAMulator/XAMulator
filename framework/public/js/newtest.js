function addUp() {
	var questionsJSON = [];
	var answerIndex = 0;
	for (var i = 0; i < document.getElementsByName("questionType").length; i++) {
		var questionObj = {};
		questionObj.questionType = document.getElementsByName("questionType")[i][document.getElementsByName("questionType")[i].selectedIndex].value;
		questionObj.question = document.getElementsByName("question")[i].value;
		questionObj.randomize = document.getElementsByName("randomnized")[i].checked;
		questionObj.answers = [];
		for (var j = answerIndex; j < answerIndex + parseInt(document.getElementsByName("amtAnswers")[i][document.getElementsByName("amtAnswers")[i].selectedIndex].value); j++) {
			questionObj.answers.push(document.getElementsByName("answer")[answerIndex].value);
		}
		questionObj.correctAnswer = document.getElementsByName("correctAnswer")[i][document.getElementsByName("correctAnswer")[i].selectedIndex].value;
		questionObj.points = parseInt(document.getElementsByName("points")[i].value);
		questionsJSON.push(questionObj);
	}
	return questionsJSON;
}
function sendQuestionsToServer() {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/newtest/", false);
	xhr.send(JSON.stringify(addUp()));
	alert("yay");
	return false;
}