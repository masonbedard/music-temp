module.exports = '' + 
'var video = document.getElementsByTagName("video")[0];' +
'video.addEventListener("playing", function(e) {' + 
	'console.log(e.target.currentTime);' + 
	'chrome.runtime.sendMessage("dpfmnmbehadhnpckfmllopjjogokdlom", {' +
		'event: "playing",' +
		'currentTime: e.target.currentTime' +
	'});' +
'});' +
'video.addEventListener("pause", function(e) {' +
	'console.log("paused");' +
	'chrome.runtime.sendMessage("dpfmnmbehadhnpckfmllopjjogokdlom", {' +
		'event: "pause"' +
	'});' +
'});' +
'if (!video.paused) {' +
	'chrome.runtime.sendMessage("dpfmnmbehadhnpckfmllopjjogokdlom", {' +
		'event: "playing",' +
		'currentTime: video.currentTime' +
	'});' +
'}'
