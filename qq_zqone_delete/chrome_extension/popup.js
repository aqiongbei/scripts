console.log('load popup.js')
document.addEventListener('DOMContentLoaded', () => {
    console.log('load over')
    var bg = chrome.extension.getBackgroundPage();
    console.log(bg)
    document.querySelector('#del_talks').onclick = function () {
        console.log('delete talks');
        bg.sayHi('talks')
    }
    document.querySelector('#del_comments').onclick = function () {
        console.log('delete comments')
        bg.sayHi('comments')
    }
});