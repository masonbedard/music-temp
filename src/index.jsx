var React = require('react');
var ReactDOM = require('react-dom');
var request = require('superagent');
var Container = require('./components/Container.jsx');
require('./index.css');

request.get('/search').query({query: 'lolfunny'}).end(function(err, res) {
	console.log(res);
});

ReactDOM.render(<Container />, document.getElementById('app'));
