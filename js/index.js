/* eslint-env browser, jquery */
/* global Karate:true */
(function () {
	'use strict';
	let match = null;
	const videoplayer = $('#videoplayer');
	const videoplayerdom = videoplayer[0];
	function initControls() {
		let progressbarDrag = false;
		function togglePlay() {
			if (videoplayerdom.paused) {
				videoplayerdom.play();
			} else {
				videoplayerdom.pause();
			}
		}
		$('#controls-play').on('click', togglePlay);
		videoplayer.on('click', togglePlay);
		videoplayer.on('pause', () => {
			$('#controls-play-icon').html('play_arrow');
		});
		videoplayer.on('play', () => {
			$('#controls-play-icon').html('pause');
		});
		$('#controls-add-event').on('click', () => {
			match.addEvent(videoplayerdom.currentTime, Karate.SIDE.AKA);
		});
		function updateTimebarPosition(percentage) {
			$('.controls-progressbar-progressbar-timebar').css('width', percentage + '%');
		}
		function setVideoplayerPosition(e) {
			const progressbar = $('.controls-progressbar-progressbar');
			const maxTime = videoplayerdom.duration;
			const position = e.pageX - progressbar.offset().left;
			let percentage = position / progressbar.width() * 100;
			percentage = percentage > 100 ? 100 : percentage;
			percentage = percentage < 0 ? 0 : percentage;
			videoplayerdom.currentTime = maxTime * percentage / 100;
			updateTimebarPosition(percentage);
		}
		$('.controls-progressbar-progressbar').on('mousedown', e => {
			progressbarDrag = true;
			setVideoplayerPosition(e);
		});
		$(document).on('mouseup', e => {
			if (progressbarDrag) {
				progressbarDrag = false;
				setVideoplayerPosition(e);
			}
		});
		$(document).on('mousemove', e => {
			if (progressbarDrag) {
				setVideoplayerPosition(e);
			}
		});
		videoplayer.on('timeupdate', () => {
			const currentPosition = videoplayerdom.currentTime;
			const maxTime = videoplayerdom.duration;
			const percentage = currentPosition / maxTime * 100;
			console.log(percentage + '%');
			updateTimebarPosition(percentage);
		});
	}
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
			videoplayerdom.currentTime = newEvent.videoTimestamp;
		});
		$('#controls-events-list').append(eventListItem);
	}
	function initFileselect() {
		// Redirect the button's click to the input
		$('#fileselect-input-button').on('click', () => {
			$('#fileselect-input').click();
		});
		$('#fileselect-input').on('change', (e) => {
			const file = e.currentTarget.files[0];
			const fileURL = URL.createObjectURL(file);
			$('#videoplayer')[0].src = fileURL;
			$('#fileselect-input-label').html(file.name);
			$('.workspace').show();
			match = new Karate.Match(file.name);
			match.addMatchEventCallback(matchEventListUpdate);
		});
	}
	$(document).ready(() => {
		console.log('Ready');
		initControls();
		initFileselect();
	});
})();
