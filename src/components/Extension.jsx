var React = require('react');
var request = require('superagent');
var Selected = require('./Selected.jsx');
var Search = require('./Search.jsx');
var Result = require('./Result.jsx');
var Album = require('../models/album.js');
var Track = require('../models/track.js');
var contentScript = require('../utilities/contentScript.js');

var bg = chrome.extension.getBackgroundPage();
var tabId;
var url;

module.exports = React.createClass({
	
	getInitialState: function() {
		bg.albums = bg.album ? [] : bg.albums;
		return {
			album: bg.album,
			albums: bg.albums
		};
	},

	componentDidMount: function() {

		var self = this;
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

			if (!tabs || tabs.length !== 1) {
				console.log('error getting tab');
				return;
			}

			var tab = tabs[0];

			if (!tab || tab.url.indexOf('youtube') === -1) {
				console.log('error getting youtube tab');
				return;
			}

			console.log('here');
			tabId = tab.id;

			// default query?
			// var query = tab.title.slice(0, -10);
			// console.log('query ' + query);
			// self.query(query);

		});

	},

	query: function(query) {

		var self = this;
		request.get('http://localhost:8080/search').query({query: query}).end(function(err, res) {
			if (err) {
				console.log("error");
				return;
			}
			var albums = res.body.albums;
			bg.albums = albums;
			self.setState({albums: albums});
		});
			
		// var albums = [
		// 	new Album(
		// 		'3Ywlsvgu3H6L3q9NHydNR3', 
		// 		'https://i.scdn.co/image/73bbc6a3b2e9ca5cb0bca5ce6d4c0859fbd5b498',
		// 		'Pure Heroine',
		// 		'Lorde',
		// 		[
		// 			new Track(1, 'Tennis Court', 198907),
		// 			new Track(2, '400 Lux', 234286)
		// 		],
		// 		[
		// 			0,
		// 			199,
		// 			434
		// 		]
		// 	),
		// 	new Album(
		// 		'185i0n1TQMSppzacSaADTu',
		// 		'https://i.scdn.co/image/abd90b71edefd9ba7919de78eb3ad90172aae323',
		// 		'Alix',
		// 		'Generationals',
		// 		[
		// 			new Track(1, 'Black Lemon', 234413),
		// 			new Track(2, 'Gold Silver Diamond', 204813)
		// 		],
		// 		[
		// 			0,
		// 			235,
		// 			440
		// 		]
		// 	)
		// ]
		// bg.albums = albums;
		// this.setState({albums: albums});
	},

	select: function(index) {
		console.log("in select");
		if (tabId !== bg.tabId) {
			bg.tabId = tabId;
			chrome.tabs.executeScript({
				code: contentScript
			});
		}
		bg.setAlbum(this.state.albums[index]);
		this.setState({album: bg.album});
	},

	render: function() {

		var selected;
		var album = this.state.album;
		if (album) {
			selected = <Selected 
				imageURL={album.imageURL}
				name={album.name}
				artist={album.artist}
				tracks={album.tracks}
			/>
		}

		var self = this;
		var results = this.state.albums.map(function(album, i) {
			return (
				<Result
					key={i}
					index={i}
					imageURL={album.imageURL}
					name={album.name}
					artist={album.artist}
					select={self.select}
				/>
			);
		});

		return (
			<div>
				{selected}
				<Search query={this.query} />
				{results}
			</div>
		);

	}
});