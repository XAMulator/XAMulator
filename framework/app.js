
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var override = require('method-override');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var routes = require('./routes');
var newtest = require('./routes/newtest.js');
var app = express();

// all environments
app.set('port', process.env.PORT || 1337);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

app.get('/', routes.index);
app.get('/newtest', newtest.index);
app.post('/newtest', function(request, response) {
	var connection = mysql.createConnection({
	host: "angelhack.c626h2danuwm.us-west-2.rds.amazonaws.com",
	user: "angelhack",
	password: "angelhack",
	database: "testing"
	});
	connection.connect();
	response.set("Access-Control-Allow-Origin", "*");
	console.log("Connected to Database")
	console.log(request.body);
	var body = response.json(request.body);
	connection.query("INSERT INTO tests VALUES (" + 
												connection.escape(body.P_Id) + ', "' +
												connection.escape(body.name) + '",' +
												connection.escape(body.totalPoints) + ', \'' +
												connection.escape(body.datetimeCreated) + '\',' +
												connection.escape(body.datetimeTest) + ',' + 
												connection.escape(body.testAvailable) + ',' +
												connection.escape(body.foreignKey) + ',' +
												connection.escape(body.randomnized) + ',"' +
												connection.escape(body.examtime) + '")');
	connection.end();
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
