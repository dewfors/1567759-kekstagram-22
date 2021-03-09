import {renderPictures, showImgFilters, setFilterDefault, setFilterRandom, setFilterDiscussed} from './draw-photos.js';
import './upload-image-modal.js';
import './upload-image-form.js';
import './upload-image-scale.js';
import './upload-image-effect.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {formSubmit} from './upload-image-form.js';

getData(
  (data) => {
    showImgFilters();
    renderPictures(data);
    setFilterDefault(() => renderPictures(data));
    setFilterRandom(() => renderPictures(data));
    setFilterDiscussed(() => renderPictures(data));
  },
  () => showAlert('Не удалось получить данные с сервера. Попробуйте позже.'));

formSubmit();

//////////
// const questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
// const randomise = (arr, numOfElem) => {
//   let copyArray = [...arr];
//   const getRandom = () => Math.floor(Math.random() * copyArray.length);
//   return () => {
//     // If numOfElem is greater, then clone again
//
//     // suppose you have 15 question but you take 6. SO after 2 iteration, copyArray will have only 3 element so clone again
//     if (numOfElem > copyArray.length) {
//       // Clone again
//       copyArray = [...arr];
//     }
//     // pick 5 random data.
//     let result = [];
//     for (let i = 0; i < numOfElem; i++) {
//       result.push(copyArray.splice(getRandom(), 1)[0]);
//     }
//     return result;
//   };
// };
// const questionGenerator = randomise(questions, 5);
// console.log(questionGenerator());
// console.log(questionGenerator());
// console.log(questionGenerator());
// console.log(questionGenerator());
// console.log(questionGenerator());
