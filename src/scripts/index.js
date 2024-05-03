const BODY= document.querySelector('body');
const TITLE= document.querySelector('header h1');

const SOLAR_SYSTEM= document.querySelector('#solar-system');
const SUN= document.querySelector('#sun');
const PLANETS= Array.from(document.querySelectorAll('.orbit'));

const LANGUAGES= document.querySelector('#languages');
const LANGUAGES_BUTTON= document.querySelector('#languages-button');
const LANGUAGES_BOX= document.querySelector('#languages-box');

const MODAL_BOX_CONTENT= document.querySelector("#modal-box-content");
const MODAL_BOX_OPEN= document.querySelector('#modal-box-open');
const MODAL_BOX_CLOSE= document.querySelector('#modal-box-close');

let data;

/* ------- ------- */

window.onload= () => {
    setData('portuguese');
    LANGUAGES_BOX.options.selectedIndex= 1;
};

TITLE.onclick= () => {
    const element= 'solar-system';
    let content= '';

    content+= `<h1>${data[element].title}</h1>`;
    content+= data[element].description.map(p => `<p>${p}</p>`).join('');

    openModal(content);
};

SOLAR_SYSTEM.onmousemove= () => pauseAnimation();

SOLAR_SYSTEM.onmouseout= () => playAnimation();

SUN.onclick= e => {
    const element= e.target.id;
    let content= '';

    content+= `<h1>${data[element].title}</h1>`;
    content+= data[element].description.map(p => `<p>${p}</p>`).join('');
    content+= '<ul>';
    content+= `<li>${data[element]['orbital-period'].title}: ${data[element]['orbital-period'].value} ${data[element]['orbital-period'].measure}</li>`;
    content+= `<li>${data[element]['diameter'].title}: ${data[element]['diameter'].value}</li>`;
    content+= `<li>${data[element]['obliquity-to-orbit'].title}: ${data[element]['obliquity-to-orbit'].value} ${data[element]['obliquity-to-orbit'].measure}</li>`;
    content+= `<li>${data[element]['mean-temperature'].title}: ${data[element]['mean-temperature'].value}</li>`;
    content+= '</ul>';

    openModal(content);
};

PLANETS.map(e => {
    e.onclick= () => {
        const element= e.id;
        BODY.classList.add(`modal-${element}`);
        let content= '';

        content+= `<h1>${data[element].title}</h1>`;
        content+= data[element].description.map(p => `<p>${p}</p>`).join('');
        content+= '<ul>';
        content+= `<div class='selected-item selected-${element}'></div>`;
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

LANGUAGES_BUTTON.onclick= () => LANGUAGES.classList.toggle('languages-on');

LANGUAGES_BOX.onchange= () => {
    setData(LANGUAGES_BOX.value);
    LANGUAGES.classList.remove('languages-on');
};

MODAL_BOX_OPEN.onclick= () => {
    let content= '';

    content+= `<h1>${data.simulation['main-title']}</h1>`;
    content+= data.simulation['description'].map(p => `<p>${p}</p>`).join('');
    content+= `<h3 id="dev-info">${data.simulation['dev-info']['info'][0]} <i class="fa-solid fa-heart"></i> ${data.simulation['dev-info']['info'][1]} <a target="_blank" href=${data.simulation['dev-info']['url']}>${data.simulation['dev-info']['text']}</a>.</h3>`;
    content+= `<h2>${data.simulation['reference-title']}</h2>`;
    content+= data.simulation['references'].map(a => `<a target="_blank" href=${a.url}>${a.text}</a>`).join('');

    openModal(content);
};

MODAL_BOX_CLOSE.onclick= () => BODY.classList.remove(
    'modal-on', 'modal-mercury', 'modal-venus',
    'modal-earth', 'modal-mars', 'modal-jupiter',
    'modal-saturn', 'modal-uranus', 'modal-neptune'
);

/* ------- ------- */

async function setData(chosenLanguage){
    const response= await fetch(`src/json/${chosenLanguage}.json`);
    data= await response.json();
    setTitle();
}

function setTitle() {
    TITLE.innerHTML= data.simulation['main-title'];
    document.title= data.simulation['main-title'];
};

function openModal(content){
    BODY.classList.add('modal-on');
    MODAL_BOX_CONTENT.innerHTML= `${content}`;
}

function pauseAnimation(){
    BODY.classList.add('animation-paused');
}

function playAnimation(){
    BODY.classList.remove('animation-paused');
}