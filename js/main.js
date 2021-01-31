const getRandomIntegerFromRange = function (min = 0, max = 10) {
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

  // диапазон из одинаковых чисел
  if (min === max) {
    // хотя здесь можно и ошибку сгенерировать
    return Math.floor(min);
  }

  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const isValidStringLength = function (text = '', length = 10) {
  if (typeof text !== 'string' || typeof length !== 'number') {
    throw 'Первый параметр должен быть строкой, второй должен быть числом';
  }

  return text.length <= length ? true : false;
}

getRandomIntegerFromRange(0, 10);
isValidStringLength('hello', 10);
