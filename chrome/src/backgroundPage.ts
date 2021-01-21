chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	let errorStatus = false;
	if (request.type === 'keyPress') {
		console.log(request.type, request.key)
	} else if (request.type === 'mouseMovement') {
		console.log(request.type, request.movementX, request.movementY)
	} else if (request.type === 'click') {
		console.log(request.type)
	} else {
		errorStatus = true;
		console.log('Not an event that I would like to take');
	}
	!errorStatus?sendResponse({status: 'success'}):sendResponse({status: 'success'});
});