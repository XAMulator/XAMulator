var http = require("http");
var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var connection = mysql.createConnection({
	host: "angelhack.c626h2danuwm.us-west-2.rds.amazonaws.com",
	user: "angelhack",
	password: "angelhack",
	database: "testing"
});
connection.connect();

app.use(bodyParser.text());
app.post("/", function(req, res) {
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
						questionArray.push({"question": e.questionContent, "answers": JSON.parse(e.answersJSON)});
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
app.listen(8001);