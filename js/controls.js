window.Controls = (function () {
	'use strict';
	let Publish = {};
	let progressbarDrag = false;

	function addEvent() {
		let eventFactory = new Event.Factory()
			.setVideoTimestamp(Videoplayer.GetTime());
		Publish['controls.addevent'](eventFactory.getEvent());
	}

	function handleMouseEvent(evt) {
		const progressbar = $('.controls-progressbar-progressbar');
		const position = evt.pageX - progressbar.offset().left;
		let percentage = position / progressbar.width() * 100;
		percentage = percentage > 100 ? 100 : percentage;
		percentage = percentage < 0 ? 0 : percentage;
		Videoplayer.SeekPercent(percentage);
	}

	function score(side, points) {
		return function () {
			let eventFactory = new Event.Factory()
				.setVideoTimestamp(Videoplayer.GetTime())
				.setSide(side)
				.setPoints(points);
			Publish['controls.addevent'](eventFactory.getEvent());
		};
	}

	// Internal events
	$('#controls-play').on('click', Videoplayer.Toggle);
	$('#controls-add-event').on('click', addEvent);
	$('#controls-aka-pt1').on('click', score(SIDE.AKA, 1));
	$('#controls-aka-pt2').on('click', score(SIDE.AKA, 2));
	$('#controls-aka-pt3').on('click', score(SIDE.AKA, 3));
	$('#controls-ao-pt1').on('click', score(SIDE.AO, 1));
	$('#controls-ao-pt2').on('click', score(SIDE.AO, 2));
	$('#controls-ao-pt3').on('click', score(SIDE.AO, 3));
	$('.controls-progressbar-progressbar').on('mousedown', (evt) => {
		console.log('mousedown');
		progressbarDrag = true;
		handleMouseEvent(evt);
	});
	$(document).on('mouseup', (evt) => {
		if (progressbarDrag) {
			progressbarDrag = false;
			handleMouseEvent(evt);
		}
	});
	$(document).on('mousemove', (evt) => {
		if (progressbarDrag) {
			handleMouseEvent(evt);
		}
	});

	// Outgoing events
	Publish = {
		'controls.addevent': (evt) => {
			PubSub.Publish('controls.addevent', evt);
		},
	};

	// Incoming events
	PubSub.Subscribe('videoplayer.statechange', (evt) => {
		if (evt.state === 'play') {
			$('#controls-play-icon').html('pause');
		} else if (evt.state === 'pause') {
			$('#controls-play-icon').html('play_arrow');
		}
	});
	PubSub.Subscribe('videoplayer.timeupdate', (evt) => {
		$('.controls-progressbar-progressbar-timebar').css('width', evt.percentage + '%');
	});
})();
