const BODY= document.querySelector('body');
const HEADER__TITLE= document.querySelector('#header__title');

const UNIVERSE= document.querySelector('#universe');
const SOLAR_SYSTEM= document.querySelector('#solar-system');
const SUN= document.querySelector('#sun');
const PLANETS= Array.from(document.querySelectorAll('.solar-system__orbit'));

const LANGUAGES= document.querySelector('#languages');
const LANGUAGES__BUTTON= document.querySelector('#languages__button');
const LANGUAGES__BOX= document.querySelector('#languages__box');

const MODAL= document.querySelector("#modal");
const MODAL__CONTENT= document.querySelector("#modal__content");
const MODAL__BUTTON__OPEN= document.querySelector('#modal__button--open');
const MODAL__BUTTON__CLOSE= document.querySelector('#modal__button--close');

const TEXT_COMPARISON= 'comparison';
const TEXT_INFO= 'info';

let data;

/* ------- ------- */

window.onload= () => {
    setData('portuguese');
    LANGUAGES__BOX.options.selectedIndex= 1;
};

HEADER__TITLE.onclick= () => {
    let elementContent= '';
    const element= 'solar-system';

    elementContent+= `<div class='modal__comparison'>`;
    elementContent+= `<h2 class='modal__title--secondary'>${data[element].comparison}</h2>`;
    elementContent+= `<div class='comparison__wrapper'>`;

    elementContent+= `<div class='comparison__box'>`;
    elementContent+= `<div class='modal__planet modal__planet--mercury'></div>`;
    elementContent+= `<div class='comparison__caption'>${data.mercury.title}</div>`;
    elementContent+= `</div>`;
    elementContent+= `<div class='comparison__box'>`;
    elementContent+= `<div class='modal__planet modal__planet--venus'></div>`;
    elementContent+= `<div class='comparison__caption'>${data.venus.title}</div>`;
    elementContent+= `</div>`;
    elementContent+= `<div class='comparison__box'>`;
    elementContent+= `<div class='modal__planet modal__planet--earth'></div>`;
    elementContent+= `<div class='comparison__caption'>${data.earth.title}</div>`;
    elementContent+= `</div>`;
    elementContent+= `<div class='comparison__box'>`;
    elementContent+= `<div class='modal__planet modal__planet--mars'></div>`;
    elementContent+= `<div class='comparison__caption'>${data.mars.title}</div>`;
    elementContent+= `</div>`;
    elementContent+= `<div class='comparison__box'>`;
    elementContent+= `<div class='modal__planet modal__planet--jupiter modal__planet--rings'></div>`;
    elementContent+= `<div class='comparison__caption'>${data.jupiter.title}</div>`;
    elementContent+= `</div>`;
    elementContent+= `<div class='comparison__box'>`;
    elementContent+= `<div class='modal__planet modal__planet--saturn modal__planet--rings'></div>`;
    elementContent+= `<div class='comparison__caption'>${data.saturn.title}</div>`;
    elementContent+= `</div>`;
    elementContent+= `<div class='comparison__box'>`;
    elementContent+= `<div class='modal__planet modal__planet--uranus modal__planet--rings'></div>`;
    elementContent+= `<div class='comparison__caption'>${data.uranus.title}</div>`;
    elementContent+= `</div>`;
    elementContent+= `<div class='comparison__box'>`;
    elementContent+= `<div class='modal__planet modal__planet--neptune modal__planet--rings'></div>`;
    elementContent+= `<div class='comparison__caption'>${data.neptune.title}</div>`;
    elementContent+= `</div>`;

    elementContent+= `</div>`;
    elementContent+= `</div>`;

    openModal(element, TEXT_COMPARISON, elementContent);
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
    let elementContent= '';
    const element= e.target.id;

    elementContent+= `<div class='modal__comparison'>`;
    elementContent+= `<h2 class='modal__title--secondary'>${data[element].comparison}</h2>`;
    elementContent+= `<div class='comparison__wrapper'>`;

    elementContent+= `<div class='comparison__box'>`;
    elementContent+= `<div class='modal__sun'></div>`;
    elementContent+= `<div class='comparison__caption'>${data[element].title}</div>`;
    elementContent+= `</div>`;
    elementContent+= `<div class='comparison__box'>`;
    elementContent+= `<div class='modal__planet modal__planet--earth'></div>`;
    elementContent+= `<div class='comparison__caption'>${data.earth.title}</div>`;
    elementContent+= `</div>`;

    elementContent+= `</div>`;
    elementContent+= `</div>`;

    elementContent+= `<ul class='modal__list'>`;
    elementContent+= `<li class='modal__list-item'>${data[element]['orbital-period'].title}: ${data[element]['orbital-period'].value} ${data[element]['orbital-period'].measure}</li>`;
    elementContent+= `<li class='modal__list-item'>${data[element]['diameter'].title}: ${data[element]['diameter'].value}</li>`;
    elementContent+= `<li class='modal__list-item'>${data[element]['obliquity-to-orbit'].title}: ${data[element]['obliquity-to-orbit'].value} ${data[element]['obliquity-to-orbit'].measure}</li>`;
    elementContent+= `<li class='modal__list-item'>${data[element]['mean-temperature'].title}: ${data[element]['mean-temperature'].value}</li>`;
    elementContent+= '</ul>';

    openModal(element, TEXT_COMPARISON, elementContent);
};

