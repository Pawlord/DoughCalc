let typeTrays = document.querySelector('.type-trays');
let typeKneadings = document.querySelector('.type-kneadings');

let popupFirstLine = document.querySelector('.popup-help-first-line')
let popupSecondLine = document.querySelector('.popup-help-second-line')
let helpFirstIco = document.querySelector('.help-icon-first-line')
let helpSecondIco = document.querySelector('.help-icon-second-line')

let result25 = document.querySelector('.res-25')
let result30 = document.querySelector('.res-30')
let result35 = document.querySelector('.res-35')

let resultWindow = document.querySelector('.result-window')
let instructioWindow = document.querySelector('.instruction-window')
let mainWindow = document.querySelector('.main-window')

let okResultButton = document.querySelector('.button-ok')
let cancelResultButton = document.querySelector('.button-cancell')
let popupResultContainer = document.querySelector('.popup-container')

let resultButton = document.querySelector('.button-calc')
let helpButton = document.querySelector('.button-help')
let instructionButton = document.querySelector('.instruction-btn')

let popupArr = [[],[],[]]
let popupArr25 = document.querySelector('.popup-25').children
for (const item of popupArr25) {
    popupArr[0].push(item)
}
let popupArr30 = document.querySelector('.popup-30').children
for (const item of popupArr30) {
    popupArr[1].push(item)
}
let popupArr35 = document.querySelector('.popup-35').children
for (const item of popupArr35) {
    popupArr[2].push(item)
}

let getResult = function(restArr, costArr, mul, popupArr, type){
    let countPieceDough = [69, 47, 35]

    let [dNorm25, dNorm30, dNorm35] = costArr.map(function(elem, index){
        return elem - restArr[index] * mul[index]
    })
    let normArr = [dNorm25, dNorm30, dNorm35]
    
    for (let i = 0; i < popupArr.length; i++) {
        for (let j = 0; j < popupArr[i].length; j++) {
            if (j == 0) {
                popupArr[i][j].textContent = `Расход: ${costArr[i]}`
            } else if (j == 1){
                if (type == 'trays') {
                    popupArr[i][j].textContent = `Остаток в лотках: ${restArr[i]}`
                } else if (type == 'kneedings') {
                    popupArr[i][j].textContent = `Остаток в замесах: ${restArr[i]}`
                }
                
            } else if (j == 2){
                popupArr[i][j].textContent = `Остаток в плюшках: ${restArr[i] * mul[i]}`
            } else if (j == 3){
                popupArr[i][j].textContent = `Норма: ${(normArr[i] / countPieceDough[i]).toFixed(1)}`
            }
        }
    }
    getUserResult(dNorm25, dNorm30, dNorm35)
}

let getUserResult = function(dNorm25, dNorm30, dNorm35){
    if (dNorm25 < 0) {
        result25.textContent = 0
    } else if (dNorm25 > 0) {
        result25.textContent = Number(Math.round(dNorm25 / 69))
    }

    if (dNorm30 < 0) {
        result30.textContent = 0
    } else if (dNorm30 > 0) {
        result30.textContent = Number(Math.round(dNorm30 / 47))
    }
    
    if (dNorm35 < 0) {
        result35.textContent = 0
    } else if (dNorm35 > 0) {
        result35.textContent = Number(Math.round(dNorm35 / 35))
    }
    
}

typeTrays.addEventListener('click', function(){
    typeKneadings.classList.remove('is-active')
    typeTrays.classList.add('is-active')
})

typeKneadings.addEventListener('click', function(){
    typeTrays.classList.remove('is-active')
    typeKneadings.classList.add('is-active')
})

helpFirstIco.addEventListener('mouseover', function(){
    helpFirstIco.addEventListener('mousemove', function(e){
        popupFirstLine.style.cssText = `left: ${e.pageX + 20}px; top: ${e.pageY}px;`
    })
    popupFirstLine.classList.remove('invisible')
})
helpFirstIco.addEventListener('mouseout', function(){
    popupFirstLine.classList.add('invisible')
})

helpSecondIco.addEventListener('mouseover', function(){
    helpSecondIco.addEventListener('mousemove', function(e){
        popupSecondLine.style.cssText = `left: ${e.pageX + 20}px; top: ${e.pageY}px;`
    })
    popupSecondLine.classList.remove('invisible')
})
helpSecondIco.addEventListener('mouseout', function(){
    popupSecondLine.classList.add('invisible')
})

resultButton.addEventListener('click', function(){
    let inputArr = document.querySelectorAll('.input-number')
    let newArr = []
    for (const elem of inputArr) {
        newArr.push(Number(elem.value))
    }
    let [dcost25, dcost30, dcost35, drest25, drest30, drest35] = newArr
    let restArr = [drest25, drest30, drest35]
    let costArr = [dcost25, dcost30, dcost35]
    
    if (typeTrays.classList.contains('is-active')) {
        
        let mul = [10, 7, 5]
        let type = 'trays';
        getResult(restArr, costArr, mul, popupArr, type)
        mainWindow.classList.add('invisible')
        resultWindow.classList.remove('invisible')


    } else if(typeKneadings.classList.contains('is-active')){
        
        let mul = [69, 47, 35]
        let type = 'kneedings'
        getResult(restArr, costArr, mul, popupArr, type)
        mainWindow.classList.add('invisible')
        resultWindow.classList.remove('invisible')

    }
})

okResultButton.addEventListener('click', function(){
    resultWindow.classList.add('invisible')
    mainWindow.classList.remove('invisible')
})

cancelResultButton.addEventListener('click', function(){
    if (cancelResultButton.textContent == 'Развернуть') {
        popupResultContainer.classList.remove('popup-container-ani-invisible')
        popupResultContainer.classList.add('popup-container-ani-visible')
        cancelResultButton.textContent = 'Свернуть'
    } else if (cancelResultButton.textContent == 'Свернуть') {
        popupResultContainer.classList.remove('popup-container-ani-visible')
        popupResultContainer.classList.add('popup-container-ani-invisible')
        cancelResultButton.textContent = 'Развернуть'
    }
    
})

helpButton.addEventListener('click', function(){
    mainWindow.classList.add('invisible')
    instructioWindow.classList.remove('invisible')
})

instructionButton.addEventListener('click', function(){
    mainWindow.classList.remove('invisible')
    instructioWindow.classList.add('invisible')
})