var request = require('superagent');
var Album = require('../models/album.js');
var Track = require('../models/track.js');

// var prepareQuery = function(query) {

// 	var albumRegEx = /^album\s*:\s*(.+)$/
// 	var album = albumRegEx.exec(trimmed);
// 	if (album && album[1]) {
// 		var split = album[1].split(/artist\s*:\s*/);
// 		var name = split[0].trim();
// 		console.log(name);
// 		if (split.length > 1) {
// 			var artist = split[1].trim();
// 			console.log(artist);
// 		}
// 		return;
// 	}
// 	var artistRegEx = /^artist\s*:\s*(.+)$/
// 	var artist = artistRegEx.exec(trimmed);
// 	if (artist && artist[1]) {
// 		var split = artist[1].split(/album\s*:\s*/);
// 		var artist = split[0].trim();
// 		console.log(artist);
// 		if (split.length > 1) {
// 			var name = split[1].trim();
// 			console.log(name);
// 		}
// 		return;
// 	}

// };

var getAlbums = function(ids, callback) {

	request.get('https://api.spotify.com/v1/albums').query({
		ids: ids.join(',')
	}).end(function(err, res) {

		if (err || !res.ok) {
			callback(true);
			return;
		}

		var albums = [];
		var albumsJson = res.body.albums;
		for (var i = 0; i < albumsJson.length; i++) {

			var albumJson = albumsJson[i];

			var id = albumJson.id;
			var imageURL = albumJson.images[0].url;
			var name = albumJson.name;
			var artist = albumJson.artists[0].name;
			var tracks = [];
			var trackStarts = [];

			var start = 0;
			var itemsJson = albumJson.tracks.items;
			for (var j = 0; j < itemsJson.length; j++) {
				var itemJson = itemsJson[j];
				tracks.push(new Track(itemJson.track_number, itemJson.name, itemJson.duration_ms));
				trackStarts.push(start);
				start += Math.ceil(itemJson.duration_ms / 1000);
			}
			trackStarts.push(start);

			albums.push(new Album(id, imageURL, name, artist, tracks, trackStarts));

		}

		callback(false, albums);

	});

};

module.exports = {

	search: function(query, callback) {

		if (!callback || typeof(callback) !== 'function') {
			return;
		}

		// query = prepareQuery(query);

		request.get('https://api.spotify.com/v1/search').query({
			q: query,
			type: 'album'
		}).end(function(err, res) {

			if (err || !res.ok) {
				callback(true);
				return;
			}

			var ids = [];
			var itemsJson = res.body.albums.items;
			for (var i = 0; i < itemsJson.length; i++) {
				ids.push(itemsJson[i].id);
			}

			if (ids.length) {
				getAlbums(ids, callback);
			} else {
				callback(true);
			}

		});
	}

};
