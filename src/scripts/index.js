const BODY= document.querySelector('body');
const HEADER__TITLE= document.querySelector('#header__title');

const UNIVERSE= document.querySelector('#universe');
const SOLAR_SYSTEM= document.querySelector('#solar-system');
const SUN= document.querySelector('#sun');
const PLANETS= Array.from(document.querySelectorAll('.solar-system__orbit'));

const LANGUAGES= document.querySelector('#languages');
const LANGUAGES__BUTTON= document.querySelector('#languages__button');
const LANGUAGES__BOX= document.querySelector('#languages__box');

const MODAL__CONTENT= document.querySelector("#modal__content");
const MODAL__BUTTON__OPEN= document.querySelector('#modal__button--open');
const MODAL__BUTTON__CLOSE= document.querySelector('#modal__button--close');

let data;

/* ------- ------- */

window.onload= () => {
    setData('portuguese');
    LANGUAGES__BOX.options.selectedIndex= 1;
};

HEADER__TITLE.onclick= () => {
    let content= '';
    const element= 'solar-system';

    content+= `<h1 class='modal__title--main'>${data[element].title}</h1>`;
    content+= data[element].description.map(p => `<p class='modal__paragraph'>${p}</p>`).join('');

    openModal(content);
};

UNIVERSE.onclick= e => {
    if(e.target.classList[0] === 'universe'){
        playAnimation();
        hideLanguageBox();
    }
};

SOLAR_SYSTEM.onmousemove= () => pauseAnimation();

SOLAR_SYSTEM.onmouseout= () => playAnimation();

SUN.onclick= e => {
    let content= '';
    const element= e.target.id;

    content+= `<h1 class='modal__title--main'>${data[element].title}</h1>`;
    content+= data[element].description.map(p => `<p class='modal__paragraph'>${p}</p>`).join('');
    content+= `<ul class='modal__list'>`;
    content+= `<li class='modal__list-item'>${data[element]['orbital-period'].title}: ${data[element]['orbital-period'].value} ${data[element]['orbital-period'].measure}</li>`;
    content+= `<li class='modal__list-item'>${data[element]['diameter'].title}: ${data[element]['diameter'].value}</li>`;
    content+= `<li class='modal__list-item'>${data[element]['obliquity-to-orbit'].title}: ${data[element]['obliquity-to-orbit'].value} ${data[element]['obliquity-to-orbit'].measure}</li>`;
    content+= `<li class='modal__list-item'>${data[element]['mean-temperature'].title}: ${data[element]['mean-temperature'].value}</li>`;
    content+= '</ul>';

    openModal(content);
};

PLANETS.map(e => {
    e.onclick= () => {
        let content= '';
        const element= e.id;
        BODY.classList.add(`modal--${element}`);

        const patternPlanetaryRings= /jupiter|saturn|uranus|neptune/;
        const classListModalPlanet= `modal__planet modal__planet--${element}` +
            (patternPlanetaryRings.test(element) ? ' modal__planet--rings' : '');

        content+= `<h1 class='modal__title--main'>${data[element].title}</h1>`;
        content+= data[element].description.map(p => `<p class='modal__paragraph'>${p}</p>`).join('');
        content+= `<ul class='modal__list'>`;
        content+= `<div class='${classListModalPlanet}'></div>`;
        content+= `<li class='modal__list-item'>${data[element]['rotation-period'].title}: ${data[element]['rotation-period'].value} ${data[element]['rotation-period'].measure}</li>`;
        content+= `<li class='modal__list-item'>${data[element]['orbital-period'].title}: ${data[element]['orbital-period'].value} ${data[element]['orbital-period'].measure}</li>`;
        content+= `<li class='modal__list-item'>${data[element]['gravity'].title}: ${data[element]['gravity'].value}</li>`;
        content+= `<li class='modal__list-item'>${data[element]['diameter'].title}: ${data[element]['diameter'].value}</li>`;
        content+= `<li class='modal__list-item'>${data[element]['distance-from-sun'].title}: ${data[element]['distance-from-sun'].value}</li>`;
        content+= `<li class='modal__list-item'>${data[element]['obliquity-to-orbit'].title}: ${data[element]['obliquity-to-orbit'].value} ${data[element]['obliquity-to-orbit'].measure}</li>`;
        content+= `<li class='modal__list-item'>${data[element]['mean-temperature'].title}: ${data[element]['mean-temperature'].value}</li>`;
        content+= `<li class='modal__list-item'>${data[element]['ring-system'].title}: ${data[element]['ring-system'].value}</li>`;
        content+= `<li class='modal__list-item'>${data[element]['number-of-moons'].title}: ${data[element]['number-of-moons'].value}</li>`;
        content+= '</ul>';

        openModal(content);
    };
});

LANGUAGES__BUTTON.onclick= () => LANGUAGES.classList.toggle('languages--on');

LANGUAGES__BOX.onchange= () => {
    setData(LANGUAGES__BOX.value);
    hideLanguageBox();
};

MODAL__BUTTON__OPEN.onclick= () => {
    let content= '';

    content+= `<h1 class='modal__title--main'>${data.simulation['main-title']}</h1>`;
    content+= data.simulation['description'].map(p => `<p class='modal__paragraph'>${p}</p>`).join('');
    content+= `<h3 class='modal__dev'>${data.simulation['dev-info']['info'][0]} <i class="fa-solid fa-heart icon"></i> ${data.simulation['dev-info']['info'][1]} <a class='modal__url' target="_blank" href=${data.simulation['dev-info']['url']}>${data.simulation['dev-info']['text']}</a>.</h3>`;
    content+= `<h2 class='modal__title--secondary'>${data.simulation['reference-title']}</h2>`;
    content+= data.simulation['references'].map(a => `<a class='modal__url' target="_blank" href=${a.url}>${a.text}</a>`).join('');

    openModal(content);
};

MODAL__BUTTON__CLOSE.onclick= () => BODY.classList.remove(
    'modal--on', 'modal--mercury', 'modal--venus',
    'modal--earth', 'modal--mars', 'modal--jupiter',
    'modal--saturn', 'modal--uranus', 'modal--neptune'
);

/* ------- ------- */

async function setData(chosenLanguage){
    const response= await fetch(`src/json/${chosenLanguage}.json`);
    data= await response.json();
    setTitle();
}

function setTitle() {
    HEADER__TITLE.innerHTML= data.simulation['main-title'];
    document.title= data.simulation['main-title'];
};

function openModal(content){
    BODY.classList.add('modal--on');
    MODAL__CONTENT.innerHTML= `${content}`;
}

function pauseAnimation(){
    BODY.classList.add('animation-paused');
}

function playAnimation(){
    BODY.classList.remove('animation-paused');
}

function hideLanguageBox(){
    LANGUAGES.classList.remove('languages--on');
}