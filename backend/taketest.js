var http = require("http");
var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "angelhack.c626h2danuwm.us-west-2.rds.amazonaws.com",
	user: "angelhack",
	password: "angelhack",
	database: "testing"
});
connection.connect();

http.createSever(function(req, res) {
	var data = "";
	req.on("data", function(e) {
		data += e;
	});
	req.on("end", function() {
		connection.query("SELECT * FROM tests WHERE P_Id=" + e + " LIMIT 1", function(err, rows, fields) {
			if (err) throw err;
			if (rows) {
				if (rows[0].testAvailable) {
					connection.query("SELECT * FROM questions WHERE P_Id=" + e, function(err, rows, field) {
						// parse test and send test here.
						res.writeHead(200);
						res.write("not implemented scrubs");
						res.end();
					});
				} else {
					res.writeHead(500);
					res.write("{'error': 'test not available'}");
					res.end();
				}
				res.writeHead(200);
				delete rows[0].P_Id;
				delete rows[0].O_Id;
				res.write(JSON.stringify(rows[0]));
				res.end();
			} else {
				res.writeHead(500);
				res.write("{'error': 'test not found'}");
				res.end();
			}
		});
	});
}).listen(8000);