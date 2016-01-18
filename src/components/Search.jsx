var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			query: 'album: album artist: artist'
		};
	},
	handleSubmit: function(e) {
		e.preventDefault();
		this.props.query(this.state.query);
		//this.setState({query: 'album: album artist: artist'});
	},
	handleChange: function(e) {
		this.setState({query: e.target.value});
	},
	render: function() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type='text' name='search' value={this.state.query} onChange={this.handleChange}/>
			</form>
		);
	}
});
