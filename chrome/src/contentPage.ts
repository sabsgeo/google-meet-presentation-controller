document.onkeydown = ($event) => {
  chrome.runtime.sendMessage({type: 'keyPress', key: $event.key}, function(response) {
  });
}

document.onmousemove = ($event) => {
  chrome.runtime.sendMessage({type: 'mouseMovement', movementX: $event.movementX, movementY: $event.movementY}, function(response) {
  });
}

document.onclick = ($event) => {
  chrome.runtime.sendMessage({type: 'click'}, function(response) {
  }); 
}