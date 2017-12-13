window.Fileselect = (function() {
	'use strict';
	let Publish = {};

	// Redirect the button's click to the input
	$('#fileselect-input-button').on('click', () => {
		$('#fileselect-input').click();
	});

	$('#fileselect-input').on('change', (e) => {
		Publish['fileselect.input'](e.currentTarget.files[0]);
	});

	Publish = {
		'fileselect.input': (file) => {
			PubSub.Publish('fileselect.input', {
				file: file
			});
		}
	};
})();
