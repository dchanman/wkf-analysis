window.Scoreboard = (function () {
	const scoreboardPoints = {
		[SIDE.AKA]: $('#scoreboard-aka-pt'),
		[SIDE.AO]: $('#scoreboard-ao-pt')
	};
	let scoringEvents = new Util.PriorityQueue((evt1, evt2) => {
		return (evt1.videoTimestamp < evt2.videoTimestamp);
	});

	function updateScoreboard(timestamp) {
		// TODO: make this not O(n) performance
		let scores = {
			[SIDE.AKA]: 0,
			[SIDE.AO]: 0
		};
		for (let i = 0; i < scoringEvents.length(); i++) {
			const evt = scoringEvents.at(i);
			if (evt.videoTimestamp > timestamp) {
				break;
			}
			scores[evt.side] += evt.points;
		}
		scoreboardPoints[SIDE.AKA].html(scores[SIDE.AKA]);
		scoreboardPoints[SIDE.AO].html(scores[SIDE.AO]);
	}

	// Incoming events
	PubSub.Subscribe('data.event', (evt) => {
		const newEvent = evt.newEvent;
		if (newEvent.videoTimestamp === undefined || newEvent.points === undefined) {
			return;
		}
		scoringEvents.insert(newEvent);
		console.log(scoringEvents);
		updateScoreboard(newEvent.videoTimestamp);
	});
	PubSub.Subscribe('videoplayer.timeupdate', (evt) => {
		updateScoreboard(evt.timestamp);
	});

	updateScoreboard();
})();
