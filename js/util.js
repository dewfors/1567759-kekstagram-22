const ALERT_SHOW_TIME = 5000;

const showFunctionException = (min, max) => {
  // параметры должны быть числами
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw 'Параметры функции должны быть числами';
  }

  // диапазон только положительный, включая ноль
  if (min < 0 || max < 0) {
    throw 'Диапазон не может быть отрицательным';
  }

  // неправильный диапазон
  if (min > max) {
    throw 'Неверный диапазон';
  }
}

const getRandomIntegerFromRange = (min = 0, max = 10) => {
  showFunctionException(min, max);

  // диапазон из одинаковых чисел
  if (min === max) {
    // хотя здесь можно и ошибку сгенерировать
    return Math.floor(min);
  }

  // случайное число от min до (max+1)
  return Math.floor(min + Math.random() * (max + 1 - min));
}

const isAllowedStringLength = (string = '', length = 10) => {
  if (typeof string !== 'string' || typeof length !== 'number') {
    throw 'Первый параметр должен быть строкой, второй должен быть числом';
  }

  return string.length <= length ? true : false;
}

const generateId = () => Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
const getRandomIndex = (array) => array[Math.floor(Math.random() * array.length)];

const getRandomiseArray = (arr, countOfElements) => {
  let copyArray = arr.slice();

  let result = [];
  while (copyArray.length > 0) {
    let random = getRandomIntegerFromRange(0, copyArray.length-1);
    let elem = copyArray.splice(random, 1)[0];
    result.push(elem);
  }

  return result.slice(0, countOfElements);
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




export {getRandomIntegerFromRange, isAllowedStringLength, generateId, getRandomIndex, getRandomiseArray, isEscEvent, isEnterEvent, showAlert};
