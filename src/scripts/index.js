const BUTTON_OPEN_MODAL= document.querySelector('#open-button-modal');
const BUTTON_CLOSE_MODAL= document.querySelector('#close-button-modal');
const BOX_INFO= document.querySelector('#info-box');
const UNIVERSE= document.querySelector('#universe');

BUTTON_OPEN_MODAL.addEventListener('click', () => {
    BOX_INFO.classList.remove('invisible');

    if(window.matchMedia('(max-width: 576px)').matches)
        UNIVERSE.classList.add('invisible');
});

BUTTON_CLOSE_MODAL.addEventListener('click', () => {
    BOX_INFO.classList.add('invisible');

    if(UNIVERSE.classList.contains('invisible'))
        UNIVERSE.classList.remove('invisible');
});