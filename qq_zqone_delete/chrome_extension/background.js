console.log('load background.js');
// 获取当前选项卡ID
function getCurrentTabId(callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if(callback) callback(tabs.length ? tabs[0].id: null);
    });
}

function sendMessageToContentScript(message, callback) {
    getCurrentTabId((tabId) => {
        chrome.tabs.sendMessage(tabId, message, function(response) {
            console.log('background.js recive response:', response)
        });
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('background.js recive:', request)
    sendResponse('bg 收到了')
})

function sayHi (v) {
    sendMessageToContentScript('你好，我是bg！');
}