import {isEscEvent, isEnterEvent} from './util.js';

const mainElement = document.querySelector('main');

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const messageFragment = document.createDocumentFragment();
const messageElement = successMessageTemplate.cloneNode(true);
const successButtonElement = messageElement.querySelector('.success__button');

const onPopupEscKeydown = (evt) => {
  if (!isEscEvent(evt)) {
    return;
  }
  evt.preventDefault();
  closeSuccessMessage();
};

const openSuccessMessage = () => {
  messageFragment.appendChild(messageElement);
  mainElement.appendChild(messageFragment);

  document.addEventListener('keydown', onPopupEscKeydown);

  const overlayElement = document.querySelector('body section.success');
  overlayElement.addEventListener('click', closeSuccessMessage);
};

const closeSuccessMessage = () => {
  messageElement.remove();

  document.removeEventListener('keydown', onPopupEscKeydown);
};

successButtonElement.addEventListener('click', closeSuccessMessage);

successButtonElement.addEventListener('keydown', (evt) => {
  if (!isEnterEvent(evt)) {
    return;
  }
  closeSuccessMessage();
});

export {openSuccessMessage}

