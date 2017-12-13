window.PubSub = (function () {
	'use strict';
	let channels = {};
	function Subscribe(channel, participantCallback) {
		if (!(channel in channels)) {
			channels[channel] = [];
		}
		channels[channel].push(participantCallback);
	}
	function Publish(channel, evt) {
		if (!(channel in channels)) {
			console.log('Warning: channel ' + channel + ' has 0 subscribers');
			return;
		}
		for (let i = 0; i < channels[channel].length; i++) {
			channels[channel][i](evt);
		}
	}
	return {
		Subscribe,
		Publish,
	};
})();
