import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const appContainer = document.createElement('div');
const bodyContainer = document.createElement('div');
bodyContainer.style.width = "100%";
while (document.body.children.length)
    bodyContainer.appendChild(document.body.children[0]);
document.body.appendChild(bodyContainer)
document.body.appendChild(appContainer)
if (!appContainer) {
    throw new Error("Can not find AppContainer");
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
const root = ReactDOM.createRoot(appContainer);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);