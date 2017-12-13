window.View = (function () {
	PubSub.Subscribe('fileselect.input', () => {
		$('.fileselect').hide();
		$('.workspace').show();
	});
})();
