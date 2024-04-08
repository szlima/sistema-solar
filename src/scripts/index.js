const BODY= document.querySelector('body');
const TITLE= document.querySelector('header h1');
const MODAL_CONTENT= document.querySelector("#modal-content");
const BUTTON_OPEN_MODAL= document.querySelector('#open-button-modal');
const BUTTON_CLOSE_MODAL= document.querySelector('#close-button-modal');
const BUTTON_LANGUAGES= document.querySelector('#button-languages');
const LANGUAGES_BOX= document.querySelector('#languages-box');
const LANGUAGES= document.querySelector('#languages');

let data;

BUTTON_OPEN_MODAL.onclick= () => {
    let content= '';

    content+= `<h1>${data.simulation['main-title']}</h1>`;
    content+= data.simulation['description'].map(p => `<p>${p}</p>`).join('');
    content+= `<h3 id="dev-info">${data.simulation['dev-info']['info'][0]} <i class="fa-solid fa-heart"></i> ${data.simulation['dev-info']['info'][1]} <a target="_blank" href=${data.simulation['dev-info']['url']}>${data.simulation['dev-info']['text']}</a>.</h3>`;
    content+= `<h2>${data.simulation['reference-title']}</h2>`;
    content+= data.simulation['references'].map(a => `<a target="_blank" href=${a.url}>${a.text}</a>`).join('');

    openModal(content);
};

BUTTON_CLOSE_MODAL.onclick= () => BODY.classList.remove('modal-on');

BUTTON_LANGUAGES.onclick= () => LANGUAGES_BOX.classList.toggle('languages-on');

LANGUAGES.onchange= () => {
    setData(LANGUAGES.value);
    LANGUAGES_BOX.classList.remove('languages-on');
};

window.onload= () => setData('english');

function openModal(content){
    BODY.classList.add('modal-on');
    MODAL_CONTENT.innerHTML= `${content}`;
}

function setTitle() {
    TITLE.innerHTML= data.simulation['main-title'];
};

async function setData(chosenLanguage){
    const response= await fetch(`src/json/${chosenLanguage}.json`);
    data= await response.json();

    setTitle();
}