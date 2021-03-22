/* global _:readonly */

import {renderPictures, showImgFilters, filters, setFilter} from './draw-photos.js';
import './upload-image-modal.js';
import './upload-image-form.js';
import './upload-image-scale.js';
import './upload-image-effect.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {formSubmit} from './upload-image-form.js';
import './upload-image-form-validate.js';
import {RERENDER_DELAY} from './constants.js';

getData(
  (data) => {
    showImgFilters();
    renderPictures(data);
    setFilter(filters.default, _.debounce(() => renderPictures(data), RERENDER_DELAY));
    setFilter(filters.random, _.debounce(() => renderPictures(data), RERENDER_DELAY));
    setFilter(filters.discussed, _.debounce(() => renderPictures(data), RERENDER_DELAY));
  },
  () => showAlert('Не удалось получить данные с сервера. Попробуйте позже.'));

formSubmit();
