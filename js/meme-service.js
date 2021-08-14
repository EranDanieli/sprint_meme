'use strict'
let gSavedMeme = []

function saveMemeToStorage(){
    saveToStorage('meme',gSavedMeme)
}

function saveMeme(){
    if(!gSavedMeme) gSavedMeme=[]
    let meme = getGCurrMeme()
    let data = gCanvas.toDataURL();
    gSavedMeme.push({
        img: data,
        meme: meme
    })
    saveMemeToStorage();
}

function renderSavedMeme(){
    gSavedMeme = loadFromStorage('meme')
        let strHTML =  `<div class="grid-items">`
       gSavedMeme.forEach((meme,idx) => {
           console.log('meme',meme)
             strHTML += `<div><img class="card" data-meme = "${idx+1}" src="${meme.img}" alt=""></div>`
        })
        strHTML += `</div>`
        document.querySelector('.gallery').innerHTML = strHTML;
    

}

function openMemePage(){
    if(!gSavedMeme) return
    document.querySelector('.modal').style.display='none'
    document.querySelector('.gallery').style.display='block'
    renderSavedMeme()
}