var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			searchQuery: 'album: album artist: artist'
		};
	},
	handleSubmit: function(e) {
		e.preventDefault();
		this.setState({searchQuery: 'album: album artist: artist'});
	},
	handleChange: function(e) {
		this.setState({searchQuery: e.target.value});
	},
	render: function() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type='text' name='search' value={this.state.searchQuery} onChange={this.handleChange}/>
			</form>
		);
	}
});
