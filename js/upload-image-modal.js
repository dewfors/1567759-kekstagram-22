import {isEscEvent, isEnterEvent} from './util.js';

const fileNameElement = document.querySelector('#upload-file');
const imageOverlayElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const imageModalCloseElement = document.querySelector('#upload-cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUploadImageModal();
  }
};


const openUploadImageModal = () => {
  imageOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);

};

const closeUploadImageModal = () => {
  imageOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  fileNameElement.value = '';

  document.removeEventListener('keydown', onPopupEscKeydown);

};

fileNameElement.addEventListener('input', function () {
  openUploadImageModal();
});

imageModalCloseElement.addEventListener('click', () => {
  closeUploadImageModal();
});

imageModalCloseElement.addEventListener('keydown', (evt) => {
  if (isEnterEvent(evt)) {
    closeUploadImageModal();
  }
});
