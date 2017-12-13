window.Storage = (function () {
	// Load localstorage
	console.log('Starting to load localStorage...');
	let db = {};
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		const val = localStorage.getItem(key);
		try {
			db[key] = JSON.parse(val);
		} catch (err) {
			console.log(val);
			localStorage.removeItem(key);
		}
	}
	console.log('Done loading localStorage');
	console.log(db);

	PubSub.Subscribe('data.event', (evt) => {
		console.log(evt.match);
		const key = evt.match.videoName;
		db[key] = evt.match;
		localStorage.setItem(key, JSON.stringify(db[key]));
	});
})();
