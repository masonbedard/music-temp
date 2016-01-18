var React = require('react');
var request = require('superagent');
var Selected = require('./Selected.jsx');
var Search = require('./Search.jsx');
var Result = require('./Result.jsx');
var Album = require('../models/album.js');
var Track = require('../models/track.js');

var url;
var title;

module.exports = React.createClass({
	getInitialState: function() {
		return {
			selectedIndex: -1,
			albums: []
		}
	},
	componentDidMount: function() {

		var self = this;
		chrome.tabs.query({}, function(tabs) {

			if (!tabs || !tabs.length) {
				console.log('error getting tab');
				return;
			}

			var tab;
			for (var i = 0; i < tabs.length; i++) {
				if (tabs[i].active) {
					tab = tabs[i];
					break;
				}
			}
			if (!tab || tab.url.indexOf('youtube') === -1) {
				console.log('error getting youtube tab');
				return;
			}

			var query = tab.title.slice(0, -10);
			console.log('query ' + query);
			self.query(query);

		});

	},
	query: function(query) {

		var self = this;
		console.log('making request');
		request.get('http://localhost:8080/search').query({query: query}).end(function(err, res) {
			if (err) {
				console.log("error");
				return;
			}
			console.log(res.body);
			console.log(res.body.albums);
			self.setState({albums: res.body.albums});
		});
		

		// this.setState({
		// 	albums: [
		// 		new Album(
		// 			'3Ywlsvgu3H6L3q9NHydNR3', 
		// 			'https://i.scdn.co/image/73bbc6a3b2e9ca5cb0bca5ce6d4c0859fbd5b498',
		// 			'Pure Heroine',
		// 			'Lorde',
		// 			[
		// 				new Track(1, 'Tennis Court', 198907),
		// 				new Track(2, '400 Lux', 234286)
		// 			]
		// 		),
		// 		new Album(
		// 			'185i0n1TQMSppzacSaADTu',
		// 			'https://i.scdn.co/image/abd90b71edefd9ba7919de78eb3ad90172aae323',
		// 			'Alix',
		// 			'Generationals',
		// 			[
		// 				new Track(1, 'Black Lemon', 234413),
		// 				new Track(2, 'Gold Silver Diamond', 204813)
		// 			]
		// 		)
		// 	]
		// });
	},
	select: function(index) {
		this.setState({selectedIndex: index});
	},
	render: function() {


		var selected;
		if (this.state.selectedIndex !== -1) {
			var album = this.state.albums[this.state.selectedIndex];
			if (album) {
				selected = <Selected 
					imageURL={album.imageURL}
					name={album.name}
					artist={album.artist}
					tracks={album.tracks}
				/>
			}
		}
		var select = this.select;
		var results = this.state.albums.map(function(album, i) {
			return (
				<Result
					key={i}
					index={i}
					imageURL={album.imageURL}
					name={album.name}
					artist={album.artist}
					select={select}
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