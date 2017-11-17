'use strict'
console.log('memegenertor')

//global vars
var gImgs = [{ id: 1, url: 'img/gallery/1.jpg', keywords: ['sad', 'really happy'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/1.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/1.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/1.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 2, url: 'img/gallery/2.jpg', keywords: ['angry', 'mad', 'smoke'] },
{ id: 12, url: 'img/gallery/12.jpg', keywords: ['sad', 'mad', 'smoke'] },
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


//when page load init active renderImgs
function init() {
    renderImgs(gImgs);
}



//function render photo to gallery
function renderImgs(array) {
    var elGallery = document.querySelector('.gallery');
    var strHtml = ''
    array.forEach(function (img) {
        // console.log(img.url)
        return strHtml += `<img onclick="drawOnCanvas(${img.id})" class="img-gallery" src="${img.url}"  alt="">`
    });
    elGallery.innerHTML = strHtml;
}

//function draw selcted img on canvas and pass user to edit screen
function drawOnCanvas(id) {
    document.querySelector('.gallery').classList.add('hide');    //// changed to class hide cause its more reuseable
    var elCanvas = document.getElementById('canvas');

    // i added this line because now the canvas catch a space under the gallery
    //somting go worng with that, we will fix it later
    // elCanvas.classList.add('show');    


    var ctx = canvas.getContext('2d');
    var img = new Image();
    // console.log(id)

    img.src = `img/gallery/${id}.jpg`;

    img.onload = function () {
        ctx.drawImage(img, 100, 0, 100, 100);
        ctx.font = "50px 'Segoe UI'";
        ctx.fillStyle = 'white';
        ctx.fillText("Text on Canvas", 50, 300);
    };
}

//function get memes by key
function getMemeBykey(key) {

    // if (e.keyCode == 13) {   support in enter activation, itsnt workin now but we will fix

    var imgUrl = [];
    for (var i = 0; i < gImgs.length; i++) {
        var img = gImgs[i];
        var x = img.keywords.filter(function (keyword) {
            if (keyword === key) {
                imgUrl.push(img)
            }
        });
    };
    // console.log(imgUrl)
    renderImgs(imgUrl);
    document.querySelector('.searchbox').value ='';
}




















