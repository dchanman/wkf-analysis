window.Karate = (function () {
	'use strict';
	const SIDE = {
		AKA: 'aka',
		AO: 'ao'
	};
	function Event(videoTimestamp, side, comment = '') {
		this.videoTimestamp = videoTimestamp;
		this.side = side;
		this.comment = comment;
	}
	function Match(videoName) {
		this.videoName = videoName;
		this.videoLength = 0;
		this.fighters = {};
		this.fighters[SIDE.AKA] = '';
		this.fighters[SIDE.AO] = '';
		this.events = [];
		this.eventCallbacks = [];
	}
	Match.prototype.addEvent = function (videoTimestamp, side, comment = '') {
		let e = new Event(videoTimestamp, side, comment);
		this.events.push(e);
		for (let i = 0; i < this.eventCallbacks.length; i++) {
			this.eventCallbacks[i](e, this.events);
		}
	};
	Match.prototype.addMatchEventCallback = function (callback) {
		this.eventCallbacks.push(callback);
	};
	return {
		Match,
		SIDE
	};
})();
