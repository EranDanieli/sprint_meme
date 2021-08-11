'use strict'

let gCanvas;
let gCtx;
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
    {
    txt: 'I never eat Falafel',
    size: 20,
    align: 'left',
    color: 'red'
    }
    ]
}

function onInit(){
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    document.querySelector('.modal').style.display='none'
    // update()
}



function drawText(txt, x=100, y=100) {
    console.log('txt in drawText',txt,x,y)
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = '60px impact'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}


function drawImg(img) {
    
    var elImg = img
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}

function onOpenModal(ev){
    document.querySelector('.search-gallery-container').style.display='none'
    document.querySelector('.modal').style.display = 'flex' ;
    console.log('this',ev.target)
    drawImg(ev.target)
}
function onGalleryClick(){
    document.querySelector('.search-gallery-container').style.display='block'
    document.querySelector('.modal').style.display='none'
}

// function update() {
    //     var canvasNode = document.getElementById('my-canvas');
    //     canvasNode.width = canvasNode.parentNode.clientWidth;
    //     canvasNode.height = canvasNode.parentNode.clientHeight;
    // }
    function downloadImg(elLink) {
        var imgContent = gCanvas.toDataURL('image/jpeg')
        elLink.href = imgContent
    }
    function uploadImg() {
        const imgDataUrl = gCanvas.toDataURL("image/jpeg");
    
        // A function to be called if request succeeds
        function onSuccess(uploadedImgUrl) {
            const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
            document.querySelector('.user-msg').innerText = `${uploadedImgUrl}`
    
            document.querySelector('.share-container').innerHTML = `
            <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
               Share   
            </a>`
        }
        doUploadImg(imgDataUrl, onSuccess);
    }
    
    function doUploadImg(imgDataUrl, onSuccess) {
    
        const formData = new FormData();
        formData.append('img', imgDataUrl)
    
        fetch('//ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.text())
        .then((url)=>{
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
    }
    
    