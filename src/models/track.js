module.exports = function(number, name, ms) {
	this.number = number;
	this.name = name;
	this.ms = ms;
	var s = ms / 1000
	this.duration = '' + ((s / 60) << 0) + ':' + ('0' + ((s % 60) << 0)).slice(-2);
};