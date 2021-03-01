import {isEscEvent, isEnterEvent} from './util.js';

const mainElement = document.querySelector('main');

const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const messageFragment = document.createDocumentFragment();
const messageElement = errorMessageTemplate.cloneNode(true);
const errorButtonElement = messageElement.querySelector('.error__button');

const onPopupEscKeydown = (evt) => {
  if (!isEscEvent(evt)) {
    return;
  }
  evt.preventDefault();
  closeErrorMessage();
};

const openErrorMessage = () => {
  messageFragment.appendChild(messageElement);
  mainElement.appendChild(messageFragment);

  document.addEventListener('keydown', onPopupEscKeydown);

  const overlayElement = document.querySelector('body section.error');
  overlayElement.addEventListener('click', closeErrorMessage);
};

const closeErrorMessage = () => {
  messageElement.remove();

  document.removeEventListener('keydown', onPopupEscKeydown);
};

errorButtonElement.addEventListener('click', closeErrorMessage);

errorButtonElement.addEventListener('keydown', (evt) => {
  if (!isEnterEvent(evt)) {
    return;
  }
  closeErrorMessage();
});

export {openErrorMessage};

