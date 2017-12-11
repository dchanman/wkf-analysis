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
		this.addEvent = (videoTimestamp, side, comment = '') => {
			this.events.append(new Event(videoTimestamp, side, comment));
			console.log(this.events);
		};
	}
	return {
		Match
	};
})();
