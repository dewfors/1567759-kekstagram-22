import {ALERT_SHOW_TIME} from './constants.js';

const showFunctionException = (min, max) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw 'Параметры функции должны быть числами';
  }

  if (min < 0 || max < 0) {
    throw 'Диапазон не может быть отрицательным';
  }

  if (min > max) {
    throw 'Неверный диапазон';
  }
}

const getRandomIntegerFromRange = (min = 0, max = 10) => {
  showFunctionException(min, max);

  if (min === max) {
    return Math.floor(min);
  }

  return Math.floor(min + Math.random() * (max + 1 - min));
}

const getRandomiseArray = (elements, countOfElements) => {
  let copyElements = elements.slice();

  let resultElements = [];
  while (copyElements.length > 0) {
    let random = getRandomIntegerFromRange(0, copyElements.length-1);
    let elem = copyElements.splice(random, 1)[0];
    resultElements.push(elem);
  }

  return resultElements.slice(0, countOfElements);
};

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const isEnterEvent = (evt) => {
  return evt.key === 'Enter';
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {getRandomIntegerFromRange, getRandomiseArray, isEscEvent, isEnterEvent, showAlert};
