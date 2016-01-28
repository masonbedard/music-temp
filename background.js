var albums = [];
var album = null;
var url = null;
var eventsAttached = false;
var idToNeedsEvents = {};
var tabId = -1;

var timeout = null;
var lastNotifiedIndex;

// chrome.tabs.onUpdated for refreshing... have to reattach events somehow. can this access the dom?

chrome.tabs.onRemoved.addListener(function(id) {
	if (id === tabId) {
		console.log("removing tab");
		tabId = -1;
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
	}
});

function setAlbum(album) {
	if (timeout) {
		clearTimeout(timeout);
		timeout = null;
	}
	// state.album = album;
}

function notify(delay, index) {
	console.log('in notify');
	if (index === album.tracks.length) {
		return;
	}
	console.log('setting up the timeout for index ' + index);
	timeout = setTimeout(function() {
		timeout = null;
		console.log('finishing a timeout and going to present album at index ' + index);
		chrome.notifications.create({
			type: 'basic',
			title: album.tracks[index].name,
			message: 'temp',
			iconUrl: '/asdf.png'
		});
		lastNotifiedIndex = index;
		console.log('calling notify with ' + (index + 1));
		notify(album.tracks[index].ms, index + 1);
	}, delay);
}

chrome.runtime.onMessage.addListener(function(req) {
	console.log('received an event');
	console.log(req.event);
	if (!album) {
		return;
	}
	if (timeout) {
		console.log('clearing a timeout');
		clearTimeout(timeout); // on pause on close on whatever
		timeout = null;
	}
	if (req.event === "playing") {
		console.log("playing message received");
		var currentTime = req.currentTime << 0;
		var trackStarts = album.trackStarts;
		for (var i = 0; i < trackStarts.length - 1; i++) {
			if (currentTime >= trackStarts[i] && currentTime < trackStarts[i + 1]) {
				if (i !== lastNotifiedIndex) {
					chrome.notifications.create({
						type: 'basic',
						title: album.tracks[i].name,
						message: 'temp',
						iconUrl: '/asdf.png'
					});
					lastNotifiedIndex = i;
				}
				notify((trackStarts[i + 1] - currentTime) * 1000, i + 1);
				break;
			}
		}
	}
});
