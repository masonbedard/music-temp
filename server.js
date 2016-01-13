var express = require('express');
var app = express();
app.use(express.static(__dirname + '/dist'));

app.get('/search', function(req, res) {

	var query = req.query.query;
	console.log(query);
	res.json({status: 'yes'});

});


app.listen(8080);
console.log("Server listening at localhost:8080");