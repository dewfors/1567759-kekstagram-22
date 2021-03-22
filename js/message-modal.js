import {isEscEvent, isEnterEvent} from './util.js';

const openMessage = (mode) => {
  const mainElement = document.querySelector('main');

  const messageTemplate = document.querySelector(`#${mode}`)
    .content
    .querySelector(`.${mode}`);

  const messageFragment = document.createDocumentFragment();
  const messageElement = messageTemplate.cloneNode(true);
  const buttonElement = messageElement.querySelector(`.${mode}__button`);

  messageFragment.appendChild(messageElement);
  mainElement.appendChild(messageFragment);

  const closeMessage = () => {
    messageElement.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
  };

  const onPopupEscKeydown = (evt) => {
    if (!isEscEvent(evt)) {
      return;
    }
    evt.preventDefault();
    closeMessage();
  };

  document.addEventListener('keydown', onPopupEscKeydown);

  const overlayElement = document.querySelector(`body section.${mode}`);
  overlayElement.addEventListener('click', closeMessage);

  buttonElement.addEventListener('click', closeMessage);

  buttonElement.addEventListener('keydown', (evt) => {
    if (!isEnterEvent(evt)) {
      return;
    }
    closeMessage();
  });


};

export {openMessage};
