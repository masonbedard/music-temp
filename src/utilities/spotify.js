var request = require('superagent');
var Album = require('../models/album.js');
var Track = require('../models/track.js');

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
			var itemsJson = albumJson.tracks.items;
			for (var j = 0; j < itemsJson.length; j++) {
				var itemJson = itemsJson[j];
				tracks.push(new Track(itemJson.track_number, itemJson.name, itemJson.duration_ms));
			}

			albums.push(new Album(id, imageURL, name, artist, tracks));

		}

		callback(false, albums);

	});

};

module.exports = {

	search: function(query, callback) {

		if (!callback || typeof(callback) !== 'function') {
			return;
		}

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
			getAlbums(ids, callback);

		});
	}

};
