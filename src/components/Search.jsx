var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			artist: '',
			album: ''
		};
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var artist = this.state.artist.trim();
		var album = this.state.album.trim();
		if (!artist || !album) {
			return;
		}
		console.log("request server with " + artist + " " + album);
		this.setState({artist: '', album: ''});
	},
	handleArtistChange: function(e) {
		this.setState({artist: e.target.value});
	},
	handleAlbumChange: function(e) {
		this.setState({album: e.target.value});
	},
	render: function() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type='text' placeholder='artist' value={this.state.artist} onChange={this.handleArtistChange}/><br />
				<input type='text' placeholder='album' value={this.state.album} onChange={this.handleAlbumChange}/><br />
				<input type='submit' value='Search' />
			</form>
		);
	}
});
