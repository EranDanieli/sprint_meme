'use strict'

function init(){
    resetLineIdx()
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    document.querySelector('.modal').style.display='none'
   createGImg()
   renderGallery()
}
function renderGallery(){
    let strHTML =  `<div class="grid-items">`
    gImgs.forEach((img,idx) => {
         strHTML += `<div><img onclick="onOpenModal(event)" class="card"  data-meme = "${idx+1}" src="./images/${idx+1}.jpg" alt=""></div>`
    })
    strHTML += `</div>`
    document.querySelector('.gallery').innerHTML = strHTML;
}
function renderCanvas() {
        
    let meme = getGCurrMeme()
    let currImg =  gImgs.find(img=>{
        return   img.id === meme.id
    })
console.log('currImg',currImg)
let img = new Image()
img.src = `./images/${currImg.url}`
drawImg(img)
meme.lines.forEach(line =>{
   if(!line.txt) return
   else{
   drawText(line)
   
   }
})        
}

function getGCurrMeme(){
    return gCurrMeme;
}
function setText(ev){
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].txt = ev;
}
function addLine(){
    gCurrMeme.selectedLineIdx++
     document.querySelector('.text-input').value = `${gCurrMeme.lines[gCurrMeme.selectedLineIdx].txt}`
     resetColorInput()

}
function resetLineIdx(){
    gCurrMeme.selectedLineIdx = 0;
}
function alignTxt(val){
  gCurrMeme.lines[gCurrMeme.selectedLineIdx].align = val
}
function changeColor(color){
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].color = color
}
function resetColorInput(){
  document.getElementById('color-input').value = 'white'
}
function changeLine(){
    gCurrMeme.selectedLineIdx += 1
    if(gCurrMeme.lines.length-1<gCurrMeme.selectedLineIdx) gCurrMeme.selectedLineIdx=0;
    document.querySelector('.text-input').value = `${gCurrMeme.lines[gCurrMeme.selectedLineIdx].txt}`

}
function createGImg(){
    for(let i = 1 ; i<19;i++)
    gImgs.push({id: i, url: `${i}.jpg`})
}
function updateGMeme(memeId){
    gCurrMeme.id = memeId
    document.querySelector('.text-input').value = `${gCurrMeme.lines[gCurrMeme.selectedLineIdx].txt}`
}
function drawImg(img) {

    var elImg = img
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}
function drawText(line) {
    if(!line.txt) return
   //TODO font
   gCtx.font = `${line.size}px ${line.font}`
   gCtx.lineWidth = 2;
   gCtx.textBaseline = 'top'
   gCtx.fillStyle = line.color
   gCtx.textAlign = line.align
   gCtx.fillText(line.txt,line.x,line.y)
   gCtx.strokeStyle = 'black' // TODO Stroke
   gCtx.strokeText(line.txt,line.x,line.y)

}
function openModal(ev){
    resetLineIdx()
    document.querySelector('.gallery').style.display='none'
    document.querySelector('.modal').style.display = 'flex' ;
    updateGMeme(+ev.target.dataset.meme)
    renderCanvas()
}
function  raiseSize(){
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].size +=5
}
function lowerSize(){
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].size -=5
}