window.SIDE = {
	AKA: 'aka',
	AO: 'ao'
};

window.Event = (function () {
	const TYPE = {
		UNKNOWN: '',
		POINT: 'point',
		PENALTY: 'penalty'
	};
	let gEventId = 0;
	function Factory() {
		this.data = {
			videoTimestamp: undefined,
			type: TYPE.UNKNOWN,
			side: undefined,
			points: undefined
		};
	}
	Factory.prototype.getEvent = function () {
		this.data.id = gEventId++;
		return Object.assign({}, this.data);
	};
	Factory.prototype.setVideoTimestamp = function (videoTimestamp) {
		this.data.videoTimestamp = videoTimestamp;
		return this;
	};
	Factory.prototype.setSide = function (side) {
		this.data.side = side;
		return this;
	};
	Factory.prototype.setPoints = function (points) {
		if (this.data.type !== TYPE.UNKNOWN) {
			throw 'data type is already set to ' + this.data.type;
		}
		this.data.type = TYPE.POINT;
		this.data.points = points;
		return this;
	};
	Factory.prototype.setPenalty = function (category, level) {
		if (this.data.type !== TYPE.UNKNOWN) {
			throw 'data type is already set to ' + this.data.type;
		}
		this.data.type = TYPE.PENALTY;
		this.data.category = category;
		this.data.level = level;
		return this;
	};

	return {
		Factory,
		TYPE
	};
})();

window.Util = (function () {
	/**
	 * lessThanFunction must implement this:
	 * (obj1, obj2) => {
	 *   return (obj1 < obj2)
	 * }
	 */
	function PriorityQueue(lessThanFunction) {
		this.lessThanFunction = lessThanFunction;
		this.elements = [];
	}
	PriorityQueue.prototype.empty = function () {
		return (this.elements.length <= 0);
	};
	PriorityQueue.prototype.insert = function (o) {
		// TODO: make this not O(n) insertion
		for (let i = 0; i < this.elements.length; i++) {
			if (this.lessThanFunction(o, this.elements[i])) {
				this.elements.splice(i, 0, o);
				return;
			}
		}
		this.elements.push(o);
	};
	PriorityQueue.prototype.at = function (index) {
		if (index < 0 || index >= this.elements.length) {
			throw 'priority queue invalid index: ' + index;
		}
		return this.elements[index];
	};
	PriorityQueue.prototype.length = function () {
		return this.elements.length;
	};

	return {
		PriorityQueue
	};
})();

Number.prototype.toMMSSTimestamp = function () {
	const sec_num = parseInt(this, 10);
	const min = Math.floor(sec_num / 60);
	const sec = sec_num - (min * 60);
	const sec_str = ('' + sec).padStart(2, '0');
	return min + ':' + sec_str;
};
