import {sendData} from './api.js';
import {clearScaleImage} from './upload-image-scale.js';
import {clearEffect} from './upload-image-effect.js';
import {onCloseUploadImageModal} from './upload-image-modal.js';
import {openMessage} from './message-modal.js';

const form = document.querySelector('.img-upload__form');
const hashtags = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');
const fileNameElement = form.querySelector('#upload-file');

const onSuccess = () => {
  hashtags.value = '';
  description.value = '';
  fileNameElement.value = '';
  clearScaleImage();
  clearEffect();
  onCloseUploadImageModal();
  openMessage('success');

};

const onFail = () => {
  onCloseUploadImageModal();
  openMessage('error');
};

const formSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (description.checkValidity() === false || hashtags.checkValidity() === false) {
      return;
    }

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );

  });
};

export {formSubmit};
