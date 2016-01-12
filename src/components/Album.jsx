var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
			<div>
				<img src="http://i-cdn.phonearena.com/images/article/73875-image/How-to-downgrade-your-iPhone-or-iPad-from-iOS-9-to-iOS-8.4.1.jpg" />
				<span>{this.props.name} </span>
				<span>Artist</span>
			</div>
		);
	}
});