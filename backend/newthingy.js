var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: "angelhack.c626h2danuwm.us-west-2.rds.amazonaws.com",
	user: "angelhack",
	password: "angelhack",
	database: "testing"
});
connection.connect();

var app = express();
app.use(bodyParser.text());
app.post("/", function(request, response) {
	response.set("Access-Control-Allow-Origin", "*");
	console.log(request.body);
	var body = JSON.parse(request.body);
	connection.query("INSERT INTO tests VALUES (" + 
												body.P_Id + ', "' +
												body.name + '",' +
												body.totalPoints + ', \'' +
												body.DatetimeCreated + '\',' +
												body.DatetimeTest + ',' + 
												body.testAvailable + ',' +
												body.ForeignKey + ',' +
												body.randomnized + ',"' +
												body.examtime + '")');
	// body.questions.forEach(function (e){
		// connection.query("INSERT INTO questions VALUES (" +
														// e.P_Id + ',' +
														// e.questionType + ',' +
														// e.questionContent + ',' +
														// e.answersJSON + ',' +
														// e.correctAnswer + ',' +
														// body.P_Id + ',' +
														// e.fullPoints + ',' +
														// e.noAnswerPoints + ',' +
														// e.wrongAnswerPoints + ',' + ')' )});
	response.send("asdf");
});
app.listen(8000);