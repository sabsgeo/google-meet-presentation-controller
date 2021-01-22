let isServerConnected = false;
let socket = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'keyPress') {
    console.log(request.action, request.key)
    sendResponse({ status: 'success' })
  } else if (request.action === 'mouseMovement') {
    console.log(request.action, request.movementX, request.movementY)
    sendResponse({ status: 'success' })
  } else if (request.action === 'click') {
    console.log(request.action)
    sendResponse({ status: 'success' })
  } else if (request.action === 'connectToServer') {
    // On connection with the server init all the socket connection elements

    const handle = new Promise((resolve, reject) => {
      socket = new WebSocket('ws://localhost:3000');
      socket.addEventListener('open', (event) => {
        resolve({ status: 'success' });
      })
    });
  
    handle.then((res) => {
      isServerConnected = true;
      onServerConnectionSuccess(socket, sendResponse);
      sendResponse(res);
    }).catch(() => {
      isServerConnected = false;
      sendResponse({ status: 'error' });
    });

  } else if (request.action === 'disconnectFromServer') {
    // Closing the socket connection on disconnecting from the server
    if (socket) {
      socket.close();
    }
    isServerConnected = false;
    sendResponse({ status: 'success' })

  } else if (request.action === 'isConnectedToServer') {
    // Sending the status of the socket connection
    sendResponse({ status: isServerConnected })

  } else {
    console.log('Not an event that I would like to take');
    sendResponse({ status: 'error' })
  }
  return true
});

/**
 * On connection with the server init all the events 
 * that are required
 * @param newSocket 
 * @param sendResponse 
 */
const onServerConnectionSuccess = (newSocket, sendResponse) => {
  newSocket.addEventListener('close', (event) => {
    isServerConnected = false;
    if (sendResponse) sendResponse({ status: 'error' })
  });

  newSocket.addEventListener('error', (event) => {
    isServerConnected = false;
    if (sendResponse) sendResponse({ status: 'error' })
  });

  newSocket.addEventListener('message', (event) => {
    // Getting message from server
  });
}
