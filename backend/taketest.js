var http = require("http");
var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "angelhack.c626h2danuwm.us-west-2.rds.amazonaws.com",
	user: "angelhack",
	password: "angelhack",
	database: "testing"
});
connection.connect();

http.createServer(function(req, res) {
	var data = "";
	req.on("data", function(e) {
		data += e;
	});
	req.on("end", function() {
		res.writeHead(200, {"Access-Control-Allow-Origin": "*"});
		console.log("received request");
		connection.query("SELECT * FROM tests WHERE P_Id=" + data, function(err, rows, fields) {
			if (err) throw err;
			if (rows.length > 0) {
				if (rows[0].testAvailable) {
					connection.query("SELECT * FROM questions WHERE test=" + data, function(err, rows, field) {
						var questionArray = [];
						rows.forEach(function(e) {
							questionArray.push(JSON.parse(e.questionContent));
						});
						// parse test and send test here.
						
						res.write(JSON.stringify({"error": null, "test": questionArray}));
						res.end();
					});
				} else {
					res.write('{"error": "test not available"}');
					res.end();
				}
				delete rows[0].P_Id;
				delete rows[0].O_Id;
				res.write(JSON.stringify(rows[0]));
				res.end();
			} else {
				res.write("{\"error\": \"test not found\"}");
				res.end();
			}
		});
	});
}).listen(80);