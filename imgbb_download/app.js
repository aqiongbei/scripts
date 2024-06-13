const fs = require('fs');
const request = require('request');
const albums = require('./album_urls.json');
// var albums = [];
var index = 0;
var userid = 'beautif11';
// https://beautif11.imgbb.com/
// https://chiang.imgbb.com/albums

function getAlbumToken() {
    var albumid = albums[index];
    console.log(`get album ${albumid}`);
    request(`https://ibb.co/album/${albumid}/embeds`, (error, response, body) => {
        // console.log(body)
        var token = body.match(/(?<=auth_token=")[^"]*(?=")/)[0];
        console.log(token);
        getContentsJson(token, albumid);
    })
}

function getContentsJson(token, albumid) {
    request.post('https://ibb.co/json', {
        form: {
            auth_token: token,
            pathname: `/album/${albumid}/embeds`,
            action: 'get-album-contents',
            albumid: albumid
        }
    }, (err, httpResponse, body) => {
        var imgs = [];
        console.log(body);
        var bodyOjb = JSON.parse(body);
        bodyOjb.contents.map(item => {
            imgs.push(item.url)
        });
        fs.writeFileSync(`./albums/${albumid}.txt`, JSON.stringify(imgs));
        index++;
        if (index < albums.length) {
            getAlbumToken();
        } else {
            console.log('finish!')
        }
    })
}
getAlbumToken();
/**
var albumNum = 3;
var album_index = 1;
function getAlbumsJson(token) {
    console.log(`get album page: ${album_index}, ${albums[albums.length - 1]}`)
    request.post({
        url: `https://${userid}.imgbb.com/json`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
        },
        form: {
            action: 'list',
            list: 'albums',
            page: album_index,
            seek: albums[albums.length - 1] || '',
            auth_token: token,
            pathname: '/albums'
        }
    }, (err, httpResponse, body) => {
        if (err) {
            console.log(err);
            setTimeout(function () {
                getAlbumsJson(token)
            }, 3000)
        } else {
            // console.log(body);
            var bodyOjb = JSON.parse(body);
            var page = bodyOjb.html.match(/(?<=href="https:\/\/ibb.co\/album\/)[^"]*(?=" class="image-container)/gi);
            console.log(page);
            if (page) {
                albums = albums.concat(...page);
                album_index++;
            }
            if (album_index <= albumNum) {
                getAlbumsJson(token);
            } else {
                console.log('finish!')
            }
        }
    })
}

function getToken() {
    request({
        url: `https://${userid}.imgbb.com/albums`,
        headers: {
            "Referer": "https://ibb.co/album/WWP5mF?page=5&seek=hRZJj2C",
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
        }
    }, (error, response, body) => {
        if (error) {
            console.log(error)
            setTimeout(() => {
                getToken();
            }, 3000)
        } else {
            var token = body.match(/(?<=auth_token=")[^"]*(?=")/)[0];
            console.log(token);
            getAlbumsJson(token);
        }
    })
}
getToken();
*/