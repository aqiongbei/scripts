console.log('content js loaded');
function opDOM () {
    console.log(document);
    document.body.style.background = 'red';
    document.addEventListener("click", function(){
        sayHi();
    });
}

console.log(chrome)
function sayHi (msg) {
    chrome.runtime.sendMessage('msg')
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log('content.js recive msg:', request, sender);
    opDOM();
    // sendResponse({msg: 'hello from content.js'});
})