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

	// Internal events
	$('#controls-play').on('click', Videoplayer.Toggle);
	$('#controls-add-event').on('click', addEvent);
	$('.controls-buttons-point').on('click', function (evt) {
		let eventFactory = new Event.Factory()
			.setVideoTimestamp(Videoplayer.GetTime())
			.setSide($(evt.target).data('side'))
			.setPoints($(evt.target).data('points'));
		Publish['controls.addevent'](eventFactory.getEvent());
	});
	$('.controls-buttons-penalty').on('click', function (evt) {
		let eventFactory = new Event.Factory()
			.setVideoTimestamp(Videoplayer.GetTime())
			.setSide($(evt.target).data('side'))
			.setPenalty($(evt.target).data('category'), $(evt.target).data('level'));
		Publish['controls.addevent'](eventFactory.getEvent());
	});
	
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
