document.onkeydown = ($event) => {
  chrome.runtime.sendMessage({ action: 'keyPress', key: $event.key }, function (response) {
  });
}

document.onmousemove = ($event) => {
  chrome.runtime.sendMessage({ action: 'mouseMovement', movementX: $event.movementX, movementY: $event.movementY }, function (response) {
  });
}

document.onclick = ($event) => {
  chrome.runtime.sendMessage({ action: 'click' }, function (response) {
  });
}

// Checking if the extension is asked to connect to server when the user is in
// google meet page
chrome.runtime.onMessage.addListener((request, sender, respond) => {
  const handler = new Promise((resolve, reject) => {
    if (request === 'get-url') {
      resolve(`${window.location.href}`);
    } else {
      reject('request is empty.');
    }
  });
  handler.then(message => respond(message)).catch(error => respond(error));
  return true;
});