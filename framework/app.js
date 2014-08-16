﻿/**
 * Module dependencies.
 */

var express = require('express'),
		http = require('http'),
		path = require('path'),
		override = require('method-override'),
		mysql = require('mysql'),
		bodyParser = require('body-parser'),
		logger = require('express-logger'),
		sprintf = require("sprintf-js").sprintf,
		vsprintf = require("sprintf-js").vsprintf,
 		expressErrorHandler = require("express-error-handler"),
 		routes = require('./routes'),
 		test = require('./routes/test.js'),
 		newtest = require('./routes/newtest.js'),
 		app = express(),
 		server;

// all environments
app.set('port', process.env.PORT || 1337);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger({path: 'logs/log.txt'}));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


var connection = mysql.createConnection({
	host: "angelhack.c626h2danuwm.us-west-2.rds.amazonaws.com",
	user: "angelhack",
	password: "angelhack",
	database: "testing"
});
connection.connect();

/** all functions and code definitions go below
*/

var dateNow = date.now();

function shuffle(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

function log(msg){
	if (console !== undefined && msg !== undefined){
		console.log(msg);
	}
}
function formatDbEntries(array){
		var entries = [null];
		for (int i = 0; i < array.legnth; i++){

		}
		return entries;
}
var insertIntodb(db, array){
		if (array !== undefined && db !== undefined){
				var format = '%s';
				for (int i = 0; i<array.length -1; i++){
					format = "%s, " + format;
				}
				connection.query(connection.escape(sprintf("INSERT INTO %s VALUES " + sprintf(format, )), db))
	}
}


app.get('/', routes.index);
app.get('/test', test.index);
app.get('/newtest', newtest.index);
app.post('/newtest', function(request, response) {
		response.set("Access-Control-Allow-Origin", "*");
		response.json(request.body);

		var body = request.body,
				answersCounted = 0,
				limit,
				testId; //need to implement way to retrieve testID

		var entries = [
					conneciton.escape(body.testName),
					//...

		];

		
		log("INSERT INTO tests " + sprintf("%s, %s, %s, %s, %s, %s, %s, %s, %s",
																									connection.escape(body.testName),
																									connection.escape(body.testPoints), //NEEDS TO BE IMPLEMENTED
																									connection.escape(new Date().toISOString().slice(0, 19).replace('T', ' ')),
																									connection.escape(body.datetimeTest.replace("T", " ")), //Datepicker Needs to be implemented
																									connection.escape((new Date(body.datetimeTest.parse()) <= new Date().parse()) ? 0:1),//not tested
																									connection.escape(''), //need to implement teacher id
																									conneciton.escape(body.randomTestQuestions),
																									connection.escape('')
																									));
		connection.query("INSERT INTO tests " + sprintf("%s, %s, %s, %s, %s, %s, %s, %s, %s",
																									connection.escape(body.testName),
																									connection.escape(body.testPoints), //NEEDS TO BE IMPLEMENTED
																									connection.escape(new Date().toISOString().slice(0, 19).replace('T', ' ')),
																									connection.escape(body.datetimeTest.replace("T", " ")), //Datepicker Needs to be implemented
																									connection.escape((new Date(body.datetimeTest.parse()) <= new Date().parse()) ? 0:1),//not tested
																									connection.escape(''), //need to implement teacher id
																									conneciton.escape(body.randomTestQuestions),
																									connection.escape('')
																									));
	connection.query("SELECT P_Id FROM tests ORDER BY P_Id DESC LIMIT 1", function(err, row, fields){
		testId = rows[0].P_Id;
	})
	if (typeof(body.questionType) === "string"){
		limit = 1;
	} else {
		limit = body.questionType.length;
	}
	for (var i = 0; i < limit; i++){
		connection.query("INSERT INTO questions (questiontype, questionContent, answersJSON, correctAnswer, test, fullPoints, noAnswerPoints, wrongAnswerPoints, isRandomnized) VALUES (" +
																						sprintf("%s, %s, %s, %s, %s, %s, %s, %s, %s",
																										connection.escape(body.questionType[i]), //questiontype
																										connection.escape(body.question[i]), //questionContent
																										connection.escape(JSON.stringify(body.answer.slice(answersCounted, answersCounted + i))), //answers
																										connection.escape(body.correctAnswer[i]), //correctAnswer
																										connection.escape(testId), //Test Foreign Key not null
																										connection.escape(''), //Fullpoints
																										connection.escape(''), //noAnswerPoints
																										connection.escape(''), //wrongAnswerPoints
																										connection.escape('') //isRandom
																									 )
															+ ");"
		);
		answersCounted = answersCounted + i;
	}
});

app.post("/login/", function(request, response) {
	connection.query("SELECT * FROM students WHERE username='" + connection.escape(request.body.username) + "'", function(err, rows, fields) {
		if (rows.length > 0) {
			if (rows[0].password == request.body.password) {
				// send auth token????
			}
		} else {
			response.json({"error": "no such user found"});
		}
	});
	request.body.username;
	request.body.password;
});
// Get test questions
app.post("/taketest/", function(req, res) {
	res.set("Access-Control-Allow-Origin", "*");
	var body = req.body;
	connection.query("SELECT * FROM tests WHERE P_Id=" + connection.escape(body), function(err, rows, fields) {
		if (rows.length > 0) {
			if (rows[0].testAvailable) {
				var isRandomized = rows[0].randomnized;
				connection.query("SELECT * FROM questions WHERE test=" + connection.escape(body), function(err, rows, field) {
					var questionArray = [];
					rows.forEach(function(e) {
						questionArray.push({"question": e.questionContent, "answers": JSON.parse(e.answersJSON), "type": e.questiontype});
					});
					// parse test and send test here.
					if (!isRandomized) {
						res.json({"error": null, "test": questionArray});
					} else {
						res.json({"error": null, "test": shuffle(questionArray)});
					}
				});
			} else {
				res.json({"error": "test not available"});
			}
		} else {
			res.json({"error": "test not found"});
		}
	});

});
// Check test status
app.post("/checkstatus/", function(req, res) {
	res.set("Access-Control-Allow-Origin", "*");
	var body = req.body;
	connection.query("SELECT * FROM tests WHERE P_Id=" + connection.escape(data) + " LIMIT 1", function(err, rows, fields) {
		res.writeHead(200);
		delete rows[0].P_Id;
		delete rows[0].O_Id;
		res.json(rows[0]);
	});
});
app.post("/gradetest/", function(req, res) {
	var body = req.body;
	// Get answers
	var answerArr = [];
	connection.query("SELECT * FROM questions WHERE test=" + connection.escape(body.testId), function(err, rows, fields) {
		rows.forEach(function(row) {
			answerArr.push(row);
		});
	});
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
	* connection.query("INSERT INTO TABLE ??? VALUES (" + connection.escape(totalPoints) + ", " + connection.escape(body.studentId) + ")");
	*/
});

server = http.createServer(app);
// development only
// if ('development' == app.get('env')) {
	// app.use(expressErrorHandler({server: server}));
// }

server.listen(app.get("port"), function() {
	console.log("Express server listening on port " + app.get("port"));
});
