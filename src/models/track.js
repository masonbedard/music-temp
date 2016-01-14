module.exports = function(number, name, ms) {
	this.number = number;
	this.name = name;
	this.ms = ms;
	var min = ('0' + ((ms / 1000 / 60) << 0)).slice(-2);
	var sec = ('0' + ((ms / 1000) % 60)).slice(-2);
	this.duration = min + ':' + sec;
};