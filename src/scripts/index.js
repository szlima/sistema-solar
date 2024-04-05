const UNIVERSE= document.querySelector('#universe');
const MODAL= document.querySelector('#modal');
const MODAL_CONTENT= document.querySelector("#modal-content");
const BUTTON_OPEN_MODAL= document.querySelector('#open-button-modal');
const BUTTON_CLOSE_MODAL= document.querySelector('#close-button-modal');

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

BUTTON_CLOSE_MODAL.onclick= () => {
    MODAL.classList.add('invisible');

    if(UNIVERSE.classList.contains('invisible'))
        UNIVERSE.classList.remove('invisible');
};

window.onload= () => setData('portuguese');

function openModal(content){
    MODAL.classList.remove('invisible');

    if(window.matchMedia('(max-width: 576px)').matches)
        UNIVERSE.classList.add('invisible');

    MODAL_CONTENT.innerHTML= `${content}`;
}

async function setData(chosenLanguage){
    const response= await fetch(`src/json/${chosenLanguage}.json`);
    data= await response.json();
}