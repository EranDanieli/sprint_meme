'use strict'
// let gFont  TODO
let gCanvas;
var gImgs =[];
let gCtx;
var gCurrMeme = {
   id: 5,
    selectedLineIdx: 0,
    lines: [
    {
        x:250,
        y:20,
        font: 'impact',
    txt: '',
    size: 60,
    align: 'center',
    color: 'white'
    },
    {
        x:250,
        y:410,
    txt: '',
    font: 'impact',
    size: 60,
    align: 'center',
    color: 'white'
    },
    {
        x:250,
        y:220,
    txt: '',
    font: 'impact',
    size: 60,
    align: 'center',
    color: 'white'
    }
    ]
}




function onInit(){
    init()
    
}
function onAddLine(){
    addLine()
}

function onResetLineIdx(){
    resetLineIdx();
}
function onChangeColor(ev){
    changeColor(ev.value)
    renderCanvas()
   
}

function onSetText(ev){
    setText(ev)
    renderCanvas()
}


function onChangeLine(){
changeLine()
renderCanvas()
}
function onOpenModal(ev){
   openModal(ev)
    }

  
    function onAlignTxt(ev){
        alignTxt(ev.value)
        renderCanvas()
    }

   
function onGalleryClick(){
    document.querySelector('.gallery').style.display='block'
    document.querySelector('.modal').style.display='none'
}
function onRaiseSize(){
    raiseSize()
    renderCanvas()
}
function onLowerSize(){
    lowerSize()
    renderCanvas()
}