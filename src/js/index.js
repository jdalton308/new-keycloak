
const inputs = (function() {

	function watchForContent(input) {
		// watch for content to keep placeholder elevated
		const inputField = input.querySelector('input');
		const inputLabel = input.querySelector('.label-copy');

		inputField.addEventListener('keyup', (e) => {
			input.classList.toggle('has-content', !!e.target.value);
		});
	}

	function init() {
		const inputContainers = document.querySelectorAll('label');

		inputContainers.forEach((input) => {
			watchForContent(input);
		});
	}

	return {
		init: init
	};
})();



window.onload = () => {
	inputs.init();
}