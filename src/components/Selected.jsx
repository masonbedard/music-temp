var React = require('react');

module.exports = React.createClass({
	render: function() {
		var tracks = this.props.tracks.map(function(track, i) {
			return (
				<div key={i}>
					<span>{track.number} </span>
					<span>{track.name} </span>
					<span>{track.duration}</span>
				</div>
			);
		});
		return (
			<div>
				<img src={this.props.imageURL} />
				<span>{this.props.name} </span>
				<span>{this.props.artist}</span>
				{tracks}
			</div>
		);
	}
});