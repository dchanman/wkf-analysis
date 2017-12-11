/* eslint-env browser, jquery */
(function () {
	'use strict';
	function initControls() {
		const videoplayer = $('#videoplayer');
		const videoplayerdom = videoplayer[0];
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
	function initFileselect() {
		function playFile() {
			const file = this.files[0];
			const fileURL = URL.createObjectURL(file);
			$('#videoplayer')[0].src = fileURL;
			$('#fileselect-input-label').html(this.files[0].name);
			$('.workspace').show();
		}
		// Redirect the button's click to the input
		$('#fileselect-input-button').on('click', () => {
			$('#fileselect-input').click();
		});
		$('#fileselect-input').on('change', playFile);
	}
	$(document).ready(() => {
		console.log('Ready');
		initControls();
		initFileselect();
	});
})();
