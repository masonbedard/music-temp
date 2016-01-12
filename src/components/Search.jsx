var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		console.log('getting initial state');
		return {
			album: 'album',
			artist: 'artist'
		};
	},
	toString: function() {
		console.log("to string");
		console.log(this.state.album)
		console.log(this.state.artist)
		return 'album: ' + this.state.album + ' artist: ' + this.state.artist;
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var artist = this.state.artist.trim();
		var album = this.state.album.trim();
		// if (!artist || !album) {
		// 	return;
		// }
		console.log("request server with " + artist + " " + album);
		this.setState({artist: '', album: ''});
	},
	handleChange: function(e) {
		console.log("handling chnage");
	},
	handleArtistChange: function(e) {
		this.setState({artist: e.target.value});
	},
	handleAlbumChange: function(e) {
		this.setState({album: e.target.value});
	},
	render: function() {
		// return (
		// 	<form onSubmit={this.handleSubmit}>
		// 		<input type='text' placeholder='artist' value={this.state.artist} onChange={this.handleArtistChange}/><br />
		// 		<input type='text' placeholder='album' value={this.state.album} onChange={this.handleAlbumChange}/><br />
		// 		<input type='submit' value='Search' />
		// 	</form>
		// );
		console.log('hello');
		console.log(this.state);
		return (
			<form onSubmit={this.handleSubmit}>
				<input type='text' value={this.toString()} onChange={this.handleChange}/>
			</form>
		);
	}
});
