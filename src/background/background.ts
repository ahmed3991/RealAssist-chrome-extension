// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//     console.log(msg);
//     console.log(sender);
//     sendResponse("Front the background Script");
// })


// const CRM_ORIGIN = 'https://showingguide.followupboss.com';

const CRM_ORIGIN = 'https://www.google.com';


chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
    console.log(tab.url)
    if (!tab.url) return;
    const url = new URL(tab.url);
    if (info.status === 'complete' && url.origin === CRM_ORIGIN) {

    }
});