window.SIDE = {
	AKA: 'aka',
	AO: 'ao'
};

window.Event = (function () {
	function Factory() {
		this.data = {
			videoTimestamp: undefined,
			side: undefined,
			points: undefined
		};
	}
	Factory.prototype.getEvent = function () {
		return  Object.assign({}, this.data);
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
		this.data.points = points;
		return this;
	};

	return {
		Factory
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
