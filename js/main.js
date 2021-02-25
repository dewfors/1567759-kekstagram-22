import {renderPictures} from './draw-photos.js';
import './upload-image-modal.js';
import './upload-image-scale.js';
import './upload-image-effect.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

getData(
  (data) => {
    renderPictures(data);
  },
  () => showAlert('Не удалось получить данные с сервера. Попробуйте позже.'));
