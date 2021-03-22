import {renderPictures, showImgFilters, filters, setFilter} from './draw-photos.js';
import './upload-image-modal.js';
import './upload-image-form.js';
import './upload-image-scale.js';
import './upload-image-effect.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {formSubmit} from './upload-image-form.js';
import './upload-image-form-validate.js';

getData(
  (data) => {
    showImgFilters();
    renderPictures(data);
    setFilter(filters.default, () => renderPictures(data));
    setFilter(filters.random, () => renderPictures(data));
    setFilter(filters.discussed, () => renderPictures(data));
  },
  () => showAlert('Не удалось получить данные с сервера. Попробуйте позже.'));

formSubmit();
