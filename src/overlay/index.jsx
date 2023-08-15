import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const appContainer = document.createElement('div');
appContainer.id = "real_assist_ai";
const bodyContainer = document.createElement('div');
bodyContainer.style.width = "100%";
let i = 0;
while (document.body.children.length) {
    if (i >= document.body.children.length) {
        break;
    }
    if (document.body.children[i].tagName.toUpperCase() == "SCRIPT" || document.body.children[i].tagName.toUpperCase() == "LINK") {
        i++;
    } else {
        bodyContainer.appendChild(document.body.children[i]);
    }
}
const dir = document.documentElement.dir || document.body.dir;
if (dir == "rtl") {
    appContainer.dir = "ltr";
    document.body.prepend(appContainer, bodyContainer);
} else {
    document.body.prepend(bodyContainer, appContainer);
}
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