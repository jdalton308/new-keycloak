'use strict';

var inputs = function () {

	function watchForContent(input) {
		// watch for content to keep placeholder elevated
		var inputField = input.querySelector('input');
		var inputLabel = input.querySelector('.label-copy');

		inputField.addEventListener('keyup', function (e) {
			input.classList.toggle('has-content', !!e.target.value);
		});
	}

	function init() {
		var inputContainers = document.querySelectorAll('label');

		inputContainers.forEach(function (input) {
			watchForContent(input);
		});
	}

	return {
		init: init
	};
}();

window.onload = function () {
	inputs.init();
};