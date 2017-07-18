'use strict';

// const form = (function() {
// 	// Set state of invalid
// 	// For each text input,
// 	// - valid when any content
// 	// - if valid/invalid, update state
// 	// For each email input
// 	// - valid when email (regex in current keycloak)
// 	// - update state
// 	// For password
// 	// - valid with regex from current keycload
// 	// - update state

// 	function validateForm(inputContainers, form) {
// 		// check if all are valid

// 	}

// 	function initForm(form) {
// 		let formValid = false;
// 		const formInputContainers = form.querySelectorAll('label');
// 		const formInputs = form.querySelectorAll('input');

// 		formInputs.addEventListener('keyup', (e) => {
// 			// validate form
// 			validateForm(formInputContainers, form);
// 		});
// 	}

// 	function init() {
// 		const forms = document.querySelectorAll('form');
// 		forms.forEach((form) => {
// 			initForm(form);
// 		})
// 	}
// })();


var inputs = function () {

	// TODO:
	// - Validation
	//   - Inline validation and feedback
	//   - Disable submit until all valid content
	// - Display server responses

	function setValidState(labelEl, isValid, e) {
		if (labelEl.classList.contains('has-content')) {
			labelEl.classList.toggle('valid', isValid);

			if (e.target.classList.contains('touched')) {
				labelEl.classList.toggle('error', !isValid);
			}
		} else {
			labelEl.classList.remove('valid', 'error');
		}
	}

	function validateText(e) {
		var validTextRegex = /^[a-z ,.'-]+$/i;
		setValidState(e.target.parentElement, validTextRegex.test(e.target.value), e);
	}

	function validateEmail(e) {
		var validEmailRegex = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
		setValidState(e.target.parentElement, validEmailRegex.test(e.target.value), e);
	}

	function validatePassword(e) {
		setValidState(e.target.parentElement, e.target.value.length >= 8, e);
	}

	function getValidator(type) {
		switch (type) {
			case 'email':
				return validateEmail;
			case 'password':
				return validatePassword;
			default:
				return validateText;
		}
	}

	function watchBlur(e) {
		// Add 'touched' class to input
		e.target.classList.add('touched');
		e.target.removeEventListener('blur', watchBlur);
	}

	// watch for content to keep placeholder elevated
	function watchForContent(inputContainer) {
		var inputLabel = inputContainer.querySelector('.label-copy');
		var inputField = inputContainer.querySelector('input');
		var inputType = inputField.attributes.type.value;
		var inputValidator = getValidator(inputType);

		// Keyup events
		inputField.addEventListener('keyup', function (e) {

			// Material-design input effect
			inputContainer.classList.toggle('has-content', !!e.target.value);

			// Validate input
			inputValidator(e);
		});

		// Watch for first blue event to start validating
		inputField.addEventListener('blur', watchBlur);
	}

	function init() {
		var inputContainers = document.querySelectorAll('label');

		inputContainers.forEach(function (inputContainer) {
			watchForContent(inputContainer);
		});
	}

	return {
		init: init
	};
}();

var tabs = function () {
	var mainEl = document.querySelector('main');
	var signInTab = document.querySelector('.tab-sign-in');
	var signUpTab = document.querySelector('.tab-sign-up');

	function bindEvents() {
		signInTab.addEventListener('click', function (e) {
			mainEl.classList.add('sign-in');
			mainEl.classList.remove('sign-up');
		});
		signUpTab.addEventListener('click', function (e) {
			mainEl.classList.add('sign-up');
			mainEl.classList.remove('sign-in');
		});
	}

	function init() {
		bindEvents();
	}

	return {
		init: init
	};
}();

window.onload = function () {
	inputs.init();
	tabs.init();
};