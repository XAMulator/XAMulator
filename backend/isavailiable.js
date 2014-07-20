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
			res.writeHead(200);
			delete rows[0].P_Id;
			delete rows[0].O_Id;
			res.write(JSON.stringify(rows[0]));
			res.end();
		});
	});
}).listen(8000);