PLANETS.map(e => {
    e.onclick= () => {
        let elementContent= '';
        const element= e.id;

        const patternPlanetaryRings= /jupiter|saturn|uranus|neptune/;
        const classListModalPlanet= `modal__planet modal__planet--${element}` +
            (patternPlanetaryRings.test(element) ? ' modal__planet--rings' : '');

        elementContent+= `<ul class='modal__list'>`;
        elementContent+= `<div class='${classListModalPlanet}'></div>`;
        elementContent+= `<li class='modal__list-item'>${data[element]['rotation-period'].title}: ${data[element]['rotation-period'].value} ${data[element]['rotation-period'].measure}</li>`;
        elementContent+= `<li class='modal__list-item'>${data[element]['orbital-period'].title}: ${data[element]['orbital-period'].value} ${data[element]['orbital-period'].measure}</li>`;
        elementContent+= `<li class='modal__list-item'>${data[element]['gravity'].title}: ${data[element]['gravity'].value}</li>`;
        elementContent+= `<li class='modal__list-item'>${data[element]['diameter'].title}: ${data[element]['diameter'].value}</li>`;
        elementContent+= `<li class='modal__list-item'>${data[element]['distance-from-sun'].title}: ${data[element]['distance-from-sun'].value}</li>`;
        elementContent+= `<li class='modal__list-item'>${data[element]['obliquity-to-orbit'].title}: ${data[element]['obliquity-to-orbit'].value} ${data[element]['obliquity-to-orbit'].measure}</li>`;
        elementContent+= `<li class='modal__list-item'>${data[element]['mean-temperature'].title}: ${data[element]['mean-temperature'].value}</li>`;
        elementContent+= `<li class='modal__list-item'>${data[element]['ring-system'].title}: ${data[element]['ring-system'].value}</li>`;
        elementContent+= `<li class='modal__list-item'>${data[element]['number-of-moons'].title}: ${data[element]['number-of-moons'].value}</li>`;
        elementContent+= '</ul>';

        openModal(element, TEXT_INFO, elementContent);
    };
});

LANGUAGES__BUTTON.onclick= () => LANGUAGES.classList.toggle('languages--on');

LANGUAGES__BOX.onchange= () => {
    setData(LANGUAGES__BOX.value);
    hideLanguageBox();
};

MODAL__BUTTON__OPEN.onclick= () => {
    let elementContent= '';
    const element= 'simulation';

    elementContent+= `<h3 class='modal__dev'>${data[element]['dev-info']['info'][0]} <span class="material-symbols-outlined modal__icon">favorite</span> ${data[element]['dev-info']['info'][1]} <a class='modal__url modal__url--dev' target="_blank" href=${data[element]['dev-info']['url']}>${data[element]['dev-info']['text']}</a>.</h3>`;
    elementContent+= `<h2 class='modal__title--secondary'>${data[element]['reference-title']}</h2>`;
    elementContent+= data[element]['references'].map(a => `<a class='modal__url modal__url--reference' target="_blank" href=${a.url}>${a.text}</a>`).join('');

    openModal(element, null, elementContent);
};

MODAL__BUTTON__CLOSE.onclick= () => {
    BODY.classList.remove('modal--on');

    MODAL.classList.remove('modal--comparison', 'modal--info',
        'modal--solar-system', 'modal--sun',
        'modal--mercury', 'modal--venus',
        'modal--earth', 'modal--mars', 'modal--jupiter',
        'modal--saturn', 'modal--uranus', 'modal--neptune');
};

/* ------- ------- */

async function setData(chosenLanguage){
    const response= await fetch(`src/json/${chosenLanguage}.json`);
    data= await response.json();
    setTitle();
}

function setTitle() {
    HEADER__TITLE.innerHTML= data.simulation['title'];
    document.title= data.simulation['title'];
};

function openModal(element, modalType, elementContent){
    let modalContent= '';

    BODY.classList.add('modal--on');
    modalType ? MODAL.classList.add(`modal--${modalType}`, `modal--${element}`) : {};

    modalContent+= `<h1 class='modal__title--main'>${data[element].title}</h1>`;
    modalContent+= data[element].description.map(p => `<p class='modal__paragraph'>${p}</p>`).join('');

    modalContent+= elementContent;

    MODAL__CONTENT.innerHTML= `${modalContent}`;
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