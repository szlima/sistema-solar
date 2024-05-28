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
const TEXT_TITLE= 'title';

let data;

/* ------- ------- */

window.onload= () => {
    setData('portuguese');
    LANGUAGES__BOX.options.selectedIndex= 1;
};

HEADER__TITLE.onclick= () => {
    const element= 'solar-system';
    let elementContent= '';

    for(let i in data.planets)
        elementContent+= getElementComparisonBox(i);

    elementContent= getComparisonBox(element, elementContent);

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
    const element= e.target.id;
    let elementContent= '';

    elementContent+= getElementComparisonBox(element);
    elementContent+= getElementComparisonBox('earth');

    elementContent= getComparisonBox(element, elementContent);
    elementContent+= getInfoList(element);

    openModal(element, TEXT_COMPARISON, elementContent);
};

PLANETS.map(e => {
    e.onclick= () => {
        const element= e.id;
        const elementContent= getInfoList(element);

        openModal(element, TEXT_INFO, elementContent);
    };
});

LANGUAGES__BUTTON.onclick= () => LANGUAGES.classList.toggle('languages--on');

LANGUAGES__BOX.onchange= () => {
    setData(LANGUAGES__BOX.value);
    hideLanguageBox();
};

MODAL__BUTTON__OPEN.onclick= () => {
    const element= 'simulation';
    let elementContent= '';

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

function openModal(element, modalType, elementContent){
    const elementData= getElementData(element);
    let modalContent= '';

    BODY.classList.add('modal--on');
    modalType ? MODAL.classList.add(`modal--${modalType}`, `modal--${element}`) : {};

    modalContent+= `<h1 class='modal__title--main'>${elementData.title}</h1>`;
    modalContent+= elementData.description.map(p => `<p class='modal__paragraph'>${p}</p>`).join('');

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

async function setData(chosenLanguage){
    const response= await fetch(`src/json/${chosenLanguage}.json`);
    data= await response.json();
    setTitle();
}

function setTitle() {
    HEADER__TITLE.innerHTML= data.simulation['title'];
    document.title= data.simulation['title'];
};

function getClassListModalPlanet(element){
    return `modal__planet modal__planet--${element}` +
        (isRingedPlanet(element) ? ' modal__planet--rings' : '');
}

function getInfoList(element){
    const elementData= getElementData(element);
    let content= '';

    content+= `<ul class='modal__list'>`;
    content+= isPlanet(element) ? `<div class='${getClassListModalPlanet(element)}'></div>` : '';

    for(let i in elementData['info-list']){

        content+= `<li class='modal__list-item'>`;
        for(let j in elementData['info-list'][i]){

            content+= (j===TEXT_TITLE) ? `${elementData['info-list'][i][j]}:` :
                ` ${elementData['info-list'][i][j]}`;
        }
        content+= `</li>`;
    }
    content+= '</ul>';

    return content;
}

function getElementData(element){
    return isPlanet(element) ? data.planets[element] : data[element];
}

function getElementComparisonBox(element){
    const classList= isPlanet(element) ? getClassListModalPlanet(element) : 'modal__sun';
    const elementData= getElementData(element);
    let content= '';

    content+= `<div class='comparison__box'>`;
    content+= `<div class='${classList}'></div>`;
    content+= `<div class='comparison__caption'>${elementData.title}</div>`;
    content+= `</div>`;

    return content;
}

function getComparisonBox(element, elementContent){
    let content= '';

    content+= `<div class='modal__comparison'>`;
    content+= `<h2 class='modal__title--secondary'>${data[element].comparison}</h2>`;
    content+= `<div class='comparison__wrapper'>`;

    content+= elementContent;

    content+= `</div>`;
    content+= `</div>`;

    return content;
}

function isPlanet(element){
    const patternPlanetary= /mercury|venus|earth|mars|jupiter|saturn|uranus|neptune/;
    return patternPlanetary.test(element);
}

function isRingedPlanet(element){
    const patternPlanetaryRings= /jupiter|saturn|uranus|neptune/;
    return patternPlanetaryRings.test(element);
}
