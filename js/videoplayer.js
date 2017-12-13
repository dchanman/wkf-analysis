window.Videoplayer = (function () {
	'use strict';

	const videoplayer = $('#videoplayer');
	const videoplayerdom = videoplayer[0];

	function togglePlay() {
		if (videoplayerdom.paused) {
			videoplayerdom.play();
		} else {
			videoplayerdom.pause();
		}
	}
	function timeupdate() {
		const timestamp = videoplayerdom.currentTime;
		const maxtime = videoplayerdom.duration;
		const percentage = timestamp / maxtime * 100;
		Publish['videoplayer.timeupdate'](timestamp, maxtime, percentage);
	}

	// Internal events
	videoplayer.on('timeupdate', timeupdate);
	videoplayer.on('play', () => {
		Publish['videoplayer.statechange']('play');
	});
	videoplayer.on('pause', () => {
		Publish['videoplayer.statechange']('pause');
	});
	videoplayer.on('click', togglePlay);
	$('#controls-play').on('click', togglePlay);

	// Outgoing events
	const Publish = {
		'videoplayer.statechange': (state) => {
			PubSub.Publish('videoplayer.statechange', {
				state: state
			});
		},
		'videoplayer.timeupdate': (timestamp, maxtime, percentage) => {
			PubSub.Publish('videoplayer.timeupdate', {
				timestamp: timestamp,
				maxtime: maxtime,
				percentage: percentage
			});
		}
	};

	// Incoming events
	PubSub.Subscribe('fileselect.input', (evt) => {
		videoplayerdom.src = evt.fileurl;
		Publish['videoplayer.statechange']('play');
	});
	PubSub.Subscribe('controls.play', () => {
		videoplayer.play();
	});
	PubSub.Subscribe('controls.pause', () => {
		videoplayer.pause();
	});
	PubSub.Subscribe('controls.toggle', () => {
		togglePlay();
	});
	PubSub.Subscribe('controls.seekpercent', (evt) => {
		const maxtime = videoplayerdom.duration;
		const newtime = evt.percentage / 100 * maxtime;
		videoplayerdom.currentTime = newtime;
		timeupdate();
	});

	return {
		GetTime: () => {
			return videoplayerdom.currentTime;
		},
		Seek: (timestamp) => {
			videoplayerdom.currentTime = timestamp;
		}
	};

})();
