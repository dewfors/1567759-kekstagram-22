import {isEscEvent, isEnterEvent} from './util.js';

const CLASS_HIDDEN = 'hidden';
const CLASS_MODAL_OPEN = 'modal-open';

const fileNameElement = document.querySelector('#upload-file');
const imageOverlayElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const imageModalCloseElement = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');
const hashtags = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');

const checkActiveFormFileld = () => {
  if (document.activeElement === hashtags || document.activeElement === description) {
    return true;
  }
}

const onPopupEscKeydown = (evt) => {
  if (!isEscEvent(evt)) {
    return;
  }
  if (checkActiveFormFileld()) {
    return;
  }

  evt.preventDefault();
  closeUploadImageModal();
};

const openUploadImageModal = () => {
  imageOverlayElement.classList.remove(CLASS_HIDDEN);
  bodyElement.classList.add(CLASS_MODAL_OPEN);

  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeUploadImageModal = () => {
  imageOverlayElement.classList.add(CLASS_HIDDEN);
  bodyElement.classList.remove(CLASS_MODAL_OPEN);
  // fileNameElement.value = '';
  // hashtags.value = '';
  // description.value = '';
  form.reset();

  document.removeEventListener('keydown', onPopupEscKeydown);
};

fileNameElement.addEventListener('input', openUploadImageModal);

imageModalCloseElement.addEventListener('click', closeUploadImageModal);

imageModalCloseElement.addEventListener('keydown', (evt) => {
  if (!isEnterEvent(evt)) {
    return;
  }
  closeUploadImageModal();
});

export {closeUploadImageModal};
