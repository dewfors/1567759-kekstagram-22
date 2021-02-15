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


export {getRandomIntegerFromRange, isAllowedStringLength, generateId, getRandomIndex};
