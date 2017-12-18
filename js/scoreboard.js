window.Scoreboard = (function () {
	const scoreboardPoints = {
		[SIDE.AKA]: $('#scoreboard-aka-pt'),
		[SIDE.AO]: $('#scoreboard-ao-pt')
	};
	const scoreboardPenalties = {
		[SIDE.AKA]: {
			1: $('#scoreboard-aka-c1'),
			2: $('#scoreboard-aka-c2'),
		},
		[SIDE.AO]: {
			1: $('#scoreboard-ao-c1'),
			2: $('#scoreboard-ao-c2'),
		},
	};
	let scoringEvents = new Util.PriorityQueue((evt1, evt2) => {
		return (evt1.videoTimestamp < evt2.videoTimestamp);
	});

	function updateScoreboard(timestamp) {
		let scores = {
			[SIDE.AKA]: 0,
			[SIDE.AO]: 0
		};
		let penalties = {
			[SIDE.AKA]: {
				1: 0,
				2: 0
			},
			[SIDE.AO]: {
				1: 0,
				2: 0
			},
		};
		// TODO: make this not O(n) performance
		for (let i = 0; i < scoringEvents.length(); i++) {
			const evt = scoringEvents.at(i);
			if (evt.videoTimestamp > timestamp) {
				break;
			}
			if (evt.type == Event.TYPE.POINT) {
				scores[evt.side] += evt.points;
			} else if (evt.type == Event.TYPE.PENALTY) {
				penalties[evt.side][evt.category] = evt.level;
			}
		}
		scoreboardPoints[SIDE.AKA].html(scores[SIDE.AKA]);
		scoreboardPoints[SIDE.AO].html(scores[SIDE.AO]);
		scoreboardPenalties[SIDE.AKA][1].html(penalties[SIDE.AKA][1]);
		scoreboardPenalties[SIDE.AKA][2].html(penalties[SIDE.AKA][2]);
		scoreboardPenalties[SIDE.AO][1].html(penalties[SIDE.AO][1]);
		scoreboardPenalties[SIDE.AO][2].html(penalties[SIDE.AO][2]);
	}

	// Incoming events
	PubSub.Subscribe('data.event', (evt) => {
		const newEvent = evt.newEvent;
		if (newEvent.type !== Event.TYPE.POINT && newEvent.type !== Event.TYPE.PENALTY) {
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
