var React = require('react');
require('./result.css');

module.exports = React.createClass({
	handleClick: function() {
		this.props.select(this.props.index);
	},
	render: function() {
		return (
			<div onClick={this.handleClick}>
				<img src={this.props.imageURL} />
				<span>{this.props.name} </span>
				<span>{this.props.artist}</span>
			</div>
		);
	}
});