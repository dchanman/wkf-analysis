window.Fileselect = (function() {
	'use strict';
	let Publish = {};

	// Redirect the button's click to the input
	$('#fileselect-input-button').on('click', () => {
		$('#fileselect-input').click();
	});

	$('#fileselect-input').on('change', (e) => {
		Publish['fileselect.input'](URL.createObjectURL(e.currentTarget.files[0]));
	});

	Publish = {
		'fileselect.input': (fileurl) => {
			PubSub.Publish('fileselect.input', {
				fileurl: fileurl
			});
		}
	};
})();
