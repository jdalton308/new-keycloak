

// Forms
//------------------

const Forms = (function() {

	function buildData(form) {
		const rawData = new FormData(form);
		let dataObj = {};

		for (let [key, val] of rawData) {
			dataObj[key] = val;
		}

		return dataObj;
	}

	function submitForm(form) {
		const data = buildData(form);
		// Submit data here...
	}

	function watchSubmit(form) {
		const submitButton = form.querySelector('button.submit');

		form.addEventListener('submit', (e) => {
			e.preventDefault();
			submitForm(e.target);
		});
	}

	function isValid(form) {
		const formFields = form.querySelectorAll('label');

		let isValid = true;
		formFields.forEach((el) => {
			if (!el.classList.contains('valid')) {
				isValid = false;
			}
		});
		return isValid;
	}

	function validate(form) {
		const submitButton = form.querySelector('button.submit');
		
		if (isValid(form)) {
			submitButton.removeAttribute('disabled');
		} else {
			submitButton.setAttribute('disabled', '');
		}
	}

	function init() {
		const forms = document.querySelectorAll('form');

		forms.forEach((form) => {
			Inputs.init(form);
			watchSubmit(form);
		});
	}


	return {
		init: init,
		validate: validate
	};
})();



// Inputs: Validation and Material
//------------------

const Inputs = (function() {

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
		const validTextRegex = /^[a-z ,.'-]+$/i;
		setValidState(e.target.parentElement, validTextRegex.test(e.target.value), e);
	}

	function validateEmail(e) {
	  const validEmailRegex = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	  setValidState(e.target.parentElement, validEmailRegex.test(e.target.value), e);
	}

	function validatePassword(e) {
		setValidState(e.target.parentElement, (e.target.value.length >= 8), e);
	}

	function getValidator(type) {
		switch (type) {
			case 'email' :
				return validateEmail;
			case 'password' :
				return validatePassword;
			default :
				return validateText;
		}
	}

	function watchBlur(e, validator) {
		e.target.classList.add('touched');
		validator(e);
		e.target.removeEventListener('blur', watchBlur); // do once
	}


	function bindEvents(inputContainer, form) {
		const inputLabel = inputContainer.querySelector('.label-copy');
		const inputField = inputContainer.querySelector('input');
		const inputValidator = getValidator(inputField.attributes.type.value);

		// Keyup events
		inputField.addEventListener('keyup', (e) => {
			inputContainer.classList.toggle('has-content', !!e.target.value);
			inputValidator(e);
			Forms.validate(form);
		});

		// Watch for first blur event to start validating
		inputField.addEventListener('blur', (e) => watchBlur(e, inputValidator) );
	}


	function init(form) {
		const inputContainers = form.querySelectorAll('label');

		inputContainers.forEach((inputContainer) => {
			bindEvents(inputContainer, form);
		});
	}


	return {
		init: init
	};
})();



// Tabs toggle
//------------------

const Tabs = (function() {
	const mainEl = document.querySelector('main');
	const signInTab = document.querySelector('.tab-sign-in');
	const signUpTab = document.querySelector('.tab-sign-up');
	const bodyEl = document.querySelector('body');

	function setTab(name) {
		mainEl.className = name;
	}

	function checkHash(isInitialLoad = false) {
		const hash = window.location.hash;

		if ((hash === '#sign-in') || (hash === '#sign-up')) {
			if (isInitialLoad) {
				bodyEl.classList.add('no-animate');
			}
			bodyEl.classList.add('show-form');
			setTab(hash.substring(1));
		}
	}

	function bindEvents() {
		signInTab.addEventListener('click', (e) => {
			window.location.hash = 'sign-in';
		});
		signUpTab.addEventListener('click', (e) => {
			window.location.hash = 'sign-up';
		});

		// Hashchang event is used to change tabs
		window.addEventListener('hashchange', (e) => {
			checkHash();
		});
	}

	function init() {
		checkHash(true);
		bindEvents();
	}

	return {
		init: init
	};
})();



// Gracefully show content
//------------------

const Content = (function(){
	
	function show() {
		const contentEl = document.querySelector('.content-wrapper');
		contentEl.classList.add('show');
	}

	return {
		show: show
	};
})();




// Do it
//----------------

window.onload = () => {
	Forms.init();
	Tabs.init();
	Content.show();
}