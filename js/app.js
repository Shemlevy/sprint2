'use strict'
console.log('memegenertor')

//global vars
var gImgs = [{ id: 1, url: 'img/gallery/1.jpg', keywords: ['sad', 'really', 'happy'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'crazy', 'ball'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['ball', 'table', 'green'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['puki', 'muki', 'google'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['10', '5', '$'] },
{ id: 2, url: 'img/gallery/1.jpg', keywords: ['money', 'big', 'small'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['phone', 'tv', 'baby'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['arror', 'water', 'life'] },
{ id: 2, url: 'img/gallery/1.jpg', keywords: ['muki', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['6', '7', 'smoke'] },
{ id: 2, url: 'img/gallery/1.jpg', keywords: ['angry', 'mad', 'puki'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 12, url: 'img/gallery/12.jpg', keywords: ['foo', 'fii', 'smoke'] },
];

var gMeme = {
    selectedImgId: 5,
    txts: [
        {
            line: 'I never eat Falafel', size: 20,
            align: 'left',
            color: 'red'
        }]
};


var gElCanvas = document.getElementById('canvas');
var gElDownBtn = document.querySelector('.download-btn');
var gElGallery = document.querySelector('.gallery');


//when page load init active renderImgs
function init() {

    renderImgs(gImgs);

}

//function render photo to gallery
function renderImgs(array) {
    gElDownBtn.classList.add('hide');
    gElCanvas.classList.add('hide');
    if (document.querySelector('.gallery').classList.contains('hide')) {
        document.querySelector('.gallery').classList.toggle('hide');
    };
    var strHtml = ''
    array.forEach(function (img) {
        // console.log(img.url)
        return strHtml += `<img onclick="drawOnCanvas(${img.id})" class="img-gallery" src="${img.url}"  alt="">`
    });
    gElGallery.innerHTML = strHtml;
}

//function draw selcted img on canvas and pass user to edit screen
function drawOnCanvas(id) {
    if (id === 'url') {
        var url = document.querySelector('.img-url').value
        if (url === '') return;
        if (!(url.match(/\.(jpeg|jpg|gif|png)$/) != null)) {
            document.querySelector('.img-url').value = 'Not a vaild url';
            return;
        }
    }
    gElGallery.classList.add('hide');    //// changed to class hide cause its more reuseable
    gElCanvas.classList.toggle('hide');
    gElDownBtn.classList.toggle('hide');

    // i added this line because now the canvas catch a space under the gallery
    //somting go worng with that, we will fix it later
    // gElCanvas.classList.add('show');    
    var ctx = canvas.getContext('2d');
    var img = new Image();
    (typeof (id) === 'number') ? img.src = `img/gallery/${id}.jpg` : img.src = id;
    img.onload = function () {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, 150, 150);
        // ctx.font = "50px 'ariel'";
        // ctx.fillStyle = 'white';
        // ctx.fillText("puki", 50, 300);
    };

}

//function get memes by key
function getMemeBykey(key) {
    // if (e.keyCode == 13) {   support in enter activation, itsnt workin now but we will fix
    if (!gElCanvas.classList.contains('hide')) gElCanvas.classList.toggle('hide');
    var imgUrl = [];
    var firstMatch = 0;
    for (var i = 0; i < gImgs.length; i++) {
        var img = gImgs[i];
        var x = img.keywords.filter(function (keyword) {
            if (keyword === key) {
                firstMatch += 1
                imgUrl.push(img)
                renderImgs(imgUrl);
                document.querySelector('.searchbox').value = '';
                setPopularKey(key, firstMatch)
            } else {
                // have a bug when finel keyword doesnt match to key no result print
                //eventough that there is some result/
                document.querySelector('.searchbox').value = 'No result';
                setTimeout(() => {
                    document.querySelector('.searchbox').value = '';
                }, 500);
            }
        });
    };
}

//function set new popular keywords - The more they are disguised, the greater they are!
function setPopularKey(key, i) {
    if (i === 1) {
        var elKeyWordsInput = document.querySelector('.keywords-text');
        if (elKeyWordsInput.innerHTML.indexOf(key) !== -1) {
            var elKeyWord = document.querySelector(`.${key}`);
            var currSize = window.getComputedStyle(elKeyWord, null).getPropertyValue('font-size');
            var fontSize = parseFloat(currSize);
            elKeyWord.style.fontSize = (fontSize + 2) + 'px';
        } else {
            elKeyWordsInput.innerHTML += `<span class="${key}">${key}&nbsp</span>`
        }
    }
}


//function for download meme
function downloadImg(elLink) {
    console.log('elLink', elLink)
    elLink.href = canvas.toDataURL();
    elLink.download = 'perfectMeme.jpg';
}











