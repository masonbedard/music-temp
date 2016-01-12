var React = require('react');
var ReactDOM = require('react-dom');
var Search = require('./components/Search.jsx');
require('./index.css');

var Index = React.createClass({
	render: function() {
		return (
			<Search name='World' />
		);
	}
});

ReactDOM.render(<Index />, document.getElementById('app'));
