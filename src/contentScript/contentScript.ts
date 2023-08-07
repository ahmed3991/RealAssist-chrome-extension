chrome.runtime.sendMessage('I am loading content script', (response) => {
    console.log(response);
    console.log('I am content script')

})

window.onload = (event) => {
    if (window.location.origin == 'https://real-assist-ai.vercel.app') {
        const url = chrome.runtime.getURL('injected.json');

    }

};



chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // Handle the message received from background.js
    console.log("Message received in content-script.js:", message);

    // You can process the message or perform actions based on the received data here.
});


