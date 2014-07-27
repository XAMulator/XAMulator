var express = require('express');
var bodyParser = require('body-parser');
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
app.use(bodyParser.urlencoded());
// Create test
app.post("/createtest/", function(request, response) {
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
// Login
app.post("/login/", function(request, response) {
	connection.query("SELECT * FROM students WHERE username='" + request.body.username + "'". function(err, rows, fields) {
		if (rows.length > 0) {
			if (rows[0].password == request.body.password) {
				// send auth token????
			}
		} else {
			response.send('{"error": "no such user found"}');
		}
	});
	request.body.username;
	request.body.password;
});
// Get test questions
app.post("/taketest/", function(req, res) {
	res.set("Access-Control-Allow-Origin", "*");
	var body = req.body;
	console.log(body);
	connection.query("SELECT * FROM tests WHERE P_Id=" + body, function(err, rows, fields) {
		if (rows.length > 0) {
			console.log(rows[0]);
			if (rows[0].testAvailable) {
				console.log("test aval");
				connection.query("SELECT * FROM questions WHERE test=" + body, function(err, rows, field) {
					var questionArray = [];
					rows.forEach(function(e) {
						console.log(e);
						questionArray.push({"question": e.questionContent, "answers": JSON.parse(e.answersJSON), "type": e.questiontype});
					});
					// parse test and send test here.
					
					res.send(JSON.stringify({"error": null, "test": questionArray}));
				});
			} else {
				console.log("test not aval");
				res.send('{"error": "test not available"}');
			}
		} else {
			console.log("test not aval2");
			res.send("{\"error\": \"test not found\"}");
		}
	});

});
// Check test status
app.post("/checkstatus/", function(req, res) {
	res.set("Access-Control-Allow-Origin", "*");
	var body = req.body;
	connection.query("SELECT * FROM tests WHERE P_Id=" + data + " LIMIT 1", function(err, rows, fields) {
		res.writeHead(200);
		delete rows[0].P_Id;
		delete rows[0].O_Id;
		res.send(JSON.stringify(rows[0]));
	});
});
app.post("/gradetest/", function(req, res) {
	var body = req.body;
	// Get answers
	var answerArr = [];
	connection.query("SELECT * FROM questions WHERE test=" + body.testId, function(err, rows, fields) {
		rows.forEach(function(row) {
			answerArr.push(row);
		});
	}
	// Get student responses <-- implement after we manage to store student responses somehow.
	var studentRes = ["foo", "bar"];
	// populate array with T or F based on correct/incorrect
	var corrections = [];
	for (var i = 0; i < studentRes.length; i++) {
		if (e[i] == answerArr[i].correctAnswer) {
			corrections[i] = true;
		} else if (e[i] == null) {
			corrections[i] = null;
		} else {
			corrections[i] = false;
		}
	}
	// Add up all the points and store into DB.
	var totalPoints = 0;
	for (var i = 0; i < corrections.length; i++) {
		if (corrections[i]) {
			totalPoints += answerArr[i].fullPoints;
		} else if (corrections[i] == null) {
			totalPoints += answerArr[i].noAnswerPoints;
		} else {
			totalPoints -= answerArr[i].wrongAnswerPoints;
		}
	}
	// Mock storing into DB
	/*
	* connection.query("INSERT INTO TABLE ??? VALUES (" + totalPoints + ", " + body.studentId + ")");
	*/
});
app.listen(8000);