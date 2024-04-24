const BODY= document.querySelector('body');
const TITLE= document.querySelector('header h1');

const MODAL_CONTENT= document.querySelector("#modal-content");
const BUTTON_OPEN_MODAL= document.querySelector('#open-button-modal');
const BUTTON_CLOSE_MODAL= document.querySelector('#close-button-modal');

const BUTTON_LANGUAGES= document.querySelector('#button-languages');
const LANGUAGES_BOX= document.querySelector('#languages-box');
const LANGUAGES= document.querySelector('#languages');

const ELEMENTS= Array.from(document.querySelectorAll('.orbit'));
const SOLAR_SYSTEM= document.querySelector('#solar-system');

let data;


SOLAR_SYSTEM.onmousemove= () => pauseAnimation();

SOLAR_SYSTEM.onmouseout= () => playAnimation();

ELEMENTS.map(e => {
    e.onclick= () => {
        const element= e.id;
        BODY.classList.add(`modal-${element}`);
        let content= '';

        content+= `<h1>${data[element].title}</h1>`;
        content+= data[element].description.map(p => `<p>${p}</p>`).join('');
        content+= '<ul>';
        content+= `<li>${data[element]['rotation-period'].title}: ${data[element]['rotation-period'].value} ${data[element]['rotation-period'].measure}</li>`;
        content+= `<li>${data[element]['orbital-period'].title}: ${data[element]['orbital-period'].value} ${data[element]['orbital-period'].measure}</li>`;
        content+= `<li>${data[element]['gravity'].title}: ${data[element]['gravity'].value}</li>`;
        content+= `<li>${data[element]['diameter'].title}: ${data[element]['diameter'].value}</li>`;
        content+= `<li>${data[element]['distance-from-sun'].title}: ${data[element]['distance-from-sun'].value}</li>`;
        content+= `<li>${data[element]['obliquity-to-orbit'].title}: ${data[element]['obliquity-to-orbit'].value} ${data[element]['obliquity-to-orbit'].measure}</li>`;
        content+= `<li>${data[element]['mean-temperature'].title}: ${data[element]['mean-temperature'].value}</li>`;
        content+= `<li>${data[element]['ring-system'].title}: ${data[element]['ring-system'].value}</li>`;
        content+= `<li>${data[element]['number-of-moons'].title}: ${data[element]['number-of-moons'].value}</li>`;
        content+= '</ul>';

        openModal(content);
    };
});

BUTTON_OPEN_MODAL.onclick= () => {
    let content= '';

    content+= `<h1>${data.simulation['main-title']}</h1>`;
    content+= data.simulation['description'].map(p => `<p>${p}</p>`).join('');
    content+= `<h3 id="dev-info">${data.simulation['dev-info']['info'][0]} <i class="fa-solid fa-heart"></i> ${data.simulation['dev-info']['info'][1]} <a target="_blank" href=${data.simulation['dev-info']['url']}>${data.simulation['dev-info']['text']}</a>.</h3>`;
    content+= `<h2>${data.simulation['reference-title']}</h2>`;
    content+= data.simulation['references'].map(a => `<a target="_blank" href=${a.url}>${a.text}</a>`).join('');

    openModal(content);
};

BUTTON_CLOSE_MODAL.onclick= () => BODY.classList.remove(
    'modal-on', 'modal-mercury', 'modal-venus', 'modal-earth',
    'modal-mars', 'modal-jupiter', 'modal-saturn',
    'modal-uranus'
);

BUTTON_LANGUAGES.onclick= () => LANGUAGES_BOX.classList.toggle('languages-on');

LANGUAGES.onchange= () => {
    setData(LANGUAGES.value);
    LANGUAGES_BOX.classList.remove('languages-on');
};

window.onload= () => setData('english');

function pauseAnimation(){
    BODY.classList.add('animation-paused');
}

function playAnimation(){
    BODY.classList.remove('animation-paused');
}

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