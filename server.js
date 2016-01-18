var express = require('express');
var Spotify = require('./src/utilities/spotify.js');

var app = express();
app.use(express.static(__dirname + '/dist'));

app.get('/search', function(req, res) {

	var query = req.query.query;
	if (!query) {
		res.json({'err': true});
		return;
	}

	Spotify.search(query, function(err, albums) {
		if (err) {
			res.json({'err': true});
			return;
		}
		console.log("here");
		console.log(albums);
		res.json({
			'err': false,
			'albums': albums
		});
	});

});


app.listen(8080);
console.log("Server listening at localhost:8080");