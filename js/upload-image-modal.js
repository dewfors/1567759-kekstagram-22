import {HIDDEN_STATE, MODAL_OPEN_STATE} from './constants.js';
import {isEscEvent, isEnterEvent} from './util.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileNameElement = document.querySelector('#upload-file');
const imageOverlayElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const imageModalCloseElement = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');
const preview = form.querySelector('.img-upload__preview img')
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

const loadFile = () => {
  const file = fileNameElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }

};

const openUploadImageModal = () => {
  imageOverlayElement.classList.remove(HIDDEN_STATE);
  bodyElement.classList.add(MODAL_OPEN_STATE);

  fileNameElement.addEventListener('change', loadFile);

  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeUploadImageModal = () => {
  imageOverlayElement.classList.add(HIDDEN_STATE);
  bodyElement.classList.remove(MODAL_OPEN_STATE);

  fileNameElement.removeEventListener('change', loadFile);

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
