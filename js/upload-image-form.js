import {sendData} from './api.js';
import {clearScaleImage} from './upload-image-scale.js';
import {clearEffect} from './upload-image-effect.js';
import {closeUploadImageModal} from './upload-image-modal.js';
import {openSuccessMessage} from './successMessageModal.js';
import {openErrorMessage} from './errorMessageModal.js';

const form = document.querySelector('.img-upload__form');
const hashtags = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');
const fileNameElement = form.querySelector('#upload-file');

const onSuccess = () => {
  // console.log('send');
  hashtags.value = '';
  description.value = '';
  fileNameElement.value = '';
  clearScaleImage();
  clearEffect();
  closeUploadImageModal();
  openSuccessMessage();
};

const onFail = () => {
  closeUploadImageModal();
  openErrorMessage();
};

const formSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );
  });
};

export {formSubmit};