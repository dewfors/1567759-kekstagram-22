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

  const onCloseMessage = () => {
    messageElement.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
  };

  const onPopupEscKeydown = (evt) => {
    if (!isEscEvent(evt)) {
      return;
    }
    evt.preventDefault();
    onCloseMessage();
  };

  document.addEventListener('keydown', onPopupEscKeydown);

  const overlayElement = document.querySelector(`body section.${mode}`);
  overlayElement.addEventListener('click', onCloseMessage);

  buttonElement.addEventListener('click', onCloseMessage);

  buttonElement.addEventListener('keydown', (evt) => {
    if (!isEnterEvent(evt)) {
      return;
    }
    onCloseMessage();
  });


};

export {openMessage};
