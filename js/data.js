window.Data = (function () {
	'use strict';
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
					'<i class="mdc-list-item__start-detail material-icons" aria-hidden="true">error</i>' +
					'<span class="mdc-list-item__text">' + newEvent.type + ' : ' + newEvent.side +
						'<span class="mdc-list-item__text__secondary">' + newEvent.videoTimestamp.toMMSSTimestamp() + '</span>' +
					'</span>' +
			'</li>'
		);
		eventListItem.on('click', () => {
			Videoplayer.Seek(newEvent.videoTimestamp);
		});
		$('#controls-events-list').append(eventListItem);
	}

	const Publish = {
		'data.event': (evt, match) => {
			PubSub.Publish('data.event', {
				newEvent: evt,
				match: match
			});
		}
	};

	// Incoming events
	PubSub.Subscribe('fileselect.input', (evt) => {
		gMatch = new Match(evt.file.name);
	});
	PubSub.Subscribe('controls.addevent', (evt) => {
		gMatch.events.push(evt);
		matchEventListUpdate(evt);
		Publish['data.event'](evt, gMatch);
	});
	return {
		Match,
		SIDE
	};
})();
