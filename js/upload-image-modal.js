import {HIDDEN_STATE, MODAL_OPEN_STATE, FILE_TYPES} from './constants.js';
import {isEscEvent, isEnterEvent} from './util.js';
import {clearEffect} from './upload-image-effect.js';

const fileNameElement = document.querySelector('#upload-file');
const imageOverlayElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const imageModalCloseElement = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');
const preview = form.querySelector('.img-upload__preview img');
const previewEffects = form.querySelectorAll('.effects__preview');
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
  onCloseUploadImageModal();
};

const onLoadFile = () => {
  const file = fileNameElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
      previewEffects.forEach((previewItem) => {
        previewItem.style.backgroundImage = `url(${preview.src})`;
      });
    });

    reader.readAsDataURL(file);
  }
};

const onOpenUploadImageModal = () => {
  clearEffect();
  imageOverlayElement.classList.remove(HIDDEN_STATE);
  bodyElement.classList.add(MODAL_OPEN_STATE);

  fileNameElement.addEventListener('change', onLoadFile);

  document.addEventListener('keydown', onPopupEscKeydown);
};

const onCloseUploadImageModal = () => {
  imageOverlayElement.classList.add(HIDDEN_STATE);
  bodyElement.classList.remove(MODAL_OPEN_STATE);

  fileNameElement.removeEventListener('change', onLoadFile);

  form.reset();

  document.removeEventListener('keydown', onPopupEscKeydown);
};

fileNameElement.addEventListener('input', onOpenUploadImageModal);

imageModalCloseElement.addEventListener('click', onCloseUploadImageModal);

imageModalCloseElement.addEventListener('keydown', (evt) => {
  if (!isEnterEvent(evt)) {
    return;
  }
  onCloseUploadImageModal();
});

export {onCloseUploadImageModal};
