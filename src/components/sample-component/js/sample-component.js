//Load common code that includes config, then load the app logic for this page.
define(['jquery'], function ($) {

	var bindEvents = function () {
		$('li').addClass('list-item');
	}

	return {
        init: function ($isModuleOnPage) {
            if ($isModuleOnPage.length !== 0) {
                bindEvents();
            }
        }
    };
});