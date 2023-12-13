
let request = new XMLHttpRequest();
request.open('GET', '../../df/pets.json');
request.responseType = 'json';
request.send();
let df = ''
request.onload = function(){

let BtnLeft = document.querySelector('.sliderPetsBtnLeft')
let BtnRight = document.querySelector('.sliderPetsBtnRight')
let currentBlock = document.querySelector('.currentBlock')
let nextBlock = document.querySelector('.nextBlock')

df = request.response

let currentShowPets = []

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function clearStack(){
    currentShowPets.shift()
    currentShowPets.shift()
    currentShowPets.shift()
}

function switchSlides() {
    nextBlock.style.top = 0;
    setTimeout(()=>{nextBlock.classList.add('currentBlock');
    nextBlock.classList.remove('nextBlock');
    currentBlock.classList.add('nextBlock');
    nextBlock.style.top = '-100%' ;
    currentBlock.classList.remove('currentBlock');

    currentBlock = document.querySelector('.currentBlock');
    nextBlock = document.querySelector('.nextBlock');
    createBlock(nextBlock)
    clearStack()
    initialPopup()
    },1000)
}

function createBlock(block){
block.innerHTML = ''
createCard(block);
createCard(block);
createCard(block);
}

function checkRepeate(){
    let i = getRandomInt(df.pets.length)
    let j = 0
    for (let arr of currentShowPets) {
        if (arr == i) {checkRepeate()}
    }
    return i
}

function createCard(block){
    let i = checkRepeate()
    currentShowPets.push(i)
    let nameClass = df.pets[i].name
    let url = '"../../assets/Our\ Friend/Pets/' + df.pets[i].img + '"'
    block.innerHTML +=`<div class="card ${nameClass}">
    <div class="cardPetPic ${nameClass}" style = 'background-image: url(${url})'></div>
    <p class="cardFont ">${nameClass}</p>
    <div class="cardBtnLearnMore ">
        <p class="cardFontLearnMore">Learn more</p>
    </div>
    </div>`
}

createBlock(currentBlock)
createBlock(nextBlock)
clearStack()
initialPopup()



function popup(){
    for (let i=0; i<df.pets.length;i++){
        if (this.classList[1] == df.pets[i].name){
            url =  '"../../assets/Our\ Friend/Pets/' + df.pets[i].img + '"'
            namePet = df.pets[i].name
            typePet = df.pets[i].type
            breed = df.pets[i].breed
            description = df.pets[i].description
            age = df.pets[i].age

            inoculations = ''
            for (let arr of df.pets[i].inoculations) {
                if (inoculations == '') {
                    inoculations += arr
                } else {
                    inoculations += ', ' + arr
                }
            }

            diseases=''
            for (let arr of df.pets[i].diseases) {
                if (diseases == '') {
                    diseases += arr
                } else {
                    diseases += ', ' + arr
                }
            }

            parasites =''
            for (let arr of df.pets[i].parasites) {
                if (parasites == '') {
                    parasites += arr
                } else {
                    parasites += ', ' + arr
                }
            }
        }
    }
    popUp = document.querySelector('.popUp')
    popUp.innerHTML =`
    <div class="popUpWrapper">
    <div class="popUpContainer">
    <div class="btnPopup">
        <img src="../../assets/Popup/Vector.png">
    </div>
    <div class="popUpPlace">
        <div class="imgPet" style = 'background-image: url(${url})'></div>
        <div class="textArea">
            <h3>${namePet}</h3>
            <h4>${typePet} - ${breed}</h4>
            <p>${description}</p>
            <ul>
                <li><b>Age:</b> ${age}</li>
                <li><b>Inoculations:</b> ${inoculations}</li>
                <li><b>Diseases:</b> ${diseases}</li>
                <li><b>Parasites:</b> ${parasites}</li>
            </ul>
        </div>
    </div>
    </div> </div>`

    document.body.style.overflow = "hidden";
    btnPopup = document.querySelector('.btnPopup')
    btnPopup.addEventListener("click", ()=>{
        popUp.innerHTML = ``
        document.body.style.overflow = "auto"
    });
}

function initialPopup() {
    let cards = document.querySelectorAll('.currentBlock .card')
    for (let card of cards) {
        card.addEventListener("click", popup);
    }
}


BtnLeft.addEventListener("click", switchSlides);
BtnRight.addEventListener("click", switchSlides);
initialPopup()

}