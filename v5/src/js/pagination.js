const request = new XMLHttpRequest();
request.open('GET', '../../df/pets.json');
request.responseType = 'json';
request.send();
let df = ''
request.onload = function(){
df = request.response
window.df = df
let cardContainer = document.querySelector('.cardContainer')

// Prepare
let pets = [0,1,2,3,4,5,6,7]
let arrs = []
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

for( let i=0; i<6; i++) {
    shuffle(pets)
    for (let arr of pets) {
        arrs.push(arr)
    }
}

let curentPages = 1

function createPage(){

    document.querySelector('#page').innerHTML= `${curentPages}`
    if(document.documentElement.clientWidth < 740) {
        maxCardOnPage = 3
    } else if (document.documentElement.clientWidth < 1100) {
        maxCardOnPage = 6
    } else {
        maxCardOnPage = 8
    }

    maxPages = 48/maxCardOnPage
    cardContainer.innerHTML = '';
    for (let i=0; i<maxCardOnPage; i++) {
        createCard(arrs[(curentPages-1)*maxCardOnPage+i]);
    }
    initialPopup()
}

function createCard(i){
    let nameClass = df.pets[i].name
    let url = '"../../assets/Our\ Friend/Pets/' + df.pets[i].img + '"'
    cardContainer.innerHTML +=`<div class="card ${nameClass}">
    <div class="cardPetPic ${nameClass}" style = 'background-image: url(${url})'></div>
    <p class="cardFont ">${nameClass}</p>
    <div class="cardBtnLearnMore ">
        <p class="cardFontLearnMore">Learn more</p>
    </div>
    </div>`
}

function nextPage(){
    if (curentPages < maxPages){
        curentPages++
        createPage()
        document.querySelector('#first').classList.add('unlock')
        document.querySelector('#previous').classList.add('unlock')
    }
    if (curentPages == maxPages) {
        document.querySelector('#next').classList.remove('unlock')
        document.querySelector('#last').classList.remove('unlock')
    }
}

function lastPage(){
        curentPages = maxPages
        createPage()
        document.querySelector('#first').classList.add('unlock')
        document.querySelector('#previous').classList.add('unlock')
        document.querySelector('#next').classList.remove('unlock')
        document.querySelector('#last').classList.remove('unlock')
}

function previousPage(){
    if (curentPages > 1){
        curentPages--
        createPage()
        document.querySelector('#next').classList.add('unlock')
        document.querySelector('#last').classList.add('unlock')
    }
    if (curentPages == 1) {
        document.querySelector('#first').classList.remove('unlock')
        document.querySelector('#previous').classList.remove('unlock')
    }
}

function firstPage(){
    curentPages=1
    createPage()
    document.querySelector('#first').classList.remove('unlock')
    document.querySelector('#previous').classList.remove('unlock')
    document.querySelector('#next').classList.add('unlock')
    document.querySelector('#last').classList.add('unlock')
}

function rebuildPage(){
    firstPage()
}

function popup(){
    for (let i=0; i<window.df.pets.length;i++){
        if (this.classList[1] == window.df.pets[i].name){
            url =  '"../../assets/Our\ Friend/Pets/' + window.df.pets[i].img + '"'
            namePet = window.df.pets[i].name
            typePet = window.df.pets[i].type
            breed = window.df.pets[i].breed
            description = window.df.pets[i].description
            age = window.df.pets[i].age

            inoculations = ''
            for (arr of window.df.pets[i].inoculations) {
                if (inoculations == '') {
                    inoculations += arr
                } else {
                    inoculations += ', ' + arr
                }
            }

            diseases=''
            for (arr of window.df.pets[i].diseases) {
                if (diseases == '') {
                    diseases += arr
                } else {
                    diseases += ', ' + arr
                }
            }

            parasites =''
            for (arr of window.df.pets[i].parasites) {
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
    let cards = document.querySelectorAll('.cardContainer .card')
    for (let card of cards) {
         card.addEventListener("click", popup);
    }
}


createPage()
initialPopup()

document.querySelector('#next').addEventListener('click',nextPage)
document.querySelector('#previous').addEventListener('click',previousPage)
document.querySelector('#last').addEventListener('click',lastPage)
document.querySelector('#first').addEventListener('click',firstPage)

window.addEventListener('resize',rebuildPage)
}
