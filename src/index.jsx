var React = require('react');
var ReactDOM = require('react-dom');
var request = require('superagent');
var Extension = require('./components/Extension.jsx');
require('./index.css');

// var bkg = chrome.extension.getBackgroundPage();
// bkg.console.log('testing');


ReactDOM.render(<Extension />, document.getElementById('app'));
