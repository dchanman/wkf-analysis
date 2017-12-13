window.Data = (function () {
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
	}
	let gMatch = null;

	// TODO: move this elsewhere
	function matchEventListUpdate(newEvent) {
		let eventListItem = $(
			'<li class="mdc-list-item">' +
					'<i class="material-icons">error</i>' +
					'<span>' + 'Event' + '</span>' +
					'<span>' + newEvent.videoTimestamp + '</span>' +
				'</span>' +
			'</li>'
		);
		eventListItem.on('click', () => {
			Videoplayer.Seek(newEvent.videoTimestamp);
		});
		$('#controls-events-list').append(eventListItem);
	}

	// Incoming events
	PubSub.Subscribe('fileselect.input', (evt) => {
		gMatch = new Match(evt.file.name);
	});
	PubSub.Subscribe('controls.addevent', (evt) => {
		const timestamp = evt.timestamp;
		const side = SIDE.AKA;
		const comment = 'this is a comment';
		let e = new Event(timestamp, side, comment);
		gMatch.events.push(e);
		matchEventListUpdate(e);
		console.log(gMatch);
	});
	return {
		Match,
		SIDE
	};
})();
