'use strict';

var Forms = function () {

	function isValid(form) {
		var formFields = form.querySelectorAll('label');

		var isValid = true;
		formFields.forEach(function (el) {
			if (!el.classList.contains('valid')) {
				isValid = false;
			}
		});
		return isValid;
	}

	function validate(form) {
		var submitButton = form.querySelector('button.submit');
		if (isValid(form)) {
			submitButton.removeAttribute('disabled');
		} else {
			submitButton.setAttribute('disabled', '');
		}
	}

	function init() {
		var forms = document.querySelectorAll('form');

		forms.forEach(function (form) {
			Inputs.init(form);
		});
	}

	return {
		init: init,
		validate: validate
	};
}();

var Inputs = function () {

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
		e.target.classList.add('touched');
		e.target.removeEventListener('blur', watchBlur); // do once
	}

	function bindEvents(inputContainer, form) {
		var inputLabel = inputContainer.querySelector('.label-copy');
		var inputField = inputContainer.querySelector('input');
		var inputValidator = getValidator(inputField.attributes.type.value);

		// Keyup events
		inputField.addEventListener('keyup', function (e) {
			inputContainer.classList.toggle('has-content', !!e.target.value);
			inputValidator(e);
			Forms.validate(form);
		});

		// Watch for first blur event to start validating
		inputField.addEventListener('blur', watchBlur);
	}

	function init(form) {
		var inputContainers = form.querySelectorAll('label');

		inputContainers.forEach(function (inputContainer) {
			bindEvents(inputContainer, form);
		});
	}

	return {
		init: init
	};
}();

var Tabs = function () {
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
	Forms.init();
	Tabs.init();
};