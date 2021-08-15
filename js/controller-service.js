'use strict'

function init() {
    resetLineIdx()
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    document.querySelector('.modal').style.display = 'none'
    createGImg()
    renderGallery()

    gSavedMeme = loadFromStorage('meme')
}

function renderGallery() {
    let strHTML = `<div class="grid-items">`
    gImgs.forEach((img, idx) => {
        strHTML += `<div><img onclick="onOpenModal(event)" class="card"  data-meme = "${idx+1}" src="./images/${idx+1}.jpg" alt=""></div>`
    })
    strHTML += `</div>`
    document.querySelector('.gallery').innerHTML = strHTML;
}

function renderCanvas() {

    let meme = getGCurrMeme()

    console.log('meme', meme)
    let currImg = gImgs.find(img => {
        return img.id === meme.id
    })
    console.log('currImg', currImg)
    let img = new Image()
    img.src = `./images/${currImg.url}`
    drawImg(img)
    meme.lines.forEach(line => {
        if (!line.txt) return
        else {
            drawText(line)

        }
    })
}

function getGCurrMeme() {
    return gCurrMeme;
}

function setText(ev) {
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].txt = ev;
}

function addLine() {
    gCurrMeme.lines.push(createLine())
    gCurrMeme.selectedLineIdx = gCurrMeme.lines.length - 1;
    document.querySelector('.text-input').value = ''
    resetColorInput()
    resetStrokeInput()



}

function createLine() {
    const line = {
        x: gCurrMeme.lines[gCurrMeme.selectedLineIdx].x,
        y: (gCurrMeme.lines[gCurrMeme.selectedLineIdx].y === 20 || gCurrMeme.lines[gCurrMeme.selectedLineIdx].y === 410) ? 200 : gCurrMeme.lines[gCurrMeme.selectedLineIdx].y - 50,
        txt: '',
        font: 'impact',
        size: 60,
        align: 'center',
        color: 'white',
        stroke: 'black'
    }
    return line;
}

function resetLineIdx() {
    gCurrMeme.selectedLineIdx = 0;
}

function alignTxt(val) {
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].align = val
}

function changeColor(color) {
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].color = color
}

function resetColorInput() {
    document.getElementById('color-input').value = 'white'
}

function changeLine() {
    gCurrMeme.selectedLineIdx += 1
    if (gCurrMeme.lines.length - 1 < gCurrMeme.selectedLineIdx) gCurrMeme.selectedLineIdx = 0;
    document.querySelector('.text-input').value = `${gCurrMeme.lines[gCurrMeme.selectedLineIdx].txt}`

}

function createGImg() {
    for (let i = 1; i < 19; i++)
        gImgs.push({ id: i, url: `${i}.jpg` })
}

function updateGMeme(memeId) {
    gCurrMeme.id = memeId
    document.querySelector('.text-input').value = `${gCurrMeme.lines[gCurrMeme.selectedLineIdx].txt}`
}

function drawImg(img) {

    var elImg = img
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}

function drawText(line) {
    if (!line.txt) return
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.lineWidth = 2;
    gCtx.textBaseline = 'top'
    gCtx.fillStyle = line.color
    gCtx.textAlign = line.align
    gCtx.fillText(line.txt, line.x, line.y)
    gCtx.strokeStyle = line.stroke
    gCtx.strokeText(line.txt, line.x, line.y)

}

function openModal(ev) {
    resetLineIdx()
    getGCurrMeme().lines[0].txt = 'Example'
    getGCurrMeme().lines[1].txt = 'Example'
        // getGCurrMeme().lines[1].txt=''
        // getGCurrMeme().lines[2].txt=''
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.modal').style.display = 'flex';
    updateGMeme(+ev.target.dataset.meme)
    renderCanvas()
}

function raiseSize() {
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].size += 5
}

function lowerSize() {
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].size -= 5
}

function changeFont(value) {
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].font = value
    console.log(gCurrMeme.lines[gCurrMeme.selectedLineIdx].font)
}

function changeStroke(value) {
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].stroke = value
}

function resetStrokeInput() {
    document.querySelector('#stroke-selector').value = 'white'
}

function removeLine() {
    gCurrMeme.lines.splice(gCurrMeme.selectedLineIdx, 1)
    gCurrMeme.selectedLineIdx--
        document.querySelector('.text-input').value = gCurrMeme.lines[gCurrMeme.selectedLineIdx].txt
}