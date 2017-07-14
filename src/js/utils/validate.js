

export function validateName(name) {
	return !!name.length;
}


export function validateUrl(url) {
	return /^https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(url);
}